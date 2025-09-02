import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { CosProgressBar } from '../CosProgressBar/CosProgressBar'

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

  return (
    <div className="flex flex-col gap-y-2 rounded-[5px] border border-functional-border-divider p-4">
      {renderHeader()}
      <CosProgressBar progress={progress} color="bg-chart-2" />
    </div>
  )
}
