import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { CosButton, CosOverflowMenu } from '@cube-frontend/ui-library'
import DeleteIcon from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'
import EditIcon from '@cube-frontend/ui-library/icons/monochrome/edit.svg?react'
import OverflowMenuHorizontal from '@cube-frontend/ui-library/icons/monochrome/overflow_menu_horizontal.svg?react'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { StorageRow } from '../storageUtils'
import { UseStorageTable } from './useStorageTable'

export type StorageRowActionsProps = {
  row: StorageRow
  rowActions: Pick<UseStorageTable['rowActions'], 'setDefault' | 'delete'>
}

export const StorageRowActions = (props: StorageRowActionsProps) => {
  const { row, rowActions } = props

  const {
    setDefault: setDefaultStatus,
    edit: editStatus,
    delete: deleteStatus,
  } = row.rowStates

  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-end gap-x-2">
      <div className="flex items-center justify-end">
        {!editStatus.hidden && (
          <Link to={CosRoutesEnum.INTEGRATIONS_STORAGES_EDIT_PAGE(row.name)}>
            <CosButton
              type="ghost"
              usage="icon-only"
              size="md"
              disabled={editStatus.disabled}
              Icon={EditIcon}
            />
          </Link>
        )}
        {!deleteStatus.hidden && (
          <CosButton
            type="ghost"
            usage="icon-only"
            size="md"
            Icon={DeleteIcon}
            disabled={deleteStatus.disabled}
            loading={deleteStatus.loading}
            onClick={() => rowActions.delete.openConfirmModal(row.name)}
          />
        )}
      </div>
      <CosOverflowMenu
        triggerElement={
          <OverflowMenuHorizontal className="icon-md cursor-pointer" />
        }
      >
        <CosOverflowMenu.Item
          title={t('integrations.storages.setDefaultStorage')}
          type="plain"
          disabled={setDefaultStatus.disabled}
          onClick={() => rowActions.setDefault(row.name)}
        />
      </CosOverflowMenu>
    </div>
  )
}
