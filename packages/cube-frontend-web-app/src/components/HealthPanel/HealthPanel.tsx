import { GetHealthsResponse } from '@cube-frontend/api'
import { CosButton } from '@cube-frontend/ui-library'
import { CosPanel } from '@cube-frontend/web-app/components/CosPanel/CosPanel'
import { readStream } from '../../utils/stream'
import { useEffect, useState } from 'react'
import { healthApi } from '@cube-frontend/web-app/utils/cosApi'

const dataCenter = 'dell13'

const subscribeHealth = (
  onChunkResponse: (chunkRes: GetHealthsResponse) => void,
) => {
  const abortController = new AbortController()

  const startListen = async () => {
    const response = await healthApi.getHealths(dataCenter, true, {
      signal: abortController.signal,
      responseType: 'stream',
      adapter: 'fetch',
    })

    readStream(response.data as unknown as ReadableStream, onChunkResponse)
  }

  startListen()

  const unsubscribe = () => {
    abortController.abort()
  }

  return unsubscribe
}

const HealthPanel = () => {
  const [loading, setLoading] = useState(true)
  const [healths, setHealths] = useState<
    GetHealthsResponse['data'] | undefined
  >()

  useEffect(() => {
    const unsubscribe = subscribeHealth((chunkRes) => {
      setHealths(chunkRes.data)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  if (!loading) {
    return <p>loading</p>
  }

  if (!healths) {
    return <p>no data</p>
  }

  const getErrorCount = () => {
    return healths.error.length
  }

  return (
    <CosPanel title="Health">
      <p>Error Service Count: {getErrorCount()}</p>
      <CosButton>Repair</CosButton>
      <div>
        <p className="primary-h3">Errors:</p>
        {healths.error.map((errorService) => (
          <div key={errorService.service}>
            <span className="font-bold">{errorService.service}: </span>
            <span>{errorService.modules.map((m) => m.name).join(', ')}</span>
          </div>
        ))}
      </div>
      <div>
        <p className="primary-h3">Status:</p>
        {healths.inUse.map((inUseService) => (
          <div key={inUseService.service}>
            <span>{inUseService.service}</span>
          </div>
        ))}
      </div>
    </CosPanel>
  )
}

export default HealthPanel
