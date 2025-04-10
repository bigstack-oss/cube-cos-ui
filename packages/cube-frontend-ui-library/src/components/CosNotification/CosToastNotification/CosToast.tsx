import { useEffect } from 'react'
import { CosToastType, TOAST_LIFETIME } from './utils'
import { cva } from 'class-variance-authority'
import CircleFill from '../../../components/CosIcon/monochrome/circle_fill.svg?react'
import WarningFilled from '../../../components/CosIcon/monochrome/warning_filled.svg?react'
import WarningAltFilled from '../../../components/CosIcon/monochrome/warning_alt_filled.svg?react'
import CloseIcon from '../../../components/CosIcon/monochrome/x_small.svg?react'
import { CosHyperlink } from '../../CosHyperlink/CosHyperlink'

const toastStyles = cva(
  [
    'flex w-[352px] shrink-0 flex-col gap-[10px] rounded-[5px] border p-5',
    'primary-body4 text-functional-text-light',
  ],
  {
    variants: {
      type: {
        neutral: 'border-primary bg-primary-0',
        positive: 'border-status-positive bg-green-0',
        warning: 'border-status-warning bg-yellow-0',
        error: 'border-status-negative bg-red-0',
      },
    },
  },
)

type CosToastProps = CosToastType & {
  onToastClose: (id: string) => void
}

export const CosToast = (props: CosToastProps) => {
  const {
    id,
    type = 'neutral',
    title,
    message,
    link,
    onToastClose,
    time,
  } = props

  const renderIcon = () => {
    switch (type) {
      case 'positive':
        return <CircleFill className="icon-md shrink-0 text-status-positive" />
      case 'warning':
        return (
          <WarningAltFilled className="icon-md shrink-0 text-status-warning" />
        )
      case 'error':
        return (
          <WarningFilled className="icon-md shrink-0 text-status-negative" />
        )
      default:
        return null
    }
  }

  const renderHeader = () => {
    if (!title) return null

    return (
      <div className="flex items-center gap-[6px]">
        {renderIcon()}
        <div className="font-semibold text-functional-title">{title}</div>
      </div>
    )
  }

  const renderLink = () => {
    if (!link) return null

    return (
      <CosHyperlink size="sm" variant="text-inline" href={link.href}>
        {link.text}
      </CosHyperlink>
    )
  }

  const renderTime = () => {
    return <div className="primary-body5 ml-auto">{time}</div>
  }

  const renderCloseButton = () => {
    return (
      <CloseIcon
        className="icon-md shrink-0 cursor-pointer text-functional-text hover:text-functional-text-light"
        onClick={() => onToastClose(id)}
      />
    )
  }

  return (
    <div className={toastStyles({ type })}>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-3">
          {renderHeader()}
          {message}
        </div>
        {renderCloseButton()}
      </div>
      <div className="flex w-full items-center">
        {renderLink()}
        {renderTime()}
      </div>
    </div>
  )
}

export const CosToastWrapper = (props: CosToastProps) => {
  const { id, onToastClose, ...restProps } = props

  useEffect(() => {
    const timer = setTimeout(() => {
      onToastClose(id)
    }, TOAST_LIFETIME)

    return () => clearTimeout(timer)
  }, [id, onToastClose])

  return <CosToast {...restProps} id={id} onToastClose={onToastClose} />
}
