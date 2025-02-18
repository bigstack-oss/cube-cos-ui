import { PropsWithChildren } from 'react'

export type CosPanelProps = PropsWithChildren & {
  title: string
}

// TODO: Implement CosPanel component according to the COS design guideline.
export const CosPanel = (props: CosPanelProps) => {
  const { title, children } = props

  return (
    <div
      className="flex flex-col gap-y-3 rounded-[5px] bg-grey-0 p-4"
      style={{ boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.20)' }}
    >
      <div className="secondary-body1 text-primary">{title}</div>
      <div>{children}</div>
    </div>
  )
}
