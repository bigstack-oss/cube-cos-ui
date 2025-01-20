import { PropsWithChildren } from 'react'
import {
  CosButton,
  CosButtonProps,
} from '../../../components/CosButton/CosButton'
import Home01 from '../../../components/CosIcon/monochrome/home_01.svg?react'
import ChevronDown from '../../../components/CosIcon/monochrome/chevron_down.svg?react'

const StateText = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <span className="primary-body2 flex items-center justify-start text-functional-title">
      {children}
    </span>
  )
}

const ButtonGridItem = (props: PropsWithChildren) => {
  const { children } = props
  return <div className="flex items-center justify-start">{children}</div>
}

export type ButtonStateRowProps = Omit<CosButtonProps, 'children'> & {
  stateText: string
  showStateText: boolean
  buttonText: string
}

export const ButtonStateRow = (props: ButtonStateRowProps) => {
  const {
    showStateText,
    stateText,
    type,
    size,
    disabled,
    onClick,
    loading,
    buttonText,
  } = props

  return (
    <>
      {showStateText && <StateText>{stateText}</StateText>}
      <ButtonGridItem>
        <CosButton
          size={size}
          type={type}
          usage="text-only"
          loading={loading}
          disabled={disabled}
          onClick={onClick}
        >
          {buttonText}
        </CosButton>
      </ButtonGridItem>
      <ButtonGridItem>
        <CosButton
          size={size}
          type={type}
          usage="icon-only"
          Icon={Home01}
          loading={loading}
          disabled={disabled}
          onClick={onClick}
        />
      </ButtonGridItem>
      <ButtonGridItem>
        <CosButton
          size={size}
          type={type}
          usage="icon-left"
          Icon={Home01}
          loading={loading}
          disabled={disabled}
          onClick={onClick}
        >
          {buttonText}
        </CosButton>
      </ButtonGridItem>
      <ButtonGridItem>
        <CosButton
          size={size}
          type={type}
          usage="icon-right"
          Icon={ChevronDown}
          loading={loading}
          disabled={disabled}
          onClick={onClick}
        >
          {buttonText}
        </CosButton>
      </ButtonGridItem>
    </>
  )
}
