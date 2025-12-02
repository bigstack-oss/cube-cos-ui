import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CosButton } from '@cube-frontend/ui-library'
import { fixpacksApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'

type FixpackContinueAnywayButtonProps = {
  nodeName: string
}

export const FixpackContinueAnywayButton = (
  props: FixpackContinueAnywayButtonProps,
) => {
  const { nodeName } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading, mutateResource: continueInterruptedFixpackUpdate } =
    useCosMutationRequest(fixpacksApi.continueInterruptedFixpackUpdate)

  const onClick = async (): Promise<void> => {
    try {
      await continueInterruptedFixpackUpdate({
        dataCenter: dataCenter!.name,
        nodeName,
      })
    } catch (error) {
      console.error('Continue interrupted fixpack update error: ', error)
    }
  }

  const { t } = useTranslation()

  return (
    <CosButton type="warning" size="sm" loading={isLoading} onClick={onClick}>
      {t('maintenance.update.fixpack.progressTable.continueAnyway')}
    </CosButton>
  )
}
