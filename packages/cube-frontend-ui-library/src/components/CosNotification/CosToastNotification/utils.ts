import { CosNotificationBaseProps } from '../cosNotificationTypes'

// Visible toasts amount
export const MAX_VISIBLE_TOASTS_AMOUNT = 4

// Default lifetime of a toasts (in ms)
export const TOAST_LIFETIME = 5000

export type CosToastType = CosNotificationBaseProps & {
  id: string
  message: string
  time: string
}
