import { Link } from 'react-router'
import { CosBackButton } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { CreateTriggers } from '@cube-frontend/web-app/components/UpsertTriggers/CreateTriggers'
import { UpsertTriggersPayload } from '@cube-frontend/web-app/components/UpsertTriggers/upsertTriggersUtils'

export const CreateTriggersPage = () => {
  const onPublishClick = (payload: UpsertTriggersPayload) =>
    payload && console.log(payload)

  return (
    <div className="flex flex-col gap-3">
      <CosBackButton
        backButtonContainer={{
          Component: Link,
          props: {
            to: CosRoutesEnum.EVENTS_TRIGGERS_PAGE,
          },
        }}
      >
        Create Triggers
      </CosBackButton>
      <CreateTriggers onPublishClick={onPublishClick} />
    </div>
  )
}
