import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { CosLoadingSpinner } from '@cube-frontend/ui-library'

const StorageChartLoading = () => {
  return (
    <div className="absolute left-0 top-0 flex size-full items-center justify-center opacity-20">
      <CosLoadingSpinner className="absolute" variant="dot120" />
    </div>
  )
}

export type StorageChartContainerProps = {
  isLoading: boolean
} & PropsWithChildren

export const StorageChartContainer = (props: StorageChartContainerProps) => {
  const { isLoading, children } = props

  return (
    <div className="relative">
      {isLoading && <StorageChartLoading />}
      <div
        className={twMerge('flex flex-col gap-y-4', isLoading && 'opacity-20')}
      >
        {children}
      </div>
    </div>
  )
}
