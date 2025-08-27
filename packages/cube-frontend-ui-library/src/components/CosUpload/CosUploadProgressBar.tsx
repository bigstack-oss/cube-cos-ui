import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { CSSProperties } from 'react'

type CosUploadProgressBarProps = {
  fileName: string
  progress: number
  onAbortClick: () => void
}

export const CosUploadProgressBar = (props: CosUploadProgressBarProps) => {
  const { fileName, progress, onAbortClick } = props

  const renderHeader = () => {
    return (
      <div className="flex items-center gap-x-2">
        <div className="primary-body2 w-full truncate font-medium text-functional-title">
          {fileName}
        </div>
        <X className="icon-md shrink-0 cursor-pointer" onClick={onAbortClick} />
      </div>
    )
  }

  const renderProgressBar = () => {
    const progressStyle: CSSProperties = {
      width: `${progress}%`,
    }
    return (
      <div className="flex items-center gap-x-2">
        <div className="relative h-[9px] w-full rounded-[10px] bg-functional-border-divider">
          <div
            className="absolute left-0 top-0 h-full rounded-[10px] bg-chart-2 transition-[width]"
            style={progressStyle}
          />
        </div>
        <span className="primary-body5 shrink-0 text-functional-text">{`${progress}%`}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 rounded-[5px] border border-functional-border-divider p-4">
      {renderHeader()}
      {renderProgressBar()}
    </div>
  )
}
