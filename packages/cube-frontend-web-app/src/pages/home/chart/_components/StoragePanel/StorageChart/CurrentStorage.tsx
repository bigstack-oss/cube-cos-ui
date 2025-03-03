import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

type CurrentProps = {
  type: 'read' | 'write'
  label: string
  value: number | string
}

const currentDot = cva('size-[6px] rounded-full', {
  variants: {
    type: {
      read: 'bg-primary',
      write: 'bg-secondary',
    },
  },
})

export const Current = (props: CurrentProps) => {
  const { type, label, value } = props

  return (
    <div className="flex items-center gap-x-3">
      <div className="flex items-center gap-x-1">
        <div className={twMerge(currentDot({ type }))} />
        <span className="primary-body5 text-functional-text">{label}</span>
      </div>
      <span className="primary-h5 text-functional-title">{value}</span>
    </div>
  )
}
