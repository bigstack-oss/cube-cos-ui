import { validateStatus } from '@cube-frontend/web-app/api/utils'
import { AxiosResponse, HttpStatusCode } from 'axios'
import { isObject } from 'lodash'

export type CosApiRequest<T> = () => Promise<CosApiResponse<T>>

export type CosApiInnerResponse<T> = {
  code: HttpStatusCode
  msg: string
  status: string
  data: T
}

export type CosApiResponse<T> = AxiosResponse<CosApiInnerResponse<T>>

export type CosRequestError = {
  native: Error
  api: CosApiError | undefined
}

export type CosApiError = Pick<
  CosApiInnerResponse<unknown>,
  'code' | 'msg' | 'status'
>

export type Nullish<T> = T | null | undefined

export type GetParamFn<T> = () => T | null | undefined

export const isCosApiResponse = (
  value: unknown,
): value is CosApiResponse<unknown> => {
  return (
    isObject(value) &&
    'data' in value &&
    isObject(value.data) &&
    'code' in value.data &&
    'msg' in value.data &&
    'status' in value.data
  )
}

export const isCosRequestError = (value: unknown): value is CosRequestError => {
  return isObject(value) && 'nativeError' in value && 'apiError' in value
}

export const isNullish = <T>(value: T): value is Required<T> => {
  return value === null || value === undefined
}

export const getNativeError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error
  }
  try {
    return new Error(JSON.stringify(error))
  } catch {
    return new Error(String(error))
  }
}

export const readStream = async <
  ChunkResponse extends CosApiInnerResponse<unknown>,
>(
  stream: ReadableStream,
  abortSignal: AbortSignal,
  onChunk: (chunkResponse: ChunkResponse) => void,
) => {
  const reader = stream.getReader()
  abortSignal.onabort = () => {
    reader.cancel()
  }
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value, { stream: true })
    buffer += chunk

    const validChunks: string[] = []
    // split the buffer using '}{', also tolerate newlines between '}' and '{'
    const segments = buffer.split(/}[\r\n]*{/)
    if (segments.length > 1) {
      // add the removed '}' or '{' back
      segments[0] += '}'

      for (let i = 1; i < segments.length - 1; i++) {
        segments[i] = '{' + segments[i] + '}'
      }

      const lastSegment = '{' + (segments.pop() ?? '')
      if (/}[\r\n]*$/.test(lastSegment)) {
        // if the last segment is also a valid JSON, clean up the buffer
        segments.push(lastSegment)
        buffer = ''
      } else {
        // if not, push the last segment to the buffer
        buffer = lastSegment
      }

      segments.forEach((segment) => {
        if (isValidJsonString(segment)) {
          validChunks.push(segment)
        }
      })
    } else if (isValidJsonString(buffer)) {
      // buffer is a valid JSON
      validChunks.push(buffer)
      buffer = ''
    }

    validChunks.forEach((validChunk) => {
      const chunkResponse = JSON.parse(validChunk) as ChunkResponse

      if (!validateStatus(chunkResponse.code)) {
        // TODO: Handle CosAPI Error Status
        throw new Error(chunkResponse.msg)
      }
      onChunk(chunkResponse)
    })
  }
}

const isValidJsonString = (value: string): boolean => {
  try {
    JSON.parse(value)
    return true
  } catch {
    return false
  }
}
