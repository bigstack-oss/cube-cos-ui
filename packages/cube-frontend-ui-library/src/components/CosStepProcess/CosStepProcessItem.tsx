import { cva } from 'class-variance-authority'
import { Fragment } from 'react/jsx-runtime'
import { twMerge } from 'tailwind-merge'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'

const item = {
  number: cva(
    'secondary-body7 flex size-4 shrink-0 items-center justify-center rounded-full text-white',
    {
      variants: {
        isActive: {
          true: 'bg-functional-text',
          false: 'bg-functional-disable-text',
        },
      },
    },
  ),
  label: cva('primary-body2', {
    variants: {
      isActive: {
        true: 'text-functional-text',
        false: 'text-functional-disable-text',
      },
    },
  }),
}

type CosStepProcessItemProps = {
  /**
   * The step serial number (1-based) that represents this step in the process.
   */
  serialNumber: number
  label: string
  isActive: boolean
  isLastItem: boolean
}

export const CosStepProcessItem = (props: CosStepProcessItemProps) => {
  const { serialNumber, label, isActive = false, isLastItem } = props
  return (
    <Fragment>
      <div className="flex items-center gap-3">
        <div className={twMerge(item.number({ isActive }))}>
          {serialNumber.toString()}
        </div>
        <p className={twMerge(item.label({ isActive }))}>{label}</p>
      </div>
      {!isLastItem && (
        <ChevronRight className="icon-lg text-functional-text-light" />
      )}
    </Fragment>
  )
}
