import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GetCosBasicTable,
  ItemsPerPage,
  CosPagination,
  DEFAULT_ITEMS_PER_PAGE,
} from '@cube-frontend/ui-library'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { GPUProfileRow } from '../utils'
import { getItemsInView } from './utils'

const ProfileTable = GetCosBasicTable<GPUProfileRow>()

type FullViewProfileTableProps = {
  title: string
  profiles: GPUProfileRow[]
}

export const FullViewProfileTable = (props: FullViewProfileTableProps) => {
  const { title, profiles } = props

  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [itemPerPage, setItemPerPage] = useState<ItemsPerPage>(
    DEFAULT_ITEMS_PER_PAGE,
  )

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onItemsPerPageChange = (page: ItemsPerPage) => {
    setItemPerPage(page)
  }

  const profilesInView = useMemo<GPUProfileRow[]>(() => {
    return getItemsInView(profiles, currentPage, itemPerPage)
  }, [profiles, currentPage, itemPerPage])

  return (
    <div className="flex flex-col gap-y-2">
      <div className="primary-body3 font-semibold text-functional-title">
        {title}
      </div>
      <ProfileTable rows={profilesInView}>
        <ProfileTable.Column
          property="name"
          label={t('nodes.details.profilesIdList.title')}
          emphasize
        />
        <ProfileTable.Column
          property="vramMiB"
          label={t('nodes.details.profilesIdList.vram')}
        >
          {(vramMiB) => toReadableSizeString(vramMiB, 'MiB')}
        </ProfileTable.Column>
        <ProfileTable.Column
          property="count"
          label={t('nodes.details.profilesIdList.counts')}
        />
        <ProfileTable.Column
          property="remaining"
          label={t('nodes.details.profilesIdList.remaining')}
        />
        <ProfileTable.Column
          property="aliasName"
          label={t('nodes.details.profilesIdList.aliasName')}
        />
      </ProfileTable>
      <CosPagination
        totalItems={profiles.length}
        currentPage={currentPage}
        itemsPerPage={itemPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </div>
  )
}
