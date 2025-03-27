import { PropsWithChildren } from 'react'

type SpecEntryProps = PropsWithChildren & {
  specName: string | undefined
  valueLabel: string
}

export const SpecEntry = (props: SpecEntryProps) => {
  const { children, specName, valueLabel } = props

  return (
    <div className="flex gap-x-4 px-4 py-3">
      <div className="flex min-w-[170px] flex-col gap-y-1.5">
        <div className="primary-body2 font-semibold">Key</div>
        <p className="primary-body3 py-[9px]">{specName}</p>
      </div>
      <div className="flex flex-col gap-y-1.5">
        <div className="primary-body2 font-semibold">{valueLabel}</div>
        {children}
      </div>
    </div>
  )
}
