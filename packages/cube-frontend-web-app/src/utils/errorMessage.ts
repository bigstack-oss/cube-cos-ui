import { isAxiosError } from 'axios'
import { isCosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'

export const parseErrorMessage = (error: unknown): string | undefined => {
  if (isAxiosError(error) && isCosApiResponse(error.response)) {
    return error.response.data?.msg
  } else if (error instanceof Error) {
    return error.message
  }
  return undefined
}
