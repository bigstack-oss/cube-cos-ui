import { describe, expect, test, vi } from 'vitest'
import { CosApiInnerResponse, readStream } from './cosRequestUtils'

// Helper function to create a readable stream from chunks
const createStream = (chunks: string[]): ReadableStream => {
  let index = 0
  return new ReadableStream({
    pull(controller) {
      if (index < chunks.length) {
        controller.enqueue(new TextEncoder().encode(chunks[index++]))
      } else {
        controller.close()
      }
    },
  })
}

describe('readStream', () => {
  test('parses a single COS API response without leftover data', async () => {
    const onChunk = vi.fn()

    const stream = createStream([
      '{"code":200,"msg":"abc","status":"ok","data":{"id":1}}\r',
    ])

    const abortController = new AbortController()
    await readStream<CosApiInnerResponse<unknown>>(
      stream,
      abortController.signal,
      onChunk,
    )

    expect(onChunk).toHaveBeenCalledTimes(1)
    expect(onChunk).toHaveBeenCalledWith({
      code: 200,
      msg: 'abc',
      status: 'ok',
      data: { id: 1 },
    })
  })

  test('parses a single COS API response with incomplete trailing data', async () => {
    const onChunk = vi.fn()

    const stream = createStream([
      '{"code":200,"msg":"abc","status":"ok","data":{"id":1}}\n{"co',
    ])

    const abortController = new AbortController()
    await readStream<CosApiInnerResponse<unknown>>(
      stream,
      abortController.signal,
      onChunk,
    )

    expect(onChunk).toHaveBeenCalledTimes(1)
    expect(onChunk).toHaveBeenCalledWith({
      code: 200,
      msg: 'abc',
      status: 'ok',
      data: { id: 1 },
    })
  })

  test('parses multiple COS API responses split across chunks', async () => {
    const onChunk = vi.fn()
    const stream = createStream([
      '{"code":200,"msg":"lorem ipsum 1","status":"ok","data":{"id":1}}\n{"code":',
      '200,"msg":"lorem ipsum 2","status":"ok","data":{"name":"Hello, {} world"}}\n{"code":200,"msg',
      '":"lorem ipsum 3","status":"ok","data":{"description":"Detail logs including\\nnew line characters\\nfor multiple lines content."}}\n{',
      '"code":200,"msg":"lorem ipsum 4","status":"ok","data":{"value":"{{{{{{{}}}"}}\n',
    ])

    const abortController = new AbortController()
    await readStream<CosApiInnerResponse<unknown>>(
      stream,
      abortController.signal,
      onChunk,
    )

    expect(onChunk).toHaveBeenCalledTimes(4)

    expect(onChunk).toHaveBeenCalledWith({
      code: 200,
      msg: 'lorem ipsum 1',
      status: 'ok',
      data: { id: 1 },
    })
    expect(onChunk).toHaveBeenCalledWith({
      code: 200,
      msg: 'lorem ipsum 2',
      status: 'ok',
      data: {
        name: 'Hello, {} world',
      },
    })
    expect(onChunk).toHaveBeenCalledWith({
      code: 200,
      msg: 'lorem ipsum 3',
      status: 'ok',
      data: {
        description:
          'Detail logs including\nnew line characters\nfor multiple lines content.',
      },
    })
    expect(onChunk).toHaveBeenCalledWith({
      code: 200,
      msg: 'lorem ipsum 4',
      status: 'ok',
      data: {
        value: '{{{{{{{}}}',
      },
    })
  })

  test('throws an error for not-ok COS API error', async () => {
    const onChunk = vi.fn()

    const stream = createStream([
      '{"code":500,"msg":"Internal Server Error","status":"not ok"}',
    ])

    await expect(async () => {
      const abortController = new AbortController()
      await readStream<CosApiInnerResponse<unknown>>(
        stream,
        abortController.signal,
        onChunk,
      )
    }).rejects.toThrow('Internal Server Error')

    expect(onChunk).not.toHaveBeenCalled()
  })

  test('handles an empty stream without errors', async () => {
    const onChunk = vi.fn()
    const stream = createStream([])
    const abortController = new AbortController()
    await readStream<CosApiInnerResponse<unknown>>(
      stream,
      abortController.signal,
      onChunk,
    )
    expect(onChunk).not.toHaveBeenCalled()
  })
})
