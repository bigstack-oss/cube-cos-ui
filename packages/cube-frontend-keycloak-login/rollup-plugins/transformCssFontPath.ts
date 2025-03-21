import { Plugin } from 'vite'

// A quick fix that adjusts the font paths in the generated CSS for Keycloak.
// For example, converting `url(/resources/font/inter.woff2)` to `url('../font/inter.woff2')`.
// See https://www.keycloak.org/docs/latest/server_development/index.html#adding-an-image-to-a-theme
export const transformCssFontPath = (resourcesPath: string): Plugin => {
  return {
    name: 'transform-css-font-path',
    enforce: 'post',
    apply: 'build',
    generateBundle: (_, bundle) => {
      Object.entries(bundle).forEach(([fileName, asset]) => {
        if (
          !fileName.endsWith('.css') ||
          asset.type !== 'asset' ||
          typeof asset.source !== 'string'
        ) {
          return
        }

        const regexp = new RegExp(`\\(/${resourcesPath}/font/(.*?)\\)`, 'g')
        asset.source = asset.source.replace(regexp, "('../font/$1')")
      })
    },
  }
}
