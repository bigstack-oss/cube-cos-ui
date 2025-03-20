import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

const style = twMerge([
  'flex w-full flex-col gap-3 rounded-[5px] bg-scene-background p-6',
  'border-l-[5px] border-l-cosmos-secondary',
  'border-r border-r-functional-border-divider',
  'border-y border-y-functional-border-divider',
  'shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
])

type CosStackCardProps = PropsWithChildren<{
  title: string
  subtext?: string
}>

export const CosStackCard = (props: CosStackCardProps) => {
  const { title, subtext, children } = props
  return (
    <div className={style}>
      <div className="flex items-center gap-3">
        <h5 className="primary-h5 text-functional-title">{title}</h5>
        {subtext && (
          <p className="primary-body3 text-functional-text">{subtext}</p>
        )}
      </div>
      <div className="primary-body5 text-functional-text-light">{children}</div>
    </div>
  )
}
