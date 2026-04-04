import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Force restart to trigger Tailwind CSS plugin 1
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
