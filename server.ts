import express from 'express';
import fs from 'fs';
import path from 'path';

import url from 'url';

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;
const app = express();

async function startServer() {
  let vite: any;

  if (!isProduction) {
    const { createServer } = await import('vite');
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    // In production, we assume we're running from dist/server.cjs in the project root
    // or we use process.cwd() assuming the server is started from root.
    const distClientPath = path.join(process.cwd(), 'dist', 'client');
    app.use(express.static(distClientPath, { index: false }));
  }

  app.use('*', async (req, res, next) => {
    try {
      const originalUrl = req.originalUrl;
      let template, render;

      if (!isProduction) {
        template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(originalUrl, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = fs.readFileSync(path.join(process.cwd(), 'dist', 'client', 'index.html'), 'utf-8');
        // Import compiled server entry.
        const entryModule = await import(url.pathToFileURL(path.join(process.cwd(), 'dist', 'server', 'entry-server.js')).href);
        render = entryModule.render;
      }

      const { html, head } = render(originalUrl);

      const finalHtml = template
        .replace('<!--app-head-->', head || '')
        .replace('<!--app-html-->', html);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
    } catch (e: any) {
      if (!isProduction) {
        vite.ssrFixStacktrace(e);
      }
      next(e);
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SSR Server running on http://localhost:${PORT}`);
  });
}

startServer();
