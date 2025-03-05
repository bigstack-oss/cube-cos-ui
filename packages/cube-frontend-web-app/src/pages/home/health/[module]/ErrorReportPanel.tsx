import { CosButton } from '@cube-frontend/ui-library'
import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { cva } from 'class-variance-authority'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'
import { ErrorLog } from './ErrorLog'
import { HistoryRow, widthTransitionClasses } from './healthDetailsUtils'

export type ErrorReportPanelProps = {
  isOpen: boolean
  historyRow: HistoryRow | undefined
  onClose: () => void
}

const panel = cva(
  [
    'flex flex-col overflow-hidden rounded-[5px]',
    'bg-grey-0 shadow-[0px_0px_3px_0px_rgba(0,_0,_0,_0.10)]',
    widthTransitionClasses,
  ],
  {
    variants: {
      isOpen: {
        true: 'w-2/5 p-6',
        false: 'w-0 whitespace-nowrap',
      },
    },
  },
)

export const ErrorReportPanel = (props: ErrorReportPanelProps) => {
  const { isOpen, historyRow, onClose } = props

  const getTimeText = (): string | undefined => {
    if (!historyRow) {
      return 'No row selected'
    }
    return dayjs(historyRow.time).format('YYYY/MM/DD hh:mm A')
  }

  return (
    <div className={twMerge(panel({ isOpen }))}>
      <div className="flex items-center justify-between">
        <span
          className={twMerge(
            'primary-h5 text-functional-text',
            !historyRow && 'text-grey-850',
          )}
        >
          {getTimeText()}
        </span>
        <CosButton
          className="rounded-full text-functional-text"
          type="ghost"
          usage="icon-only"
          Icon={X}
          onClick={onClose}
        />
      </div>
      <div className="primary-body3 mt-2 text-grey-850">
        {historyRow?.error?.description ?? historyRow?.status.toUpperCase()}
      </div>
      {historyRow?.error && <ErrorLog error={historyRow.error} />}
    </div>
  )
}
