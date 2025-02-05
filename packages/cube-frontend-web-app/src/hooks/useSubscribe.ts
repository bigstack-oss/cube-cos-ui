import { useEffect } from 'react'
import { RawAxiosRequestConfig } from 'axios'

export type BaseResponse = {
  data: unknown
}

export const useSubscribe = <
  Params extends Array<unknown>,
  Response extends BaseResponse,
>(
  api: (...p: Params) => Promise<Response>,
  params: Params,
  options: RawAxiosRequestConfig,
  onChunk: (response: Response['data']) => void,
) => {
  const subscribe = () => {
    const controller = new AbortController()

    const startSubscribe = async () => {
      const callApi = async () => {
        return await api(...params, {
          ...options,
          responseType: 'stream',
          adapter: 'fetch',
          params: { watch: true },
        })
      }
      const response = await callApi()

      const reader = (response.data as unknown as ReadableStream).getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const response = JSON.parse(chunk) as T['data']
        onChunk(response)
      }
    }

    startSubscribe()

    return controller.abort
  }

  useEffect(() => {
    const unsubscribe = subscribe()
    return unsubscribe
  })
}

// useSubscribe(healthApi.getHealths, () => {
//   setLoading(false)
//   setHealths(response.data)
// })
