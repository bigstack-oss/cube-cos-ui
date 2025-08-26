import { Node } from '@cube-frontend/api'
import { CosButton, CosStroke } from '@cube-frontend/ui-library'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { useMemo } from 'react'
import { HostWithRole, UpsertTuningsPayload } from '../../upsertTuningsUtils'
import { SpecEntry } from '../SpecEntry'
import { TuningsPreviousButton } from '../TuningsPreviousButton'
import { filterHosts } from './filterHosts'
import { HostFilter } from './HostFilter'
import { HostList } from './HostList'
import { useHostFilter } from './useHostFilter'
import { Board } from '../Board'

type SelectHostsProps = {
  isLoading: boolean
  payload: UpsertTuningsPayload
  hosts: Node[] | undefined
  onChange: (hosts: HostWithRole[]) => void
  onNextClick: () => void
}

export const SelectHosts = (props: SelectHostsProps) => {
  const {
    isLoading,
    payload: { selectedSpecName, value, selectedHosts },
    hosts: hostsFromApi,
    onChange,
    onNextClick,
  } = props

  const selectedHostNames = useMemo<Set<string>>(() => {
    return new Set(selectedHosts.map((host) => host.name))
  }, [selectedHosts])

  const {
    filter,
    onKeywordChange,
    onKeywordClear,
    onRolesChange,
    onIpRangeChange,
    resetFilter,
  } = useHostFilter()

  const visibleHosts = useMemo<HostWithRole[]>(
    () => filterHosts(hostsFromApi, filter),
    [hostsFromApi, filter],
  )

  return (
    <Board>
      <SpecEntry specName={selectedSpecName!} valueLabel="New Value">
        <p className="primary-body3 py-[9px]">{value!.toString()}</p>
      </SpecEntry>
      <CosStroke type="dot" />
      <p className="primary-body3 text-functional-text">
        Please select the hosts to apply the tuning.
      </p>
      <HostFilter
        filter={filter}
        onKeywordChange={onKeywordChange}
        onKeywordClear={onKeywordClear}
        onRolesChange={onRolesChange}
        onIpRangeChange={onIpRangeChange}
        onClearClick={resetFilter}
      />
      <HostList
        isLoading={isLoading}
        visibleHosts={visibleHosts}
        selectedHosts={selectedHosts}
        selectedHostNames={selectedHostNames}
        onChange={onChange}
      />
      <CosStroke type="dot" />
      <div className="flex items-center gap-x-4">
        <TuningsPreviousButton />
        <CosButton
          usage="icon-right"
          Icon={ChevronRight}
          disabled={!selectedHosts.length}
          onClick={onNextClick}
        >
          Next
        </CosButton>
      </div>
    </Board>
  )
}
