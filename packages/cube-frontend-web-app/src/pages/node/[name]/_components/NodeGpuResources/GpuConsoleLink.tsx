import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CosHyperlink } from '@cube-frontend/ui-library'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useShowErrorToast } from '@cube-frontend/web-app/hooks/useShowErrorToast/useShowErrorToast'

export type GpuConsoleLinkProps = {
  nodeName: string
  instanceId: string
}

/**
 * Console links are minted on demand rather than embedded in the GPU cards
 * listing (so polling the listing does not create a Nova console token per
 * instance on every request). Fetch the link on click and open it in a new tab.
 */
export const GpuConsoleLink = (props: GpuConsoleLinkProps) => {
  const { nodeName, instanceId } = props

  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const showErrorToast = useShowErrorToast()

  const { isLoading, mutateResource: getGpuInstanceConsole } =
    useCosMutationRequest(nodesApi.getGpuInstanceConsole)

  const onConsoleClick = async () => {
    try {
      const { console: consoleUrl } = await getGpuInstanceConsole({
        dataCenter: dataCenter!.name,
        nodeName,
        instanceId,
      })
      window.open(consoleUrl, '_blank', 'noopener,noreferrer')
    } catch (error) {
      showErrorToast(error)
    }
  }

  return (
    <CosHyperlink
      size="sm"
      variant="text-inline"
      disabled={isLoading}
      onClick={onConsoleClick}
    >
      {t('nodes.details.attachedInstancesList.console')}
    </CosHyperlink>
  )
}
