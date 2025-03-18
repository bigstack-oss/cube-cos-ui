import { useEffect, useRef, useState } from 'react'
import { normalizeValue } from './cosTextAreaUtils'

interface UseTextAreaOverflowProps {
  valueProps: string | number | readonly string[] | undefined
  maxLength: number
}

export const useTextAreaOverflow = (props: UseTextAreaOverflowProps) => {
  const { valueProps, maxLength } = props

  const formattedValue = normalizeValue(valueProps)

  const [displayValue, setDisplayValue] = useState<string>()
  const [isFocused, setIsFocused] = useState(false)

  const mirrorRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!mirrorRef.current || !textareaRef.current) return

    mirrorRef.current.style.width = `${textareaRef.current.clientWidth}px`
    mirrorRef.current.innerText = formattedValue

    /**
     * If text overflows and textarea is NOT focused, show ellipsis
     * Otherwise, show full text
     */
    if (
      mirrorRef.current.scrollHeight > textareaRef.current.clientHeight &&
      !isFocused
    ) {
      let truncatedText = formattedValue

      while (
        mirrorRef.current.scrollHeight > textareaRef.current.clientHeight &&
        truncatedText.length > 0
      ) {
        truncatedText = truncatedText.slice(0, -1)
        mirrorRef.current.innerText = truncatedText + '…'
      }
      setDisplayValue(truncatedText + '…')
    } else {
      setDisplayValue(formattedValue)
    }
  }, [formattedValue, isFocused, maxLength])

  return {
    formattedValue,
    displayValue,
    textareaRef,
    mirrorRef,
    isFocused,
    setIsFocused,
  }
}
