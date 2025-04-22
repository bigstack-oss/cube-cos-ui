import { AxiosError } from 'axios'
import { ReactNode } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import { GeneralErrorDisplay } from './GeneralErrorDisplay'
import { HttpErrorDisplay } from './HttpErrorDisplay'

type CosErrorBoundaryProps = {
  containerClassName?: ClassNameValue
  children: ReactNode
}

export const CosErrorBoundary = (props: CosErrorBoundaryProps) => {
  const { containerClassName, children } = props

  const renderErrorDisplay = (fallbackProps: FallbackProps) => {
    const { error } = fallbackProps

    let errorDisplay: ReactNode
    if (error instanceof AxiosError) {
      errorDisplay = (
        <HttpErrorDisplay statusCode={error.response?.status ?? 0} />
      )
    } else {
      errorDisplay = <GeneralErrorDisplay />
    }

    return (
      <div
        className={twMerge(
          'flex size-full items-center justify-center',
          containerClassName,
        )}
      >
        {errorDisplay}
      </div>
    )
  }

  const onError = (error: Error): void => {
    console.error('Error caught by error boundary: ', error)
  }

  return (
    <ErrorBoundary fallbackRender={renderErrorDisplay} onError={onError}>
      {children}
    </ErrorBoundary>
  )
}
