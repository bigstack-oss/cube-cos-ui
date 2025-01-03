import { ReactNode } from 'react'

type SectionProps = {
  title: string
  children: ReactNode
}

export const UILibrary_Section = (props: SectionProps) => {
  const { title, children } = props
  return (
    <div className="my-20">
      <h2 className="text-[28px] font-semibold">{title}</h2>
      <hr className="mb-8 mt-4" />
      {children}
    </div>
  )
}
