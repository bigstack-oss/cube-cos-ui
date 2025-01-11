import { ReactNode } from 'react'

export type ColorPaletteRowProps = {
  children: ReactNode
  title: string
  desc?: string
}

export const ColorPaletteRow = (props: ColorPaletteRowProps) => {
  const { children, title, desc } = props

  return (
    <div className="grid grid-cols-4 gap-x-8">
      <div className="col-span-1 flex flex-col">
        <h3 className="secondary-h3 font-semibold">{title}</h3>
        {desc && (
          <p className="primary-body1 text-functional-text-light">{desc}</p>
        )}
      </div>
      <div className="col-span-3 flex flex-row flex-wrap items-start gap-x-4 gap-y-3">
        {children}
      </div>
    </div>
  )
}
