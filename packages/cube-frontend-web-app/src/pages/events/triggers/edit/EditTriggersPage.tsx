import { Link } from 'react-router'
import { CosBackButton } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { EditTriggers } from '@cube-frontend/web-app/components/UpsertTriggers/EditTriggers'

export const EditTriggersPage = () => {
  return (
    <div className="mx-2 my-1">
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
      <EditTriggers />
    </div>
  )
}
