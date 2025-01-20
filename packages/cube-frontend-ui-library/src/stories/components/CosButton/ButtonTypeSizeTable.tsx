import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  CosButtonSize,
  CosButtonType,
} from '../../../components/CosButton/CosButton'
import { ButtonStateRow } from './ButtonStateRow'

const UsageText = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <span className="primary-body2 flex items-center justify-center text-functional-title">
      {children}
    </span>
  )
}

type UsageHeaderRowProps = {
  showState: boolean
}

const UsageHeaderRow = (props: UsageHeaderRowProps) => {
  const { showState } = props
  return (
    <>
      {showState && <UsageText />}
      <UsageText>Text only</UsageText>
      <UsageText>Icon only</UsageText>
      <UsageText>Icon left</UsageText>
      <UsageText>Icon right</UsageText>
    </>
  )
}

type ButtonTypeSizeTableProps = {
  type: CosButtonType
  size: CosButtonSize
  buttonText: string
  showUsageHeader: boolean
  showState: boolean
}

export const ButtonTypeSizeTable = (props: ButtonTypeSizeTableProps) => {
  const { size, type, buttonText, showUsageHeader, showState } = props

  const className = twMerge(
    'grid shrink-0 gap-x-[18px] gap-y-6',
    showState
      ? 'grid-cols-[90px_minmax(140px,1fr),minmax(62px,1fr),minmax(156px,1fr),minmax(156px,1fr)]'
      : 'grid-cols-[minmax(140px,1fr),minmax(62px,1fr),minmax(156px,1fr),minmax(156px,1fr)]',
  )

  return (
    <div className={className}>
      {showUsageHeader && <UsageHeaderRow showState={showState} />}
      <ButtonStateRow
        stateText="Default"
        showStateText={showState}
        size={size}
        type={type}
        buttonText={buttonText}
      />
      <ButtonStateRow
        stateText="Disable"
        showStateText={showState}
        size={size}
        type={type}
        disabled={true}
        buttonText={buttonText}
      />
      <ButtonStateRow
        stateText="Loading"
        showStateText={showState}
        size={size}
        type={type}
        loading={true}
        buttonText={buttonText}
      />
    </div>
  )
}
