import { useEffect } from 'react'
import { CosToastType, TOAST_LIFETIME } from './utils'
import { cva } from 'class-variance-authority'
import {
  renderCloseButton,
  renderIcon,
  renderLink,
  renderTitle,
} from '../cosNotificationUtils'

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

  const renderHeader = () => {
    if (!title) return null

    return (
      <div className="flex items-center gap-[6px]">
        {renderIcon(type)}
        {renderTitle(title)}
      </div>
    )
  }

  const renderTime = () => {
    return <div className="primary-body5 ml-auto">{time}</div>
  }

  const handleClose = () => onToastClose(id)

  return (
    <div className={toastStyles({ type })}>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-3">
          {renderHeader()}
          {message}
        </div>
        {renderCloseButton(handleClose)}
      </div>
      <div className="flex w-full items-center">
        {renderLink(link)}
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
