import { useTranslation } from 'react-i18next'
import { NodesApiGetNodeRequest } from '@cube-frontend/api'
import {
  CosBackButton,
  CosCollapsiblePanelLayout,
} from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { ConnectToIPMI } from './ConnectToIPMI'
import { DisconnectFromIPMI } from './DisconnectFromIPMI'
import { ValidationLog } from './ValidationLog'

export const NodeIPMIControlPage = () => {
  const { name: nodeName } = useParams()

  if (!nodeName) {
    throw new Error('Cannot find node name in the URL')
  }

  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const [isValidationLogOpen, setIsValidationLogOpen] = useState(true)
  const [validationLog, setValidationLog] = useState('')

  const { isLoading, data: node } = useCosGetRequest(
    nodesApi.getNode,
    (): NodesApiGetNodeRequest => ({
      dataCenter: dataCenter!.name,
      nodeName,
    }),
  )

  const backHref = CosRoutesEnum.NODE_DETAIL_PAGE(nodeName)

  if (!isLoading && !node?.ipmi.isSupported) {
    // Node not found or IPMI not supported.
    return <Navigate to={backHref} replace={true} />
  }

  const onValidationLogToggled = (isOpen?: boolean): void => {
    setIsValidationLogOpen((prev) => isOpen ?? !prev)
  }

  const onValidated = (log: string): void => {
    setValidationLog(log)
  }

  const isVerified = !!validationLog

  return (
    <div className="flex flex-col gap-y-4">
      <CosBackButton
        backButtonContainer={{
          Component: Link,
          props: {
            to: CosRoutesEnum.NODE_DETAIL_PAGE(nodeName),
          },
        }}
      >
        {t('nodes.ipmiControl.title')}
      </CosBackButton>
      {node?.ipmi.isConnected ? (
        <DisconnectFromIPMI nodeName={nodeName} />
      ) : (
        <CosCollapsiblePanelLayout
          isControlledPanelOpen={isValidationLogOpen}
          onControlledPanelOpenChange={onValidationLogToggled}
        >
          <CosCollapsiblePanelLayout.LeftPanel
            topic={t('nodes.ipmiControl.connectToImpi.title')}
          >
            <ConnectToIPMI
              node={node}
              backHref={backHref}
              isVerified={isVerified}
              toggleValidationLog={onValidationLogToggled}
              onLogChange={onValidated}
            />
          </CosCollapsiblePanelLayout.LeftPanel>
          <CosCollapsiblePanelLayout.RightPanel
            topic={t('nodes.ipmiControl.validateInformation')}
          >
            <ValidationLog log={validationLog} />
          </CosCollapsiblePanelLayout.RightPanel>
        </CosCollapsiblePanelLayout>
      )}
    </div>
  )
}
