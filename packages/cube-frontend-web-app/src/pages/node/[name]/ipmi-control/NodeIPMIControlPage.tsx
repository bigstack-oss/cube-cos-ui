import { NodesApiGetNodeRequest } from '@cube-frontend/api'
import { CosBackButton } from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext, useState } from 'react'
import { Link, useParams } from 'react-router'
import { ConnectToIPMI } from './ConnectToIPMI'
import { DisconnectFromIPMI } from './DisconnectFromIPMI'
import { ValidationLog } from './ValidationLog'

// TODO: Replace this with a property in the node details.
let isIPMIEnabled = false

export const updateIsIPMIEnabled = (value: boolean): void => {
  isIPMIEnabled = value
}

export const NodeIPMIControlPage = () => {
  const { name: nodeName } = useParams()

  if (!nodeName) {
    throw new Error('Cannot find node name in the URL')
  }

  const { dataCenter } = useContext(DataCenterContext)

  const [isValidationLogOpen, setIsValidationLogOpen] = useState(true)
  const [validationLog, setValidationLog] = useState('')

  const { isLoading: _isLoading, data: _node } = useCosGetRequest(
    nodesApi.getNode,
    (): NodesApiGetNodeRequest => ({
      dataCenter: dataCenter!.name,
      nodeName,
    }),
  )

  const onValidationLogToggled = (isOpen?: boolean): void => {
    setIsValidationLogOpen((prev) => isOpen ?? !prev)
  }

  const onValidated = (log: string): void => {
    setValidationLog(log)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <CosBackButton
        variant="title"
        backLinkContainer={{
          Component: Link,
          props: {
            to: CosRoutesEnum.NODE_DETAIL_PAGE(nodeName),
          },
        }}
      >
        IPMI Control
      </CosBackButton>
      {isIPMIEnabled ? (
        <DisconnectFromIPMI nodeName={nodeName} />
      ) : (
        <div className="flex items-start gap-x-4">
          <ConnectToIPMI
            nodeName={nodeName}
            isValidationLogOpen={isValidationLogOpen}
            toggleValidationLog={onValidationLogToggled}
            onLogChange={onValidated}
          />
          <ValidationLog
            isOpen={isValidationLogOpen}
            log={validationLog}
            onClose={() => onValidationLogToggled(false)}
          />
        </div>
      )}
    </div>
  )
}
