import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'prompt',  // Prompts user to update
            includeAssets: ['favicon.ico', 'images/*.png'],
            manifest: {
                name: 'ECS Health & Safety Quiz',
                short_name: 'ECS Quiz',
                description: 'Study tool for the ECS Health, Safety and Environmental Assessment',
                theme_color: '#2563eb',
                background_color: '#ffffff',
                display: 'standalone',
                icons: [
                    {
                        src: '/images/icon-icon-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/images/icon-icon-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ]
            }
        })
    ],
    base: '/ecs-quiz-app/' // <-- this is the folder within github pages
})
