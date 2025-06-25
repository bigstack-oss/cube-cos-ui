import { Link } from 'react-router'
import { CosBackButton } from '@cube-frontend/ui-library'
import { CreateTriggers } from '@cube-frontend/web-app/components/UpsertTriggers/CreateTriggers'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'

export const CreateTriggersPage = () => {
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
        Create Triggers
      </CosBackButton>
      <CreateTriggers />
    </div>
  )
}
