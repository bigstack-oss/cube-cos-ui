import { UseFloatingExternalContextProvider } from '@cube-frontend/ui-library'
import { PropsWithChildren } from 'react'
import { CosErrorBoundary } from '../components/ErrorDisplay/CosErrorBoundary'

const containerId = 'cos-content-container'

const Content = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <div
      id={containerId}
      className="h-[calc(100svh_-_54px)] overflow-auto px-5 py-3"
    >
      <UseFloatingExternalContextProvider
        scrollableRootSelector={`#${containerId}`}
      >
        {/* Page content level error boundary. This ensures sidebar and navbar
        remain visible if an uncaught error is thrown by the page content. */}
        <CosErrorBoundary>{children}</CosErrorBoundary>
      </UseFloatingExternalContextProvider>
    </div>
  )
}

export default Content
