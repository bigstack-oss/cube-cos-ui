export type UploadInputProps = {
  ref: React.RefObject<HTMLInputElement | null>
  accept?: string
  onFileSelect: (file: File) => Promise<unknown>
}

export const UploadInput = (props: UploadInputProps) => {
  const { ref, accept, onFileSelect } = props

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    await onFileSelect(file)

    event.target.value = ''
  }

  return (
    <input
      ref={ref}
      type="file"
      accept={accept}
      hidden={true}
      onChange={handleFileChange}
    />
  )
}
