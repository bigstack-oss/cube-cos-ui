import { GetDataCentersResponseDataInnerRolesEnum } from '@cube-frontend/api'
import { ChangeEvent, useState } from 'react'

type UseHostFilter = {
  filter: HostFilterValue
  onKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeywordClear: () => void
  onRolesChange: (roles: GetDataCentersResponseDataInnerRolesEnum[]) => void
  onIpRangeChange: (
    boundary: keyof IpRange,
    e: ChangeEvent<HTMLInputElement>,
  ) => void
  resetFilter: () => void
}

export type HostFilterValue = {
  keyword: string
  selectedRoles: GetDataCentersResponseDataInnerRolesEnum[]
  ipRange: IpRange
}

export type IpRange = {
  start: string
  end: string
}

const createDefaultFilter = (): HostFilterValue => ({
  keyword: '',
  selectedRoles: [],
  ipRange: {
    start: '',
    end: '',
  },
})

export const useHostFilter = (): UseHostFilter => {
  const [filter, setFilter] = useState<HostFilterValue>(createDefaultFilter)

  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setFilter((prev) => ({
      ...prev,
      keyword: value,
    }))
  }

  const onKeywordClear = (): void => {
    setFilter((prev) => ({
      ...prev,
      keyword: '',
    }))
  }

  const onRolesChange = (
    roles: GetDataCentersResponseDataInnerRolesEnum[],
  ): void => {
    setFilter((prev) => ({
      ...prev,
      selectedRoles: roles,
    }))
  }

  const onIpRangeChange = (
    boundary: keyof IpRange,
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = e.target
    setFilter((prev) => ({
      ...prev,
      ipRange: {
        ...prev.ipRange,
        [boundary]: value,
      },
    }))
  }

  const resetFilter = (): void => {
    setFilter(createDefaultFilter)
  }

  return {
    filter,
    onKeywordChange,
    onKeywordClear,
    onRolesChange,
    onIpRangeChange,
    resetFilter,
  }
}
