import { ListNodeGPUCardsResponseDataInnerProfilesInner } from '@cube-frontend/api'
import {
  GetCosBasicTable,
  CosTableRow,
  CosPagination,
  ItemsPerPage,
  DEFAULT_ITEMS_PER_PAGE,
} from '@cube-frontend/ui-library'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { useMemo, useState } from 'react'
import { getItemsInView } from './utils'

type ProfileTableRow = CosTableRow &
  ListNodeGPUCardsResponseDataInnerProfilesInner

const ProfileTable = GetCosBasicTable<ProfileTableRow>()

type FullViewProfileTableProps = {
  title: string
  profiles: ListNodeGPUCardsResponseDataInnerProfilesInner[]
}

export const FullViewProfileTable = (props: FullViewProfileTableProps) => {
  const { title, profiles } = props

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

  const profilesInView = useMemo<ProfileTableRow[]>(() => {
    return getItemsInView(profiles, currentPage, itemPerPage)
  }, [profiles, currentPage, itemPerPage])

  return (
    <div className="flex flex-col gap-y-2">
      <div className="primary-body3 text-functional-text">{title}</div>
      <ProfileTable rows={profilesInView}>
        <ProfileTable.Column property="name" label="Profiles / ID" />
        <ProfileTable.Column property="vramMiB" label="VRAM">
          {(vramMiB) => toReadableSizeString(vramMiB, 'MiB')}
        </ProfileTable.Column>
        <ProfileTable.Column property="count" label="Counts" />
        <ProfileTable.Column property="remaining" label="Remaining" />
        <ProfileTable.Column property="aliasName" label="Alias name" />
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
