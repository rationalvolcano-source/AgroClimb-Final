import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { requireAuth, getAuth } from "@clerk/express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import XLSX from "xlsx";
import fs from "fs/promises";
import { insertUserProfileSchema, analyticsEventBatchSchema, insertCareerChoiceSchema } from "@shared/schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const upload = multer({ 
  dest: '/tmp/uploads/',
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes - using Clerk instead of Replit Auth
  // Note: Frontend uses Clerk's useUser() hook directly, this endpoint is for backwards compatibility

  // Get authenticated user info
  app.get('/api/auth/user', requireAuth(), async (req: Request, res: Response) => {
    try {
      const auth = getAuth(req);
      
      if (!auth.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      // Return minimal user info from Clerk session
      // Full user info is accessed via Clerk's frontend SDK
      res.json({ 
        id: auth.userId,
        sessionId: auth.sessionId 
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Enrollment endpoints
  app.post('/api/enroll', requireAuth(), async (req: Request, res: Response) => {
    try {
      const { userId } = getAuth(req);
      
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const { program } = req.body;
      
      if (!program || !['digital-skills', 'webinars', 'daily-news'].includes(program)) {
        return res.status(400).json({ message: "Invalid program" });
      }

      // Check if already enrolled
      const existing = await storage.getEnrollment(userId, program);
      if (existing) {
        return res.json({ message: "Already enrolled", enrollment: existing });
      }

      const enrollment = await storage.createEnrollment({ userId, program });
      res.json({ message: "Enrolled successfully", enrollment });
    } catch (error) {
      console.error("Error enrolling:", error);
      res.status(500).json({ message: "Failed to enroll" });
    }
  });

  app.get('/api/enrollments', requireAuth(), async (req: Request, res: Response) => {
    try {
      const { userId } = getAuth(req);
      
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const enrollments = await storage.getUserEnrollments(userId);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  // User Profile endpoints (Gmail and WhatsApp storage)
  app.get('/api/profile', requireAuth(), async (req: Request, res: Response) => {
    try {
      const { userId } = getAuth(req);
      
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const profile = await storage.getUserProfile(userId);
      res.json(profile || null);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.post('/api/profile', requireAuth(), async (req: Request, res: Response) => {
    try {
      const { userId } = getAuth(req);
      
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const parseResult = insertUserProfileSchema.safeParse({
        clerkUserId: userId,
        email: req.body.email,
        whatsappNumber: req.body.whatsappNumber || null,
      });
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid data", 
          errors: parseResult.error.flatten().fieldErrors 
        });
      }
      
      const profile = await storage.upsertUserProfile(parseResult.data);
      res.json({ message: "Profile saved successfully", profile });
    } catch (error) {
      console.error("Error saving profile:", error);
      res.status(500).json({ message: "Failed to save profile" });
    }
  });

  // Career Choice endpoints - for locking/unlocking career pathway recommendations
  app.get('/api/career-choice', requireAuth(), async (req: Request, res: Response) => {
    try {
      const { userId } = getAuth(req);
      
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const choice = await storage.getCareerChoice(userId);
      res.json(choice || null);
    } catch (error) {
      console.error("Error fetching career choice:", error);
      res.status(500).json({ message: "Failed to fetch career choice" });
    }
  });

  app.post('/api/career-choice', requireAuth(), async (req: Request, res: Response) => {
    try {
      const { userId } = getAuth(req);
      
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const parseResult = insertCareerChoiceSchema.safeParse({
        clerkUserId: userId,
        email: req.body.email,
        recommendedPath: req.body.recommendedPath,
        confidenceLevel: req.body.confidenceLevel,
        quizAnswers: req.body.quizAnswers,
      });
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid data", 
          errors: parseResult.error.flatten().fieldErrors 
        });
      }
      
      const choice = await storage.saveCareerChoice(parseResult.data);
      res.json({ message: "Career choice locked successfully", choice });
    } catch (error) {
      console.error("Error saving career choice:", error);
      res.status(500).json({ message: "Failed to save career choice" });
    }
  });

  app.post('/api/career-choice/unlock', requireAuth(), async (req: Request, res: Response) => {
    try {
      const { userId } = getAuth(req);
      
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const choice = await storage.unlockCareerChoice(userId);
      
      if (!choice) {
        return res.status(404).json({ message: "No career choice found to unlock" });
      }
      
      res.json({ message: "Career choice unlocked. Talk to our team before retaking the quiz!", choice });
    } catch (error) {
      console.error("Error unlocking career choice:", error);
      res.status(500).json({ message: "Failed to unlock career choice" });
    }
  });

  // Analytics endpoints - tracks user journey
  app.post('/api/analytics/events', requireAuth(), async (req: Request, res: Response) => {
    try {
      const { userId } = getAuth(req);
      
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const parseResult = analyticsEventBatchSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid data", 
          errors: parseResult.error.flatten().fieldErrors 
        });
      }
      
      await storage.recordAnalyticsEvents(userId, parseResult.data.events);
      res.json({ message: "Events recorded", count: parseResult.data.events.length });
    } catch (error) {
      console.error("Error recording analytics:", error);
      res.status(500).json({ message: "Failed to record analytics" });
    }
  });

  // Admin analytics export endpoint - generates Excel file for download
  const ADMIN_USER_IDS = ['user_36ZgNIb9gRj2HTvoFaUmTYnHCXc'];
  
  app.get('/api/admin/analytics/export', requireAuth(), async (req: Request, res: Response) => {
    try {
      const { userId } = getAuth(req);
      
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      if (!ADMIN_USER_IDS.includes(userId)) {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      // Parse date range from query params
      const startDateStr = req.query.startDate as string;
      const endDateStr = req.query.endDate as string;
      
      if (!startDateStr || !endDateStr) {
        return res.status(400).json({ message: "startDate and endDate query parameters are required" });
      }
      
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);
      endDate.setHours(23, 59, 59, 999); // Include entire end day
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
      }
      
      // Limit to 90 days max
      const daysDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff > 90) {
        return res.status(400).json({ message: "Date range cannot exceed 90 days" });
      }
      
      // Fetch all analytics data with retry logic for DNS issues
      const fetchWithRetry = async <T>(fn: () => Promise<T>, retries = 3): Promise<T> => {
        for (let i = 0; i < retries; i++) {
          try {
            return await fn();
          } catch (err: any) {
            if (i === retries - 1) throw err;
            // Wait before retry (exponential backoff)
            await new Promise(r => setTimeout(r, 1000 * (i + 1)));
          }
        }
        throw new Error("Max retries exceeded");
      };
      
      const [journeyEvents, weeklyActivity, dailyMetrics] = await Promise.all([
        fetchWithRetry(() => storage.getJourneyEventsForExport(startDate, endDate)),
        fetchWithRetry(() => storage.getWeeklyActivityForExport(startDate, endDate)),
        fetchWithRetry(() => storage.getDailyPageMetricsForExport(startDate, endDate)),
      ]);
      
      // Create workbook with multiple sheets
      const workbook = XLSX.utils.book_new();
      
      // Journey Events sheet
      const eventsSheet = XLSX.utils.json_to_sheet(journeyEvents.map(e => ({
        'User ID': e.clerkUserId,
        'Session ID': e.sessionId,
        'Event Type': e.eventType,
        'Page Path': e.path,
        'Referrer Path': e.referrerPath || '',
        'Duration (seconds)': e.durationSeconds || '',
        'Timestamp': e.createdAt ? new Date(e.createdAt).toISOString() : '',
      })));
      XLSX.utils.book_append_sheet(workbook, eventsSheet, 'Journey Events');
      
      // Weekly Activity sheet
      const weeklySheet = XLSX.utils.json_to_sheet(weeklyActivity.map(w => ({
        'User ID': w.clerkUserId,
        'Week Start': w.weekStart ? new Date(w.weekStart).toISOString().slice(0, 10) : '',
        'Visit Count': w.visitCount,
        'Unique Days': w.uniqueDays,
        'Total Duration (seconds)': w.totalDurationSeconds,
      })));
      XLSX.utils.book_append_sheet(workbook, weeklySheet, 'Weekly Activity');
      
      // Daily Page Metrics sheet
      const dailySheet = XLSX.utils.json_to_sheet(dailyMetrics.map(d => ({
        'User ID': d.clerkUserId,
        'Date': d.date ? new Date(d.date).toISOString().slice(0, 10) : '',
        'Page Path': d.path,
        'Visit Count': d.visitCount,
        'Total Duration (seconds)': d.totalDurationSeconds,
      })));
      XLSX.utils.book_append_sheet(workbook, dailySheet, 'Daily Page Metrics');
      
      // Generate Excel buffer
      const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
      
      // Set headers for file download
      const filename = `analytics_${startDateStr}_to_${endDateStr}.xlsx`;
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Length', buffer.length);
      
      res.send(buffer);
    } catch (error: any) {
      console.error("Error exporting analytics:", error);
      const errorMessage = error?.message || error?.toString() || JSON.stringify(error) || "Unknown error";
      res.status(500).json({ message: "Failed to export analytics", error: errorMessage, stack: error?.stack });
    }
  });

  // Excel file evaluation endpoint
  app.post('/api/evaluate-excel', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Validate file type
      const fileName = req.file.originalname.toLowerCase();
      const validExtensions = ['.xlsx', '.xls', '.csv'];
      const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
      
      if (!hasValidExtension) {
        await fs.unlink(req.file.path).catch(() => {});
        return res.status(400).json({ 
          error: 'Invalid file type. Please upload an Excel (.xlsx, .xls) or CSV (.csv) file.' 
        });
      }

      const filePath = req.file.path;

      // Parse file using SheetJS (works for both Excel and CSV)
      const workbook = XLSX.readFile(filePath);
      const firstSheetName = workbook.SheetNames[0];
      
      if (!firstSheetName) {
        await fs.unlink(filePath).catch(() => {});
        return res.status(400).json({ 
          error: 'No data found in file. Please ensure your file contains at least one sheet with data.' 
        });
      }

      const worksheet = workbook.Sheets[firstSheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { defval: '' }) as any[];

      // Clean up uploaded file
      await fs.unlink(filePath).catch(() => {});

      // Check if we got any usable data
      if (!data || data.length === 0) {
        return res.status(400).json({ 
          error: 'No data rows found in file. Please ensure your file has data rows.' 
        });
      }

      // Evaluate the data
      const evaluation = evaluateExcelTasks(data);

      res.json(evaluation);
    } catch (error) {
      console.error('Error evaluating Excel file:', error);
      res.status(500).json({ error: 'Failed to evaluate file. Please try again.' });
    }
  });

  // Sprint 2 data cleaning evaluation endpoint
  app.post('/api/evaluate-sprint2', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const fileName = req.file.originalname.toLowerCase();
      const validExtensions = ['.xlsx', '.xls', '.csv'];
      const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
      
      if (!hasValidExtension) {
        await fs.unlink(req.file.path).catch(() => {});
        return res.status(400).json({ 
          error: 'Invalid file type. Please upload an Excel (.xlsx, .xls) or CSV (.csv) file.' 
        });
      }

      const filePath = req.file.path;
      const workbook = XLSX.readFile(filePath);
      
      // Find the Data sheet or first sheet
      let sheetName = workbook.SheetNames.find(s => s.toLowerCase() === 'data') || workbook.SheetNames[0];
      
      if (!sheetName) {
        await fs.unlink(filePath).catch(() => {});
        return res.status(400).json({ error: 'No data found in file.' });
      }

      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { defval: '' }) as any[];

      await fs.unlink(filePath).catch(() => {});

      if (!data || data.length === 0) {
        return res.status(400).json({ error: 'No data rows found in file.' });
      }

      const evaluation = evaluateSprint2Tasks(data);
      res.json(evaluation);
    } catch (error) {
      console.error('Error evaluating Sprint 2 file:', error);
      res.status(500).json({ error: 'Failed to evaluate file. Please try again.' });
    }
  });

  // Serve sprint1.html as a static file
  app.get('/sprint1.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sprint1.html'));
  });

  // Serve sprint2.html as a static file
  app.get('/sprint2.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sprint2.html'));
  });

  // Serve sprint3.html as a static file
  app.get('/sprint3.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sprint3.html'));
  });

  // Serve sprint4.html as a static file
  app.get('/sprint4.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sprint4.html'));
  });

  // Serve sprint5.html as a static file
  app.get('/sprint5.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sprint5.html'));
  });

  // Redirect old sprint1-v2.html to sprint1.html for backward compatibility
  app.get('/sprint1-v2.html', (req, res) => {
    res.redirect(301, '/sprint1.html');
  });

  const httpServer = createServer(app);

  return httpServer;
}

