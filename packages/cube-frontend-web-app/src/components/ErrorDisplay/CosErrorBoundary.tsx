import { AxiosError } from 'axios'
import { ReactNode, useMemo } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'
import { Location, useLocation } from 'react-router'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import { GeneralErrorDisplay } from './GeneralErrorDisplay'
import { HttpErrorDisplay } from './HttpErrorDisplay'

type CosErrorBoundaryProps = {
  containerClassName?: ClassNameValue
  children: ReactNode
}

// Use customized serialize function because `location.key` changes
// every time even for the same route.
const serializeLocation = (location: Location): string => {
  const { pathname, search, hash } = location
  return `${pathname}${search}${hash}`
}

export const CosErrorBoundary = (props: CosErrorBoundaryProps) => {
  const { containerClassName, children } = props

  const location = useLocation()

  const serializedLocation = useMemo<string>(
    () => serializeLocation(location),
    [location],
  )

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
    <ErrorBoundary
      resetKeys={[serializedLocation]}
      fallbackRender={renderErrorDisplay}
      onError={onError}
    >
      {children}
    </ErrorBoundary>
  )
}
