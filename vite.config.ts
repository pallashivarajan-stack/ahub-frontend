import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    react(),
    nitro(),
    tailwindcss(),
  ],
  server: {
    port: 8080,
    host: true,
    allowedHosts: true,
  },
  preview: {
    port: 8080,
    host: true,
    allowedHosts: true,
  },
})
