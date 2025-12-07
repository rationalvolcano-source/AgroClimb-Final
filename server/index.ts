import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { clerkMiddleware } from "@clerk/express";

const app = express();

// Security middleware: HTTPS redirect and security headers
// Must be first to ensure all requests are secure (including static files)
app.use((req: Request, res: Response, next: NextFunction) => {
  // Add security headers to all responses
  res.setHeader('Content-Security-Policy', "upgrade-insecure-requests");
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // In production, redirect HTTP to HTTPS
  // Check x-forwarded-proto header (used by proxies/load balancers like Replit)
  if (process.env.NODE_ENV === 'production') {
    const proto = req.get('x-forwarded-proto');
    if (proto && proto !== 'https') {
      return res.redirect(301, `https://${req.get('host')}${req.url}`);
    }
  }
  
  next();
});

// Serve static files from public folder (PWA manifest, service worker, icons)
// Must be before Vite middleware to prevent catch-all from intercepting
app.use(express.static(path.resolve(import.meta.dirname, "..", "public")));

// SEO routes MUST be registered FIRST before any middleware
// to prevent Vite/static middleware from intercepting them
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = 'https://agroclimb.com';
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/career-quiz', priority: '0.9', changefreq: 'monthly' },
    { url: '/books', priority: '0.8', changefreq: 'weekly' },
    { url: '/digital-skills', priority: '0.8', changefreq: 'monthly' },
    { url: '/interview-prep', priority: '0.8', changefreq: 'monthly' },
    { url: '/daily-news', priority: '0.7', changefreq: 'daily' },
    { url: '/alumni-webinars', priority: '0.7', changefreq: 'monthly' },
    { url: '/careers/research', priority: '0.8', changefreq: 'monthly' },
    { url: '/careers/academics', priority: '0.8', changefreq: 'monthly' },
    { url: '/careers/agribusiness', priority: '0.8', changefreq: 'monthly' },
    { url: '/careers/banking', priority: '0.8', changefreq: 'monthly' },
    { url: '/careers/govt-jobs', priority: '0.8', changefreq: 'monthly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.set('Content-Type', 'application/xml');
  res.send(sitemap);
});

app.get('/robots.txt', (req, res) => {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://agroclimb.com/sitemap.xml

# Crawl-delay for politeness
Crawl-delay: 1
`;
  res.set('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Clerk middleware for authentication - added after security middleware
app.use(clerkMiddleware());

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
