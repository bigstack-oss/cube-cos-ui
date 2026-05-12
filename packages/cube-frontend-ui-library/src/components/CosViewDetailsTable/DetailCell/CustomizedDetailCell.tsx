import { containerClasses } from './styles'

type CustomizedDetailCellProps = {
  isExpanded: boolean
  children: React.ReactNode
}

export const CustomizedDetailCell = (props: CustomizedDetailCellProps) => {
  const { isExpanded, children } = props

  return <div className={containerClasses({ isExpanded })}>{children}</div>
}
