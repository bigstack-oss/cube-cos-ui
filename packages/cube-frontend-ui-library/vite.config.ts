import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { codeInspectorPlugin } from 'code-inspector-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    viteTsConfigPaths(),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    svgr({
      svgrOptions: {
        ref: true,
        titleProp: true,
      },
    }),
  ],
})
