import { CosGeneralPanel } from '@cube-frontend/ui-library'
import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { LogConsole } from '@cube-frontend/web-app/components/LogConsole'
import { cva } from 'class-variance-authority'

type ReleaseNotePanelProps = {
  isOpen: boolean
  fallbackTitle: string
  version?: string
  releaseNote?: string
  onClose: () => void
}

const panel = cva('self-end overflow-hidden transition-all duration-300', {
  variants: {
    isOpen: {
      true: 'w-[480px]',
      false: 'w-0 px-0',
    },
  },
})

export const ReleaseNotePanel = (props: ReleaseNotePanelProps) => {
  const { isOpen, version, fallbackTitle, releaseNote = '', onClose } = props

  return (
    <CosGeneralPanel
      className={panel({ isOpen })}
      topic={version || fallbackTitle}
      dropdown={
        <button
          type="button"
          className="inline-flex size-8 cursor-pointer items-center justify-center"
          onClick={onClose}
        >
          <X className="icon-md text-functional-text" />
        </button>
      }
    >
      <LogConsole>{releaseNote || 'No data'}</LogConsole>
    </CosGeneralPanel>
  )
}
