import { isAxiosError } from 'axios'
import {
  isCosApiResponse,
  isCosRequestError,
} from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'

export const parseErrorMessage = (error: unknown): string | undefined => {
  if (isCosRequestError(error)) {
    return error.api?.msg || error.native.message
  } else if (isAxiosError(error) && isCosApiResponse(error.response)) {
    return error.response.data?.msg
  } else if (error instanceof Error) {
    return error.message
  }
  return undefined
}
