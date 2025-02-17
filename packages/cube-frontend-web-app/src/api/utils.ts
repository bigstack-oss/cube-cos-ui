import { Configuration } from '@cube-frontend/api'

export const config = new Configuration({ basePath: '.' })

export const validateStatus = (status: number) => {
  if (status >= 200 && status <= 300) return true
  return false
}
