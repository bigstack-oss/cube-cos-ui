import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { CopyButton } from '@cube-frontend/web-app/components/CopyButton'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

type ValidationLogProps = {
  isOpen: boolean
  log: string
  onClose: () => void
}

const container = cva(
  'flex flex-col gap-y-4 overflow-hidden rounded-[5px] bg-grey-0 p-6 transition-all duration-300',
  {
    variants: {
      isOpen: {
        true: 'flex-1 shrink-0',
        false: 'w-0 whitespace-nowrap px-0',
      },
    },
  },
)

export const ValidationLog = (props: ValidationLogProps) => {
  const { isOpen, log, onClose } = props

  return (
    <div
      className={twMerge(container({ isOpen }))}
      style={{
        boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.20)',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="secondary-h4 text-functional-title">
          Validate Information
        </div>
        <button
          type="button"
          className="inline-flex size-[26px] cursor-pointer items-center justify-center"
          onClick={onClose}
        >
          <X className="icon-lg text-functional-text" />
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-end rounded-t-[5px] border border-functional-border-divider bg-scene-background px-[19px] py-3">
          <CopyButton copyContent={log} />
        </div>
        <div className="primary-body3 overflow-x-auto whitespace-pre rounded-b-[5px] bg-dark-700 px-6 py-4 text-functional-border-darker">
          {log || 'No result'}
        </div>
      </div>
    </div>
  )
}
