import { PropsWithChildren } from 'react'
import { ButtonSizeRow } from './ButtonSizeRow'

const TypeText = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <span className="primary-body1 flex items-center justify-center font-semibold text-functional-title">
      {children}
    </span>
  )
}

const VariantHeaderRow = () => {
  return (
    <>
      <TypeText />
      <TypeText>Primary</TypeText>
      <TypeText>Secondary</TypeText>
      <TypeText>Ghost</TypeText>
      <TypeText>Warning</TypeText>
      <TypeText>Light</TypeText>
    </>
  )
}

type ButtonVariantTableProps = {
  buttonText: string
}

export const ButtonVariantTable = (props: ButtonVariantTableProps) => {
  const { buttonText } = props

  return (
    <div className="grid grid-cols-[repeat(6,auto)] grid-rows-[100px_repeat(auto)] gap-14">
      <VariantHeaderRow />
      <ButtonSizeRow
        sizeText="MD"
        size="md"
        buttonText={buttonText}
        showUsageHeader={true}
      />
      <ButtonSizeRow
        sizeText="SM"
        size="sm"
        buttonText={buttonText}
        showUsageHeader={false}
      />
      <ButtonSizeRow
        sizeText="LG"
        size="lg"
        buttonText={buttonText}
        showUsageHeader={false}
      />
    </div>
  )
}
