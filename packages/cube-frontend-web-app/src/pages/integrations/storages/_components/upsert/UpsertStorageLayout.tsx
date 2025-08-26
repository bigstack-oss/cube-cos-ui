import { CosBackButton } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { PropsWithChildren } from 'react'
import { Link } from 'react-router'

export type UpsertStorageLayoutProps = {
  title: string
} & PropsWithChildren

export const UpsertStorageLayout = (props: UpsertStorageLayoutProps) => {
  const { title, children } = props

  return (
    <div className="my-1 flex flex-col gap-y-4">
      <CosBackButton
        backButtonContainer={{
          Component: Link,
          props: { to: CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE },
        }}
      >
        {title}
      </CosBackButton>
      {children}
    </div>
  )
}
