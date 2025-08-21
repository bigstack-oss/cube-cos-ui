import { CosSearchBarFilter } from '@cube-frontend/ui-library'
import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { ChangeEvent, useMemo } from 'react'
import { IpRangeInputs } from './IpRangeInputs'
import { HostFilterValue, IpRange } from './useHostFilter'
import { DataCenterRolesEnum } from '@cube-frontend/api'
import { RoleFilter } from '@cube-frontend/web-app/components/RoleFilter'

type HostFilterProps = {
  filter: HostFilterValue
  onKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeywordClear: () => void
  onRolesChange: (roles: DataCenterRolesEnum[]) => void
  onIpRangeChange: (
    boundary: keyof IpRange,
    e: ChangeEvent<HTMLInputElement>,
  ) => void
  onClearClick: () => void
}

export const HostFilter = (props: HostFilterProps) => {
  const {
    filter: { keyword, selectedRoles, ipRange },
    onKeywordChange,
    onKeywordClear,
    onRolesChange,
    onIpRangeChange,
    onClearClick,
  } = props

  const showClearButton = useMemo<boolean>(() => {
    return [keyword, selectedRoles.length, ipRange.start, ipRange.end].some(
      (value) => !!value,
    )
  }, [keyword, selectedRoles, ipRange])

  return (
    <div className="flex items-center gap-x-2">
      <div className="w-[288px]">
        <CosSearchBarFilter
          value={keyword}
          onChange={onKeywordChange}
          onInputClear={onKeywordClear}
        />
      </div>
      <RoleFilter
        selectedRoles={selectedRoles}
        handleRolesSelect={onRolesChange}
      />
      <IpRangeInputs ipRange={ipRange} onChange={onIpRangeChange} />
      {showClearButton && (
        <span className="ml-1 cursor-pointer p-2.5" onClick={onClearClick}>
          <X className="icon-md text-functional-text-light" />
        </span>
      )}
    </div>
  )
}
