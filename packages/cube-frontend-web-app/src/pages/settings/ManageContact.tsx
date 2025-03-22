import { SettingsApiUpdateTitlePrefixRequest } from '@cube-frontend/api'
import { CosButton, CosInput, CosStroke } from '@cube-frontend/ui-library'
import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { SettingsSection } from './SettingsSection'

type ManageContactProps = {
  isLoading: boolean
  initialTitlePrefix: string | undefined
}

export const ManageContact = (props: ManageContactProps) => {
  const { isLoading, initialTitlePrefix } = props

  const { name: dataCenter } = useContext(DataCenterContext)

  const [titlePrefix, setTitlePrefix] = useState('')

  const { isLoading: isUpdating, mutateResource: updateTitlePrefix } =
    useCosMutationRequest(
      settingsApi.updateTitlePrefix as (
        params: SettingsApiUpdateTitlePrefixRequest,
      ) => Promise<CosApiResponse<undefined>>,
    )

  useEffect(() => {
    if (initialTitlePrefix !== undefined) {
      setTitlePrefix(initialTitlePrefix)
    }
  }, [initialTitlePrefix])

  const onTitlePrefixChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitlePrefix(e.target.value)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    try {
      updateTitlePrefix({
        dataCenter,
        titlePrefix: {
          value: titlePrefix,
        },
      })
    } catch (error) {
      console.error('Update title prefix error: ', error)
    }
  }

  return (
    <SettingsSection>
      <h5 className="secondary-h4 text-functional-text">Manage Contact</h5>
      <CosStroke type="dot" />
      <form onSubmit={onSubmit}>
        <div className="flex items-end gap-x-6">
          {/* Wrap the input in a container so it and the skeleton have the same width. */}
          <div className="w-[248px]">
            <CosInput
              label="Title prefix"
              placeholder="Title prefix"
              isLoading={isLoading}
              value={titlePrefix}
              disabled={isUpdating}
              onChange={onTitlePrefixChange}
            />
          </div>
          <CosButton
            className="mb-[3px]"
            htmlType="submit"
            usage="text-only"
            loading={isUpdating}
            disabled={isLoading}
          >
            Save
          </CosButton>
        </div>
      </form>
      <p className="primary-body4 text-functional-text-light">
        This is an alias for identifying and distinguishing this cluster.
      </p>
    </SettingsSection>
  )
}
