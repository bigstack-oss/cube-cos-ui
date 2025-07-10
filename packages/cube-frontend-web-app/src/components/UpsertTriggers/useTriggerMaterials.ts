import { useContext } from 'react'
import { TriggersApiGetTriggerMaterialsRequest } from '@cube-frontend/api'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { TriggerAttributes, TriggerResponses } from './upsertTriggersUtils'
import {
  mockAlertTypes,
  mockCategories,
  mockEmails,
  mockEventIds,
  mockScriptTypes,
  mockSeverities,
  mockSlacks,
} from './mockData'

type UseTriggerMaterials = {
  attributes: TriggerAttributes
  responses: TriggerResponses
}

export const useTriggerMaterials = (): UseTriggerMaterials => {
  const { dataCenter } = useContext(DataCenterContext)

  const { data: materials } = useCosGetRequest(
    triggersApi.getTriggerMaterials,
    (): TriggersApiGetTriggerMaterialsRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  /**
   * TODO: Fetch data from API
   */
  const alertTypes = mockAlertTypes

  const severities = mockSeverities

  const categories = mockCategories

  const eventIds = mockEventIds

  const emails = mockEmails

  const slacks = mockSlacks

  const scriptTypes = mockScriptTypes

  return {
    attributes: { alertTypes, severities, categories, eventIds },
    responses: { emails, slacks, scriptTypes },
  }
}
