import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { LogConsole } from '@cube-frontend/web-app/components/LogConsole'
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
      <LogConsole>{log || 'No result'}</LogConsole>
    </div>
  )
}
