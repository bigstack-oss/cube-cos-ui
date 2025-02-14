export type UserNameTagProps = {
  children: string
}

export const UserNameTag = (props: UserNameTagProps) => {
  const { children } = props

  return (
    <div className="primary-body5 flex items-center justify-center rounded border border-primary px-[5px] font-medium text-primary">
      {children}
    </div>
  )
}
