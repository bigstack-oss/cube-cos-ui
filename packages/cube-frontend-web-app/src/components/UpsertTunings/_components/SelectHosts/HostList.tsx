import { CosCheckbox } from '@cube-frontend/ui-library'
import { range, unionBy } from 'lodash'
import { ChangeEvent } from 'react'
import { HostWithRole } from '../../upsertTuningsUtils'

type HostListProps = {
  isLoading: boolean
  visibleHosts: HostWithRole[]
  selectedHosts: HostWithRole[]
  selectedHostNames: Set<string>
  onChange: (hosts: HostWithRole[]) => void
}

export const HostList = (props: HostListProps) => {
  const {
    isLoading,
    visibleHosts,
    selectedHosts,
    selectedHostNames,
    onChange,
  } = props

  const onSelectAllChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { checked } = e.target
    const nextRoles = checked
      ? unionBy(visibleHosts, selectedHosts, 'name')
      : []
    onChange(nextRoles)
  }

  const onHostChange = (
    host: HostWithRole,
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    const { checked } = e.target
    const nextHosts = checked
      ? [...selectedHosts, host]
      : selectedHosts.filter((selectedHost) => selectedHost.name !== host.name)
    onChange(nextHosts)
  }

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-4 rounded-[5px] border border-functional-border-divider bg-grey-100 px-12 py-6">
      {isLoading ? (
        range(0, 21).map((index) => (
          <CosCheckbox key={index} label="" isLoading={true} />
        ))
      ) : !visibleHosts.length ? (
        <p className="primary-body2 text-functional-text-light">No Result</p>
      ) : (
        <>
          <CosCheckbox
            label="Select all"
            checked={visibleHosts.length === selectedHostNames.size}
            onChange={onSelectAllChange}
          />
          {visibleHosts.map((host) => (
            <CosCheckbox
              key={host.name}
              label={host.name}
              checked={selectedHostNames.has(host.name)}
              onChange={(e) => onHostChange(host, e)}
            />
          ))}
        </>
      )}
    </div>
  )
}