// Helper to normalize column names (handles encoding issues with special characters like ₹)
function normalizeColumnName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Helper to get column value by normalized name
function getColumnValue(row: any, targetName: string): any {
  const normalizedTarget = normalizeColumnName(targetName);
  for (const [key, value] of Object.entries(row)) {
    if (normalizeColumnName(key) === normalizedTarget) {
      return value;
    }
  }
  return undefined;
}

// Expected rice producer countries (all Asian)
const EXPECTED_COUNTRIES = [
  'india', 'china', 'bangladesh', 'indonesia', 'vietnam', 
  'thailand', 'myanmar', 'philippines', 'japan', 'pakistan'
];

// Evaluation logic for Rice Producers assignment
function evaluateExcelTasks(data: any[]) {
  const feedback = [];
  let score = 0;

  // Find column names that could be "Country" and "Production"
  const findColumn = (row: any, patterns: string[]) => {
    for (const [key] of Object.entries(row)) {
      const normalized = normalizeColumnName(key);
      if (patterns.some(p => normalized.includes(p))) {
        return key;
      }
    }
    return null;
  };

  // Get first row to detect column names
  const firstRow = data[0] || {};
  const countryCol = findColumn(firstRow, ['country', 'countries', 'nation', 'name']);
  const productionCol = findColumn(firstRow, ['production', 'metric', 'tonnes', 'output', 'quantity']);

  // Task 1: Check for 10 countries
  const countriesFound: string[] = [];
  data.forEach(row => {
    // Try to find country name in any column
    for (const [, value] of Object.entries(row)) {
      const valStr = String(value).toLowerCase().trim();
      EXPECTED_COUNTRIES.forEach(country => {
        if (valStr.includes(country) && !countriesFound.includes(country)) {
          countriesFound.push(country);
        }
      });
    }
  });

  if (countriesFound.length >= 10) {
    feedback.push({ passed: true, message: `Task 1: ✓ All 10 rice-producing countries found` });
    score++;
  } else if (countriesFound.length >= 8) {
    feedback.push({ passed: true, message: `Task 1: ✓ Found ${countriesFound.length}/10 countries (close enough!)` });
    score++;
  } else {
    const missing = EXPECTED_COUNTRIES.filter(c => !countriesFound.includes(c)).slice(0, 3);
    feedback.push({ passed: false, message: `Task 1: ✗ Only ${countriesFound.length}/10 countries found. Missing: ${missing.join(', ')}...` });
  }

  // Task 2: Check for numeric production values
  let numericValuesCount = 0;
  let hasNonNumeric = false;
  
  data.forEach(row => {
    for (const [key, value] of Object.entries(row)) {
      const normalized = normalizeColumnName(key);
      if (normalized.includes('production') || normalized.includes('metric') || normalized.includes('tonnes')) {
        const valStr = String(value).replace(/,/g, '').trim();
        if (valStr && !isNaN(parseFloat(valStr)) && parseFloat(valStr) > 1000000) {
          numericValuesCount++;
        } else if (valStr && isNaN(parseFloat(valStr.replace(/,/g, '')))) {
          hasNonNumeric = true;
        }
      }
    }
    // Also check second column if no production column found
    const values = Object.values(row);
    if (values.length >= 2) {
      const val = String(values[1]).replace(/,/g, '').trim();
      if (val && !isNaN(parseFloat(val)) && parseFloat(val) > 1000000) {
        numericValuesCount++;
      }
    }
  });

  if (numericValuesCount >= 8) {
    feedback.push({ passed: true, message: 'Task 2: ✓ Production values are entered correctly as numbers' });
    score++;
  } else if (numericValuesCount >= 5) {
    feedback.push({ passed: true, message: `Task 2: ✓ Found ${numericValuesCount} valid production values` });
    score++;
  } else {
    feedback.push({ passed: false, message: 'Task 2: ✗ Production values not found or not numeric. Enter values without commas.' });
  }

  // Task 3: Check for any percentage or sum calculation (Asia's share)
  let hasCalculation = false;
  let hasPercentage = false;
  
  data.forEach(row => {
    for (const [key, value] of Object.entries(row)) {
      const keyLower = key.toLowerCase();
      const valStr = String(value).toLowerCase();
      
      // Check for percentage-related columns or values
      if (keyLower.includes('%') || keyLower.includes('percent') || keyLower.includes('share') || 
          keyLower.includes('asia') || keyLower.includes('total')) {
        hasCalculation = true;
      }
      if (valStr.includes('%') || valStr === '100' || (parseFloat(valStr) > 99 && parseFloat(valStr) <= 100)) {
        hasPercentage = true;
      }
    }
  });

  // Since all 10 countries are Asian, the answer is 100%
  if (hasCalculation || hasPercentage || data.length >= 10) {
    feedback.push({ passed: true, message: "Task 3: ✓ Great! Since all top 10 rice producers are Asian countries, Asia's share is 100%" });
    score++;
  } else {
    feedback.push({ passed: false, message: "Task 3: ✗ Add a cell calculating Asia's share (hint: all 10 countries are in Asia, so it's 100%!)" });
  }

  return {
    passed: score >= 2,
    score,
    feedback,
    totalRows: data.length,
    countriesFound: countriesFound.length
  };
}

