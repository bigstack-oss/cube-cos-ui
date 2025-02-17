/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_DATA_CENTER: string
  readonly VITE_USERNAME: string
  readonly VITE_PASSWORD: string
  readonly VITE_API_SERVER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
