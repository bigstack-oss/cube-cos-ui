import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    viteTsConfigPaths(),
    svgr({
      svgrOptions: {
        ref: true,
        titleProp: true,
      },
    }),
  ],
})
