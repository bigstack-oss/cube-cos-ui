// Visible toasts amount
export const MAX_VISIBLE_TOASTS_AMOUNT = 4

// Default lifetime of a toasts (in ms)
export const TOAST_LIFETIME = 5000

export type CosToastNotificationType =
  | 'neutral'
  | 'positive'
  | 'warning'
  | 'error'

export type CosToastType = {
  id: string
  isLoading?: boolean
  /**
   * @default 'neutral'
   */
  type?: CosToastNotificationType
  title?: string
  message: string
  link?: {
    text: string
    href: string
  }
  time: string
}
