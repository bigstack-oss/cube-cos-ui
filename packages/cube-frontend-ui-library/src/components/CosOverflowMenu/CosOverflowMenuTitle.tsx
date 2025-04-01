type CosOverflowMenuTitleProps = {
  children: string
}

export const CosOverflowMenuTitle = (props: CosOverflowMenuTitleProps) => {
  const { children } = props

  return (
    <div className="primary-body4 truncate px-[22px] pb-1 pt-2 text-functional-text-light">
      {children}
    </div>
  )
}
