import { PropsWithChildren, ReactElement } from 'react'
import { CosHyperlinkProps } from '../CosHyperlink/CosHyperlink'

export type CosNotificationType = 'neutral' | 'positive' | 'warning' | 'error'

export type CosNotificationBaseProps = {
  /**
   * @default 'neutral'
   */
  type?: CosNotificationType
  title?: string
  link?: Pick<CosHyperlinkProps, 'className' | 'href' | 'onClick'> & {
    Container?: ReactElement<PropsWithChildren>
    text: string
  }
  onClose?: () => void
}
