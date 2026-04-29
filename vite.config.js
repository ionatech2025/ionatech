import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
<<<<<<< HEAD
import devApiPlugin from './dev-api-plugin.js'

export default defineConfig({
  plugins: [react(), devApiPlugin()],
=======

export default defineConfig({
  plugins: [react()],
>>>>>>> origin/first_improvements
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg', '**/*.gif']
})