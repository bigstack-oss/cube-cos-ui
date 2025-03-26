import { ReactElement } from 'react'
import { CosStepProcessItem } from './CosStepProcessItem'
import { CosStepProcessSkeleton } from './CosStepProcessSkeleton'
import { PropsWithClassName } from '@cube-frontend/utils'
import { twMerge } from 'tailwind-merge'

export type CosStepProcessProps = PropsWithClassName & {
  isLoading?: boolean
  children?:
    | ReactElement<typeof CosStepProcessItem>[]
    | ReactElement<typeof CosStepProcessItem>
}

export const CosStepProcess = (props: CosStepProcessProps) => {
  const { className, children, isLoading } = props

  if (isLoading) {
    return <CosStepProcessSkeleton />
  }

  return (
    <div className={twMerge('flex items-center gap-3', className)}>
      {children}
    </div>
  )
}

CosStepProcess.Item = CosStepProcessItem
