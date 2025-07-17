export const fileToBase64 = (file: File): Promise<string> => {
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64String = reader.result as string
      resolve(base64String.split(',')[1])
    }
    reader.onerror = (error) => {
      reject(error)
    }
  })
}
