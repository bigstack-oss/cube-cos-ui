import { useContext } from 'react'
import { useSearchParams } from 'react-router'
import { GetTriggerResponseData } from '@cube-frontend/api'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'

type UseTrigger = {
  isTriggerLoading: boolean
  trigger: GetTriggerResponseData | undefined
}

export const useTrigger = (): UseTrigger => {
  const [searchParams, _] = useSearchParams()

  const triggerName = searchParams.get('name')

  const { name: dataCenter } = useContext(DataCenterContext)

  const { data, isLoading } = useCosGetRequest(triggersApi.getTrigger, () => {
    if (!dataCenter || !triggerName) return null
    return {
      dataCenter,
      triggerName,
    }
  })

  return {
    isTriggerLoading: isLoading,
    trigger: data,
  }
}
