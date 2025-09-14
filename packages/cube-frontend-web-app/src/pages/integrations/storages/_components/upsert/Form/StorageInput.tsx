import {
  CosInput,
  CosInputProps,
  CosPasswordInput,
} from '@cube-frontend/ui-library'

/**
 * Storage fields are too dynamic and the backend cannot determine which ones are passwords,
 * so the UI infer them by matching the key patterns.
 */
const isPasswordField = (fieldName: string | undefined): boolean => {
  if (!fieldName) return false

  const passwordIndicators = ['password', 'secret', 'passwd', 'pwd']

  return passwordIndicators.some((indicator) =>
    fieldName.toLowerCase().includes(indicator),
  )
}

export type StorageInputProps = Omit<CosInputProps, 'trailingIcon' | 'type'>

export const StorageInput = (props: StorageInputProps) => {
  return isPasswordField(props.label) ? (
    <CosPasswordInput {...props} />
  ) : (
    <CosInput {...props} />
  )
}
