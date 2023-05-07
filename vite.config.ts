import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      find: '@',
      replacement: path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/charts/': {
        changeOrigin: true,
        target: 'http://192.168.192.93:5000/'
      },
      '/aliyunRegion/': {
        changeOrigin: true,
        target: 'https://gw.alipayobjects.com/os/alisis/geo-data-v0.1.1/administrative-data/area-list.json',
        headers: {
          referer: ''
        }
      },
      '/data/': {
        changeOrigin: true,
        target: 'http://192.168.192.93:5000/'
      }
    }
  }
})
