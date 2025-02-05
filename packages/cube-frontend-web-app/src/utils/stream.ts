export const readStream = async <Chunk>(
  stream: ReadableStream,
  onChunk: (chunkResponse: Chunk) => void,
) => {
  const reader = stream.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value, { stream: true })
    const chunkResponse = JSON.parse(chunk) as Chunk

    onChunk(chunkResponse)
  }
}
