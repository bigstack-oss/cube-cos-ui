import { isAxiosError } from 'axios'
import { useCallback, useState } from 'react'
import {
  CosApiError,
  CosApiRequest,
  CosRequestError,
  getNativeError,
  isCosApiResponse,
} from './cosRequestUtils'

export type UseCosRequestHandler<Data> = {
  isLoading: boolean
  /**
   * Indicates if a response has been received by this request handler.
   */
  hasResponseBeenReceived: boolean
  data: Data | undefined
  errorState: CosRequestError | undefined
  oversee: (request: CosApiRequest<Data>) => Promise<Data>
  clearError: () => void
}

export type UseCosRequestHandlerOptions = {
  defaultIsLoading: boolean
}

export const INTERNAL_useCosRequestHandler = <Data>(
  options: UseCosRequestHandlerOptions,
): UseCosRequestHandler<Data> => {
  const { defaultIsLoading } = options

  const [isLoading, setIsLoading] = useState(defaultIsLoading)
  const [hasResponseBeenReceived, setHasResponseBeenReceived] = useState(false)
  const [data, setData] = useState<Data | undefined>()
  const [errorState, setErrorState] = useState<CosRequestError | undefined>()

  const oversee = async (request: CosApiRequest<Data>): Promise<Data> => {
    setIsLoading(true)
    setErrorState(undefined)

    try {
      const response = await request()
      setData(response.data.data)
      setHasResponseBeenReceived(true)
      return response.data.data
    } catch (error) {
      if (isAxiosError(error) && isCosApiResponse(error.response)) {
        const cosApiResponse = error.response

        const apiError: CosApiError = {
          code: cosApiResponse.data.code,
          msg: cosApiResponse.data.msg,
          status: cosApiResponse.data.status,
        }

        const nextErrorState: CosRequestError = {
          native: error,
          api: apiError,
        }

        setErrorState(nextErrorState)
        setData(undefined)

        throw nextErrorState
      } else {
        setErrorState({
          native: getNativeError(error),
          api: undefined,
        })
        setData(undefined)
      }

      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = useCallback((): void => {
    setErrorState(undefined)
  }, [])

  return {
    isLoading,
    hasResponseBeenReceived,
    data,
    errorState,
    oversee,
    clearError,
  }
}
