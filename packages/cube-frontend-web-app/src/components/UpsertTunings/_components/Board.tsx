import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { PropsWithChildren } from 'react'

export const Board = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <CosGeneralPanel containerClassName="mt-4">
      <div className="flex flex-col gap-y-4">{children}</div>
    </CosGeneralPanel>
  )
}
