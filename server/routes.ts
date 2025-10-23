import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import multer from "multer";
import Papa from "papaparse";
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

      const filePath = req.file.path;
      const fileContent = await fs.readFile(filePath, 'utf-8');

      // Parse CSV
      const parseResult = Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true
      });

      const data = parseResult.data as any[];

      // Clean up uploaded file
      await fs.unlink(filePath).catch(() => {});

      // Evaluate the data
      const evaluation = evaluateExcelTasks(data);

      res.json(evaluation);
    } catch (error) {
      console.error('Error evaluating Excel file:', error);
      res.status(500).json({ error: 'Failed to evaluate file' });
    }
  });

  // Serve sprint1.html as a static file
  app.get('/sprint1.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sprint1.html'));
  });

  // Serve new sprint1-v2.html
  app.get('/sprint1-v2.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sprint1-v2.html'));
  });

  const httpServer = createServer(app);

  return httpServer;
}

// Evaluation logic
function evaluateExcelTasks(data: any[]) {
  const feedback = [];
  let score = 0;

  // Task 1: Check for at least 5 complete rows
  const completeRows = data.filter(row => {
    return row.Name && row.Crop && row['Qty (kg)'] && row['Price (₹/kg)'] && row.Date && row['Total ₹'];
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
    const qty = row['Qty (kg)'];
    if (qty && (qty.includes(',') || isNaN(parseFloat(qty)))) {
      allQtyNumeric = false;
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
    const qty = parseFloat(row['Qty (kg)']);
    const price = parseFloat(row['Price (₹/kg)']);
    const total = parseFloat(row['Total ₹']);
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
