import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
  title: string
  desc?: string
}

export const UILibrary_Layout = (props: LayoutProps) => {
  const { children, title, desc } = props
  return (
    <section className="m-8 flex flex-col space-y-8">
      <div className="space-y-4">
        <h1 className="text-[40px] font-bold">{title}</h1>
        {desc && <p className="text-dark-300">{desc}</p>}
      </div>
      <div className="">{children}</div>
    </section>
  )
}
