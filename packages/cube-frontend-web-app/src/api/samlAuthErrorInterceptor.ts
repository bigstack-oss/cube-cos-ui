import { HttpStatusCode, isAxiosError } from 'axios'
import { CosApiInnerResponse } from '../hooks/useCosRequest/cosRequestUtils'

// Redirect to perform SAML auth if HTTP status code 401 is received.
export const samlAuthErrorInterceptor = (error: unknown): Promise<unknown> => {
  if (
    !isAxiosError(error) ||
    error.response?.status !== HttpStatusCode.Unauthorized
  ) {
    return Promise.reject(error)
  }

  const data = error.response.data as
    | Partial<CosApiInnerResponse<never>>
    | undefined

  const redirectUrl = data?.msg

  if (redirectUrl) {
    window.location.replace(redirectUrl)
  }

  return Promise.reject(error)
}
