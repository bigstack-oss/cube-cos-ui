import { resources } from './utils'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['en-US']
  }
}
