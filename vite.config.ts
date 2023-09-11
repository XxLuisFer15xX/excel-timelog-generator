import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': resolve(__dirname, './src/assets'),
      '@common': resolve(__dirname, './src/common'),
      '@atoms': resolve(__dirname, './src/components/atoms'),
      '@molecules': resolve(__dirname, './src/components/molecules'),
      '@organisms': resolve(__dirname, './src/components/organisms'),
      '@pages': resolve(__dirname, './src/components/pages'),
      '@routes': resolve(__dirname, './src/components/routes'),
      '@styles': resolve(__dirname, './src/components/styles'),
      '@templates': resolve(__dirname, './src/components/templates'),
      '@core': resolve(__dirname, './src/core'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@types': resolve(__dirname, './src/types'),
      '@languages': resolve(__dirname, './src/languages'),
      '@services': resolve(__dirname, './src/services'),
    },
  },
  plugins: [react(), svgr()],
})
