import { ReactElement } from 'react'
import { CosStepProcessItem } from './CosStepProcessItem'
import { CosStepProcessSkeleton } from './CosStepProcessSkeleton'

export type CosStepProcessProps = {
  isLoading?: boolean
  children?:
    | ReactElement<typeof CosStepProcessItem>[]
    | ReactElement<typeof CosStepProcessItem>
}

export const CosStepProcess = (props: CosStepProcessProps) => {
  const { children, isLoading } = props

  if (isLoading) {
    return <CosStepProcessSkeleton />
  }

  return <div className="flex items-center gap-3">{children}</div>
}

CosStepProcess.Item = CosStepProcessItem
