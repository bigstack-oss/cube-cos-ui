import { PropsWithChildren } from 'react'

type PanelLayoutSectionProps = PropsWithChildren<{
  title: string
  description?: string
}>

export const PanelLayoutSection = (props: PanelLayoutSectionProps) => {
  const { children, title, description } = props
  return (
    <div className="mb-10 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <div className="primary-body2 font-medium text-functional-title">
          {title}
        </div>
        {description && (
          <div className="primary-body4 text-functional-text">
            {description}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}
