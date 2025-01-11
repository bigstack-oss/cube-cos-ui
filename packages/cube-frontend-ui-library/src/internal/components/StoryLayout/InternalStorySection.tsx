import { ReactNode } from 'react'

export type InternalStorySectionProps = {
  title: string
  children: ReactNode
}

export const INTERNAL_StorySection = (props: InternalStorySectionProps) => {
  const { title, children } = props

  return (
    <div className="flex flex-col">
      <h2 className="secondary-h2 text-4xl text-functional-title">{title}</h2>
      <hr className="mb-8 mt-4" />
      {children}
    </div>
  )
}
