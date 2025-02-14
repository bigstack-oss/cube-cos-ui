import { PropsWithChildren } from 'react'

const Content = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <div className="h-[calc(100svh_-_54px)] overflow-scroll px-5 py-3">
      {children}
    </div>
  )
}

export default Content
