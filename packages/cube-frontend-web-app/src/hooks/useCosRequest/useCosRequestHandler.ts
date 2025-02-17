import { isAxiosError } from 'axios'
import { useState } from 'react'
import {
  CosApiError,
  CosApiResponse,
  CosRequestError,
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
}

export type UseCosRequestHandlerOptions = {
  defaultIsLoading: boolean
}

type CosApiRequest<T> = () => Promise<CosApiResponse<T>>

const getNativeError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error
  }
  try {
    return new Error(JSON.stringify(error))
  } catch {
    return new Error(String(error))
  }
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
      if (isAxiosError(error) && isCosApiResponse(error.response?.data)) {
        const cosApiResponse = error.response.data

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

  return {
    isLoading,
    hasResponseBeenReceived,
    data,
    errorState,
    oversee,
  }
}
