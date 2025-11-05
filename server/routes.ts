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

// Evaluation logic
function evaluateExcelTasks(data: any[]) {
  const feedback = [];
  let score = 0;

  // Task 1: Check for at least 5 complete rows
  const completeRows = data.filter(row => {
    return getColumnValue(row, 'Name') && 
           getColumnValue(row, 'Crop') && 
           getColumnValue(row, 'Qty (kg)') && 
           getColumnValue(row, 'Price (₹/kg)') && 
           getColumnValue(row, 'Date') && 
           getColumnValue(row, 'Total ₹');
  });

  if (completeRows.length >= 5) {
    feedback.push({ passed: true, message: `Task 1: ✓ You have ${completeRows.length} complete rows (needed ≥5)` });
    score++;
  } else {
    feedback.push({ passed: false, message: `Task 1: ✗ Only ${completeRows.length} complete rows found. Need at least 5 rows with all fields filled.` });
  }

  // Task 2: Check that Qty is numeric (no commas)
  let allQtyNumeric = true;
  data.forEach((row, idx) => {
    const qty = getColumnValue(row, 'Qty (kg)');
    if (qty != null && qty !== '') {
      const qtyStr = String(qty).trim();
      if (qtyStr.includes(',') || isNaN(parseFloat(qtyStr))) {
        allQtyNumeric = false;
      }
    }
  });

  if (allQtyNumeric && data.length > 0) {
    feedback.push({ passed: true, message: 'Task 2: ✓ All Qty values are numeric (no commas)' });
    score++;
  } else {
    feedback.push({ passed: false, message: 'Task 2: ✗ Some Qty values contain commas or non-numeric text. Use "1000" not "1,000".' });
  }

  // Task 3: Check that Total is calculated correctly
  let allTotalsCorrect = true;
  completeRows.forEach(row => {
    const qty = parseFloat(String(getColumnValue(row, 'Qty (kg)')));
    const price = parseFloat(String(getColumnValue(row, 'Price (₹/kg)')));
    const total = parseFloat(String(getColumnValue(row, 'Total ₹')));
    const expected = qty * price;

    if (Math.abs(total - expected) > 0.01) {
      allTotalsCorrect = false;
    }
  });

  if (allTotalsCorrect && completeRows.length > 0) {
    feedback.push({ passed: true, message: 'Task 3: ✓ All Total values are calculated correctly (Qty × Price)' });
    score++;
  } else {
    feedback.push({ passed: false, message: 'Task 3: ✗ Some Total values are incorrect. Make sure you used formulas (=Qty×Price).' });
  }

  return {
    passed: score === 3,
    score,
    feedback,
    totalRows: data.length,
    completeRows: completeRows.length
  };
}
