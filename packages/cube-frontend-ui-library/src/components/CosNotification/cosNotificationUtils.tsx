import CircleFill from '../../components/CosIcon/monochrome/circle_fill.svg?react'
import WarningFilled from '../../components/CosIcon/monochrome/warning_filled.svg?react'
import WarningAltFilled from '../../components/CosIcon/monochrome/warning_alt_filled.svg?react'
import CloseIcon from '../../components/CosIcon/monochrome/x_small.svg?react'
import { CosHyperlink } from '../CosHyperlink/CosHyperlink'
import {
  CosNotificationType,
  CosNotificationBaseProps,
} from './cosNotificationTypes'
import { cloneElement } from 'react'

export const renderIcon = (type: CosNotificationType) => {
  switch (type) {
    case 'positive':
      return <CircleFill className="icon-md shrink-0 text-status-positive" />
    case 'warning':
      return (
        <WarningAltFilled className="icon-md shrink-0 text-status-warning" />
      )
    case 'error':
      return <WarningFilled className="icon-md shrink-0 text-status-negative" />
    default:
      return null
  }
}

export const renderTitle = (title?: string) => {
  if (!title) {
    return null
  }
  return <div className="font-semibold text-functional-title">{title}</div>
}

export const renderLink = (link?: CosNotificationBaseProps['link']) => {
  if (!link) {
    return null
  }

  const { className, href, onClick, Container, text } = link

  const cosHyperlink = (
    <CosHyperlink
      size="sm"
      variant="text-inline"
      className={className}
      href={href}
      onClick={onClick}
    >
      {text}
    </CosHyperlink>
  )

  if (Container) {
    return cloneElement(Container, {
      children: cosHyperlink,
    })
  }

  return cosHyperlink
}

export const renderCloseButton = (handleClose: () => void) => {
  return (
    <CloseIcon
      className="icon-md shrink-0 cursor-pointer text-functional-text hover:text-functional-text-light"
      onClick={handleClose}
    />
  )
}