// Sprint 2: Data Cleaning Evaluation
function evaluateSprint2Tasks(data: any[]) {
  const feedback = [];
  let score = 0;

  // Task 1: Check for extra spaces in Name column
  let hasExtraSpaces = false;
  let spacesFixed = true;
  
  data.forEach(row => {
    const name = getColumnValue(row, 'Name');
    if (name) {
      const nameStr = String(name);
      // Check for trailing spaces or multiple consecutive spaces
      if (nameStr !== nameStr.trim() || /\s{2,}/.test(nameStr)) {
        hasExtraSpaces = true;
        spacesFixed = false;
      }
    }
  });

  if (spacesFixed && data.length > 0) {
    feedback.push({ passed: true, message: 'Task 1: ✓ Names are clean - no extra spaces found!' });
    score++;
  } else {
    feedback.push({ passed: false, message: 'Task 1: ✗ Some names still have extra spaces. Use TRIM() function to clean them.' });
  }

  // Task 2: Check for spelling errors in Rating column
  let hasSpellingErrors = false;
  const validRatings = ['excellent', 'good', 'average', 'poor'];
  
  data.forEach(row => {
    const rating = getColumnValue(row, 'Rating');
    if (rating) {
      const ratingStr = String(rating).toLowerCase().trim();
      // Check for common misspelling "excelent"
      if (ratingStr === 'excelent' || (ratingStr && !validRatings.includes(ratingStr) && ratingStr !== '')) {
        hasSpellingErrors = true;
      }
    }
  });

  if (!hasSpellingErrors && data.length > 0) {
    feedback.push({ passed: true, message: 'Task 2: ✓ Rating spelling is correct - no "Excelent" typos!' });
    score++;
  } else {
    feedback.push({ passed: false, message: 'Task 2: ✗ Found spelling errors in Rating column. Fix "Excelent" → "Excellent".' });
  }

  // Task 3: Check for "inf" or invalid values in Price column
  let hasInvalidValues = false;
  
  data.forEach(row => {
    const price = getColumnValue(row, 'Price Per Unit');
    if (price) {
      const priceStr = String(price).toLowerCase().trim();
      if (priceStr === 'inf' || priceStr === 'infinity' || priceStr === '#value!' || priceStr === '#ref!') {
        hasInvalidValues = true;
      }
    }
  });

  if (!hasInvalidValues && data.length > 0) {
    feedback.push({ passed: true, message: 'Task 3: ✓ No invalid values like "inf" found - data is clean!' });
    score++;
  } else {
    feedback.push({ passed: false, message: 'Task 3: ✗ Found invalid values like "inf". Replace with 0 or valid numbers.' });
  }

  return {
    passed: score >= 2,
    score,
    feedback,
    totalRows: data.length
  };
}
