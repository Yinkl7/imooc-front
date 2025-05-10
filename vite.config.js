import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path, { join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    createSvgIconsPlugin({
      // 图标目录
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 符号id格式
      symbolId: 'icon-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': join(__dirname, '/src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-front.lgdsunday.club',
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
