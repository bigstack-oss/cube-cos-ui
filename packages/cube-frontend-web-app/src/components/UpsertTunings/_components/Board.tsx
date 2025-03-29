import { PropsWithChildren } from 'react'

export const Board = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <div
      className="mt-4 flex flex-col gap-y-4 rounded-[5px] bg-grey-0 px-6 py-4"
      style={{ boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.10)' }}
    >
      {children}
    </div>
  )
}
