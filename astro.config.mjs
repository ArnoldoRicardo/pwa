// @ts-check
import { defineConfig } from "astro/config";

import vitePwa from "@vite-pwa/astro";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://arnoldoricardo.github.io",
  base: "/pwa",
  integrations: [
    vitePwa({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      includeManifestIcons: true,
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'PWA Raiz',
        short_name: 'PWA Raiz',
        description: 'Una PWA de ejemplo creada con Astro.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        scope: '/pwa/',
        start_url: '/pwa/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'screenshots/screenshot-desktop.png',
            sizes: '1285x935',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Captura de pantalla en escritorio'
          },
          {
            src: 'screenshots/screenshot-mobile.png',
            sizes: '397x690',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Captura de pantalla en móvil'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,txt}'],
        navigateFallback: '/pwa/index.html',
        runtimeCaching: [
          {
            urlPattern: new RegExp('^https://api\\.maptiler\\.com/.*', 'i'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'maptiler-tiles-cache',
              expiration: {
                maxEntries: 500, // Guarda hasta 500 teselas
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
    preact(),
  ],
});
