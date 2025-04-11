export type CosNotificationType = 'neutral' | 'positive' | 'warning' | 'error'

export type CosNotificationBaseProps = {
  /**
   * @default 'neutral'
   */
  type?: CosNotificationType
  title?: string
  link?: {
    text: string
    href: string
  }
  onClose?: () => void
}
