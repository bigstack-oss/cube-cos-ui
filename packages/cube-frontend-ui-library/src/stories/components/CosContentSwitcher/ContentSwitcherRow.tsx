export type ContentSwitcherRowProps = {
  title: string
  children: React.ReactNode
}

export const ContentSwitcherRow = (props: ContentSwitcherRowProps) => {
  const { title, children } = props

  return (
    <div className="flex items-center gap-x-8">
      <span className="primary-body2 w-[100px] font-semibold">{title}</span>
      <div>{children}</div>
    </div>
  )
}
