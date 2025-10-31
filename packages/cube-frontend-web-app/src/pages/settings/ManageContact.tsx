import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GetSettingResponseDataTitlePrefix,
  SettingStatusCurrentEnum,
} from '@cube-frontend/api'
import {
  CosButton,
  CosGeneralPanel,
  CosInput,
  CosStroke,
} from '@cube-frontend/ui-library'
import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useShowErrorToast } from '@cube-frontend/web-app/hooks/useShowErrorToast/useShowErrorToast'

type ManageContactProps = {
  titlePrefixFromApi: GetSettingResponseDataTitlePrefix | undefined
}

export const ManageContact = (props: ManageContactProps) => {
  const { titlePrefixFromApi } = props

  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const showErrorToast = useShowErrorToast()

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
  } = useCosMutationRequest(settingsApi.updateTitlePrefix)

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
        dataCenter: dataCenter!.name,
        updateTitlePrefixRequest: {
          value: titlePrefix!.value,
        },
      })
    } catch (error) {
      console.error('Update title prefix error: ', error)
      showErrorToast(error)
    }
  }

  return (
    <CosGeneralPanel topic={t('settings.manageContact.title')}>
      <div className="flex flex-col gap-y-6">
        <CosStroke type="dot" />
        <form onSubmit={onSubmit}>
          <div className="flex items-end gap-x-6">
            {/* Wrap the input in a container so it and the skeleton have the same width. */}
            <div className="w-[248px]">
              <CosInput
                label={t('settings.titlePrefix')}
                placeholder={t('settings.titlePrefix')}
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
              {t('settings.titlePrefix.save')}
            </CosButton>
          </div>
        </form>
        <p className="primary-body4 text-functional-text-light">
          {t('settings.titlePrefix.helpMessage')}
        </p>
      </div>
    </CosGeneralPanel>
  )
}
