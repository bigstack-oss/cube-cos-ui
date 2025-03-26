export const download = (url: string, filename: string) => {
  const link = document.createElement('a')
  document.body.appendChild(link)
  link.href = url
  link.download = filename
  link.target = '_blank'
  link.click()
  link.remove()
}
