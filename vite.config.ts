import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          about: path.resolve(__dirname, 'about.html'),
          services: path.resolve(__dirname, 'services.html'),
          onPageSeo: path.resolve(__dirname, 'on-page-seo.html'),
          offPageSeo: path.resolve(__dirname, 'off-page-seo.html'),
          localSeo: path.resolve(__dirname, 'local-seo.html'),
          technicalSeo: path.resolve(__dirname, 'technical-seo.html'),
          portfolio: path.resolve(__dirname, 'portfolio.html'),
          blog: path.resolve(__dirname, 'blog.html'),
          blogHowToRank: path.resolve(__dirname, 'blog-how-to-rank-on-google.html'),
          blogLocalSeo: path.resolve(__dirname, 'blog-how-to-improve-local-seo.html'),
          blogOnPageVsOffPage: path.resolve(__dirname, 'blog-on-page-vs-off-page-seo.html'),
          blogTechAudit: path.resolve(__dirname, 'blog-technical-seo-audit-guide.html'),
          blogBacklinks: path.resolve(__dirname, 'blog-how-to-build-backlinks-2026.html'),
          blogAiSeo: path.resolve(__dirname, 'blog-ai-and-seo-2026.html'),
          contact: path.resolve(__dirname, 'contact.html'),
          privacyPolicy: path.resolve(__dirname, 'privacy-policy.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
