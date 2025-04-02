import { GetTriggerResponseData } from '@cube-frontend/api'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'

type UseTriggerOption = {
  dataCenter: string
  selectedTemplateName: string | null
}

type UseTrigger = {
  isTriggerLoading: boolean
  trigger: GetTriggerResponseData | undefined
}

export const useTrigger = (option: UseTriggerOption): UseTrigger => {
  const { dataCenter, selectedTemplateName } = option

  const { data, isLoading } = useCosGetRequest(triggersApi.getTrigger, () => {
    if (!dataCenter || !selectedTemplateName) return
    return {
      dataCenter,
      triggerName: selectedTemplateName,
    }
  })

  return {
    isTriggerLoading: isLoading,
    trigger: data,
  }
}
