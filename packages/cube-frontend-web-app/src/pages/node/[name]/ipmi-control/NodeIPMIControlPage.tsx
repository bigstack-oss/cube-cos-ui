import { NodesApiGetNodeRequest } from '@cube-frontend/api'
import { CosBackButton } from '@cube-frontend/ui-library'
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
        IPMI Control
      </CosBackButton>
      {node?.ipmi.isConnected ? (
        <DisconnectFromIPMI nodeName={nodeName} />
      ) : (
        <div className="flex items-start gap-x-4">
          <ConnectToIPMI
            node={node}
            backHref={backHref}
            isValidationLogOpen={isValidationLogOpen}
            toggleValidationLog={onValidationLogToggled}
            onLogChange={onValidated}
          />
          {!!node && (
            <ValidationLog
              isOpen={isValidationLogOpen}
              log={validationLog}
              onClose={() => onValidationLogToggled(false)}
            />
          )}
        </div>
      )}
    </div>
  )
}
