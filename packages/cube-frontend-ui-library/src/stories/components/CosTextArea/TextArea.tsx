import {
  CosTextArea,
  CosTextAreaProps,
} from '../../../components/CosTextArea/CosTextArea'
import { ChangeEvent, useState } from 'react'

type TextAreaProps = CosTextAreaProps & {
  defaultValue: string | undefined
}

export const TextArea = (props: TextAreaProps) => {
  const { defaultValue, ...restProps } = props

  const [value, setValue] = useState<string | undefined>(defaultValue)

  const handleValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  return (
    <CosTextArea {...restProps} value={value} onChange={handleValueChange} />
  )
}
