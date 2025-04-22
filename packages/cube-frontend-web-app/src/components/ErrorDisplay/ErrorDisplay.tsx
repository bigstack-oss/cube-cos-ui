import { CosButton } from '@cube-frontend/ui-library'
import { useErrorBoundary } from 'react-error-boundary'
import { twMerge } from 'tailwind-merge'

type ErrorDisplayProps = {
  title: string
  message: string
}

export const ErrorDisplay = (props: ErrorDisplayProps) => {
  const { title, message } = props

  const { resetBoundary } = useErrorBoundary()

  const onGoBackClick = (): void => {
    history.back()
    resetBoundary()
  }

  return (
    <div className="flex flex-col items-center gap-y-6">
      <div
        className={twMerge([
          'h-36 font-urbanist text-[120px] font-semibold leading-[normal]',
          'bg-clip-text text-transparent bg-image-scene-gradient',
        ])}
      >
        {title}
      </div>
      <div className="primary-body3 w-[600px] text-center text-functional-text">
        {message}
      </div>
      <CosButton onClick={onGoBackClick}>Go back</CosButton>
    </div>
  )
}
