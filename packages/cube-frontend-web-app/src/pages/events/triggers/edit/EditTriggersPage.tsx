import { Link } from 'react-router'
import { CosBackButton } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { EditTriggers } from '@cube-frontend/web-app/components/UpsertTriggers/EditTriggers'
import { UpsertTriggersPayload } from '@cube-frontend/web-app/components/UpsertTriggers/upsertTriggersUtils'

export const EditTriggersPage = () => {
  const onPublishClick = (payload: UpsertTriggersPayload) =>
    payload && console.log(payload)

  return (
    <div className="flex flex-col gap-3">
      <CosBackButton
        variant="title"
        backLinkContainer={{
          Component: Link,
          props: {
            to: CosRoutesEnum.EVENTS_TRIGGERS_PAGE,
          },
        }}
      >
        Edit Triggers
      </CosBackButton>
      <EditTriggers onPublishClick={onPublishClick} />
    </div>
  )
}
