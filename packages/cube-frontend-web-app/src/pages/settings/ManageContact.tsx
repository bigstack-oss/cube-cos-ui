import {
  GetSettingResponseDataTitlePrefix,
  SettingsApiUpdateTitlePrefixRequest,
  SettingStatusCurrentEnum,
} from '@cube-frontend/api'
import { CosButton, CosInput, CosStroke } from '@cube-frontend/ui-library'
import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { SettingsSection } from './SettingsSection'

type ManageContactProps = {
  titlePrefixFromApi: GetSettingResponseDataTitlePrefix | undefined
}

export const ManageContact = (props: ManageContactProps) => {
  const { titlePrefixFromApi } = props

  const { name: dataCenter } = useContext(DataCenterContext)

  const [titlePrefix, setTitlePrefix] = useState<
    GetSettingResponseDataTitlePrefix | undefined
  >(titlePrefixFromApi)

  useEffect(() => {
    if (!titlePrefixFromApi) return

    setTitlePrefix((prev) => {
      if (!prev) {
        // Set initial value.
        return titlePrefixFromApi
      }
      // Update status only.
      return {
        ...prev,
        status: titlePrefixFromApi.status,
      }
    })
  }, [titlePrefixFromApi])

  const {
    isLoading: isCallingUpdateApi,
    mutateResource: updateTitlePrefixApi,
  } = useCosMutationRequest(
    settingsApi.updateTitlePrefix as (
      params: SettingsApiUpdateTitlePrefixRequest,
    ) => Promise<CosApiResponse<undefined>>,
  )

  const onTitlePrefixChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitlePrefix((prev) => ({
      ...prev!,
      value: e.target.value,
    }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    try {
      setTitlePrefix((prev) => ({
        ...prev!,
        status: {
          current: SettingStatusCurrentEnum.Updating,
          isUpdating: true,
        },
      }))
      updateTitlePrefixApi({
        dataCenter,
        updateTitlePrefixRequest: {
          value: titlePrefix!.value,
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
              value={titlePrefix?.value ?? ''}
              isLoading={!titlePrefix}
              disabled={titlePrefix?.status.isUpdating || isCallingUpdateApi}
              onChange={onTitlePrefixChange}
            />
          </div>
          <CosButton
            className="mb-[3px]"
            htmlType="submit"
            usage="text-only"
            loading={titlePrefix?.status.isUpdating || isCallingUpdateApi}
            disabled={!titlePrefix}
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
