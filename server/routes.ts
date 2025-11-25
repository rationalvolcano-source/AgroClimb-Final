import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import multer from "multer";
import XLSX from "xlsx";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const upload = multer({ 
  dest: '/tmp/uploads/',
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

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

  // Serve sprint1.html as a static file
  app.get('/sprint1.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sprint1.html'));
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
