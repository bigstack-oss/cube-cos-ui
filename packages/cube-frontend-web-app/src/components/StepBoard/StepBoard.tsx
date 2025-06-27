import { PropsWithClassName } from '@cube-frontend/utils'
import { PropsWithChildren } from 'react'

type StepBoardProps = PropsWithChildren<PropsWithClassName>

export const StepBoard = (props: StepBoardProps) => {
  const { children } = props

  return (
    <div
      className="flex flex-col gap-y-4 rounded-[5px] bg-grey-0 px-6 py-4"
      style={{ boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.10)' }}
    >
      {children}
    </div>
  )
}
