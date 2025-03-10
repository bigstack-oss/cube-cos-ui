import { useEffect } from 'react'
import { CosModalProps } from './CosModal'

type UseCloseModalWithEscOptions = Pick<
  CosModalProps,
  'isOpen' | 'onCloseClick'
>

const isFormControl = (
  activeElement: Element | null,
): activeElement is
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement => {
  if (!activeElement) {
    return false
  }
  return (
    activeElement instanceof HTMLInputElement ||
    activeElement instanceof HTMLTextAreaElement ||
    activeElement instanceof HTMLSelectElement
  )
}

export const useCloseModalWithEsc = (
  options: UseCloseModalWithEscOptions,
): void => {
  const { isOpen, onCloseClick } = options

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      if (!isOpen || e.key !== 'Escape') {
        return
      }

      // If a form control (input, textarea, or select) is focused, blur it
      // instead of closing the modal.
      const focusedElement = document.activeElement
      if (isFormControl(focusedElement)) {
        focusedElement.blur()
        return
      }

      onCloseClick()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onCloseClick])
}
