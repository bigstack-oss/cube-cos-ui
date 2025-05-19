import { CosIconText } from '../CosIconText/CosIconText'

type CosMessageProps = {
  label?: string
  time?: string
  tag?: string
  title: string
  children: string
}

export const CosMessage = (props: CosMessageProps) => {
  const { children, label, time, tag, title } = props

  const renderLabel = () => {
    return (
      <div className="secondary-body2 font-semibold text-functional-text">
        {label}
      </div>
    )
  }

  const renderTime = () => {
    if (!time) return null
    return (
      <div className="secondary-body5 text-functional-text-light">
        Time: {time}
      </div>
    )
  }

  const renderHeader = () => {
    if (!label && !time) return null
    return (
      <div className="flex items-center justify-between">
        {renderLabel()}
        {renderTime()}
      </div>
    )
  }

  const renderTag = () => {
    if (!tag) return null
    return <CosIconText type="primary">{tag}</CosIconText>
  }

  return (
    <div className="flex flex-col gap-y-1">
      {renderHeader()}
      <div className="flex items-center gap-3 rounded-[5px] bg-secondary-50 px-4 py-[14px]">
        {renderTag()}
        <p className="primary-body3 text-primary">{title}</p>
        <p className="primary-body3 text-functional-text">{children}</p>
      </div>
    </div>
  )
}
