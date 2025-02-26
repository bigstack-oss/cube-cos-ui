import { UseFloatingExternalContextProvider } from '@cube-frontend/ui-library'
import { PropsWithChildren } from 'react'

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
        {children}
      </UseFloatingExternalContextProvider>
    </div>
  )
}

export default Content
