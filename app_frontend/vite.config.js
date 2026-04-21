import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 打包配置函数（直接写这里）
function setupBuild() {
  return {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      input: {
        index: 'index.html'
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        sanitizeFileName(name) {
          const DRIVE_LETTER_REGEX = /^[a-z]:/i
          const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g
          const match = DRIVE_LETTER_REGEX.exec(name)
          const driveLetter = match ? match[0] : ''
          return driveLetter + name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '')
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().match(/\/node_modules\/(?!.pnpm)(?<moduleName>[^\/]*)\//)?.groups?.moduleName ?? 'vendor'
          }
        }
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/news_app_frontend/', // GitHub Pages 部署路径
  build: setupBuild()
})
