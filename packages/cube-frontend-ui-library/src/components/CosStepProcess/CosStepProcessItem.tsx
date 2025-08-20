import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'

const item = {
  number: cva(
    'secondary-body7 flex size-4 shrink-0 items-center justify-center rounded-full font-extrabold text-white',
    {
      variants: {
        isActive: {
          true: 'bg-functional-text',
          false: 'bg-functional-disable-text',
        },
      },
    },
  ),
  label: cva('primary-body3', {
    variants: {
      isActive: {
        true: 'font-semibold text-functional-text',
        false: 'text-functional-disable-text',
      },
    },
  }),
}

export type CosStepProcessItemProps = {
  /**
   * The step serial number (1-based) that represents this step in the process.
   */
  stepNumber: number
  label: string
  isActive: boolean
}

export const CosStepProcessItem = (props: CosStepProcessItemProps) => {
  const { stepNumber, label, isActive } = props
  return (
    <div className="group flex items-center gap-3">
      <div className="flex items-center gap-3">
        <div className={twMerge(item.number({ isActive }))}>
          {stepNumber.toString()}
        </div>
        <p className={twMerge(item.label({ isActive }))}>{label}</p>
      </div>
      <ChevronRight className="icon-lg text-functional-text-light group-last:hidden" />
    </div>
  )
}
