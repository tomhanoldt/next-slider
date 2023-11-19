import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, './src/lib'),
    },
  },
  plugins: [
    preact()
  ],
})
