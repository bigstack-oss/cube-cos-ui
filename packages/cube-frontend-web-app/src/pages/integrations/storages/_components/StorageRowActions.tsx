import { CosButton, CosOverflowMenu } from '@cube-frontend/ui-library'
import DeleteIcon from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'
import EditIcon from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import OverflowMenuHorizontal from '@cube-frontend/ui-library/icons/monochrome/overflow_menu_horizontal.svg?react'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { Link } from 'react-router'
import { StorageRow } from '../IntegrationsStoragesPage'
import { isBuiltInStorage } from '../storageUtils'

export type StorageRowActionsProps = {
  row: StorageRow
}

export const StorageRowActions = (props: StorageRowActionsProps) => {
  const { row } = props

  const deleteStorage = (_storageName: string) => {
    // TODO: call delete API
  }

  const setDefaultStorage = (_storageName: string) => {
    // TODO: call set default API
  }

  const isBuiltIn = isBuiltInStorage(row.type)

  return (
    <div className="flex items-center justify-end gap-x-2">
      {!isBuiltInStorage(row.type) && (
        <>
          <Link to={CosRoutesEnum.INTEGRATIONS_STORAGES_EDIT_PAGE(row.name)}>
            <CosButton
              type="ghost"
              usage="icon-only"
              size="md"
              disabled={isBuiltIn}
              Icon={EditIcon}
            />
          </Link>
          <CosButton
            type="ghost"
            usage="icon-only"
            size="md"
            disabled={row.isDefault || isBuiltIn}
            Icon={DeleteIcon}
            onClick={() => deleteStorage(row.name)}
          />
        </>
      )}
      <CosOverflowMenu
        triggerElement={
          <OverflowMenuHorizontal className="icon-md cursor-pointer" />
        }
      >
        <CosOverflowMenu.Item
          title="Set default storage"
          type="plain"
          disabled={row.isDefault}
          onClick={() => setDefaultStorage(row.name)}
        />
      </CosOverflowMenu>
    </div>
  )
}
