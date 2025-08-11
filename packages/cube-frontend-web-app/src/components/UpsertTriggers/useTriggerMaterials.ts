import { useContext } from 'react'
import {
  GetPredefinedEventsCategoriesEnum,
  GetPredefinedEventsIdsEnum,
  GetPredefinedEventsSeveritiesEnum,
  GetPredefinedEventsTypesEnum,
  GetTriggerMaterialsResponseDataResponse,
  TriggersApiGetTriggerMaterialsRequest,
} from '@cube-frontend/api'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { filterEnumValues, TriggerAttribute } from './upsertTriggersUtils'

type UseTriggerMaterials = {
  isMaterialsLoading: boolean
  materials: {
    attribute: TriggerAttribute
    response: GetTriggerMaterialsResponseDataResponse
  }
}

export const useTriggerMaterials = (): UseTriggerMaterials => {
  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading: isMaterialsLoading, data: materials } = useCosGetRequest(
    triggersApi.getTriggerMaterials,
    (): TriggersApiGetTriggerMaterialsRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const alertTypes = filterEnumValues(
    materials?.attribute.alertTypes,
    GetPredefinedEventsTypesEnum,
  )

  const severities = filterEnumValues(
    materials?.attribute.severities,
    GetPredefinedEventsSeveritiesEnum,
  )

  const categories = filterEnumValues(
    materials?.attribute.categories,
    GetPredefinedEventsCategoriesEnum,
  )

  const eventIds = filterEnumValues(
    materials?.attribute.eventIds,
    GetPredefinedEventsIdsEnum,
  )

  return {
    isMaterialsLoading,
    materials: {
      attribute: {
        alertTypes,
        severities,
        categories,
        eventIds,
      },
      response: {
        emails: materials?.response.emails ?? [],
        slacks: materials?.response.slacks ?? [],
        scriptType: materials?.response.scriptType ?? {
          builtInVariable: {
            name: '',
            type: '',
            description: '',
            value: {
              id: '',
              message: '',
              details: '',
              duration: 0,
              level: '',
              previousLevel: '',
              recoverable: false,
              data: {
                time: '',
                name: '',
                group: '',
                tags: {},
                fields: {},
              },
            },
          },
          language: '-',
          environment: '-',
        },
      },
    },
  }
}
