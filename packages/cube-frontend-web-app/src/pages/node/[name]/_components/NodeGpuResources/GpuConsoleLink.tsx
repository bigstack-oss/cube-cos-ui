import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CosHyperlink } from '@cube-frontend/ui-library'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
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

  const { getResource: getGpuInstanceConsole } = useCosGetRequest(
    nodesApi.getGpuInstanceConsole,
    () => ({
      dataCenter: dataCenter!.name,
      nodeName,
      instanceId,
    }),
    { fetchOnMount: false, fetchOnParamChanges: false },
  )

  const [isOpeningConsole, setIsOpeningConsole] = useState(false)

  const onConsoleClick = async () => {
    setIsOpeningConsole(true)
    try {
      const { console: consoleUrl } = await getGpuInstanceConsole()
      window.open(consoleUrl, '_blank', 'noopener,noreferrer')
    } catch (error) {
      showErrorToast(error)
    } finally {
      setIsOpeningConsole(false)
    }
  }

  return (
    <CosHyperlink
      size="sm"
      variant="text-inline"
      disabled={isOpeningConsole}
      onClick={onConsoleClick}
    >
      {t('nodes.details.attachedInstancesList.console')}
    </CosHyperlink>
  )
}
