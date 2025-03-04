import { ReactNode } from 'react'

export const CosPaginationItemWrap = (props: { children: ReactNode }) => {
  const { children } = props

  return (
    <div className="secondary-body2 flex p-[6px] text-center">{children}</div>
  )
}
