import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return {
    plugins: [
      react(),
      viteTsConfigPaths(),
      svgr({
        svgrOptions: {
          ref: true,
          titleProp: true,
        },
      }),
    ],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_SERVER,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
