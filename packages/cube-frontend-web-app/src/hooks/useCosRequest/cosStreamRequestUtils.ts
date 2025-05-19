import { validateStatus } from '@cube-frontend/web-app/api/utils'
import { CosGetApiInnerResponse } from './cosGetRequestUtils'

export const readStream = async <
  ChunkResponse extends CosGetApiInnerResponse<unknown>,
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
