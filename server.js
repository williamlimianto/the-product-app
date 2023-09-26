/* eslint-disable no-undef */
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NODE_ENV = (process.env.NODE_ENV || '').toLowerCase();

let finalEnvPath = path.resolve(__dirname, `.env.${NODE_ENV}`);
if (!fs.existsSync(finalEnvPath)) {
  finalEnvPath = path.resolve(__dirname, `.env`);
}
dotenv.config({ path: finalEnvPath });

const isProduction = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;
export async function createServer(root = process.cwd(), isProd = isProduction) {
  const resolve = (p) => path.resolve(__dirname, p);
  const indexProd = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : '';
  const manifest = isProd ? JSON.parse(fs.readFileSync(resolve('dist/client/ssr-manifest.json'), 'utf-8')) : {};
  // @ts-ignore

  const app = express();

  let vite;
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100
        }
      },
      appType: 'custom'
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use((await import('compression')).default());
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false
      })
    );
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server')).render;
      } else {
        template = indexProd;
        render = (await import('./dist/server/entry-server.js')).render;
      }

      const [appHtml, state, links, teleports, headPayload] = await render(url, manifest);

      let html = template
        .replace(`<!--preload-links-->`, links)
        .replace(`'<pinia-store>'`, state)
        .replace(`<!--app-html-->`, appHtml)
        .replace(/(\n|\r\n)\s*<!--app-teleports-->/, teleports);

      Object.entries(headPayload).forEach(([key, value]) => {
        html = html.replace(`<!--${key}-->`, value)
      })

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) => {
    const PORT = process.env.PORT ?? 6173;

    return app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    }) 
  });
}