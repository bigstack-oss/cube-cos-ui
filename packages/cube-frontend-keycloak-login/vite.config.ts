import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { transformCssFontPath } from './rollup-plugins/transformCssFontPath'

// Align with the resources folder of Keycloak theme.
const ASSETS_DIR = 'resources'

// https://vite.dev/config/
export default defineConfig({
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
  build: {
    assetsDir: ASSETS_DIR,
    rollupOptions: {
      plugins: [transformCssFontPath(ASSETS_DIR)],
      output: {
        entryFileNames: `${ASSETS_DIR}/js/[name].js`,
        chunkFileNames: `${ASSETS_DIR}/js/[name].js`,
        assetFileNames: (assetInfo) => {
          const extension = assetInfo.names[0]?.split('.').pop()?.toLowerCase()

          if (extension === 'css') {
            return `${ASSETS_DIR}/css/[name].[ext]`
          }

          if (extension === 'woff' || extension === 'woff2') {
            return `${ASSETS_DIR}/font/[name].[ext]`
          }

          if (
            extension === 'jpg' ||
            extension === 'jpeg' ||
            extension === 'png'
          ) {
            return `${ASSETS_DIR}/img/[name].[ext]`
          }

          return `${ASSETS_DIR}/[name].[ext]`
        },
      },
    },
  },
})
