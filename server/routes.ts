import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Serve sprint1.html as a static file
  app.get('/sprint1.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/sprint1.html'));
  });

  // Serve Excel sandbox
  app.get('/excel-sandbox', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/excel-sandbox.html'));
  });

  const httpServer = createServer(app);

  return httpServer;
}
