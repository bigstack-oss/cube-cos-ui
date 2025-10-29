import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import {
  CosButton,
  CosGeneralPanel,
  CosStroke,
  CosToggle,
} from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'

type DisconnectFromIPMIProps = {
  nodeName: string
}

export const DisconnectFromIPMI = (props: DisconnectFromIPMIProps) => {
  const { nodeName } = props

  const { t } = useTranslation()

  const navigate = useNavigate()

  const { dataCenter } = useContext(DataCenterContext)

  const [isOn, setIsOn] = useState(true)

  const [isDisconnecting, setIsDisconnecting] = useState(false)

  const goBackToNodeDetailsPage = (): void => {
    navigate(CosRoutesEnum.NODE_DETAIL_PAGE(nodeName))
  }

  const onConfirmClick = async (): Promise<void> => {
    setIsDisconnecting(true)
    try {
      // TODO: Call disconnect IPMI API.
      await nodesApi.disconnectNodeIpmi({
        dataCenter: dataCenter!.name,
        nodeName,
      })
      goBackToNodeDetailsPage()
    } catch (error) {
      console.error('Disconnect from IPMI error: ', error)
      setIsDisconnecting(false)
    }
  }

  return (
    <CosGeneralPanel topic={t('nodes.ipmiControl.disconnectFromIpmi.title')}>
      <div className="flex flex-col gap-y-4">
        <p className="primary-body5 text-functional-text">
          {t('nodes.ipmiControl.disconnectFromIpmi.message')}
        </p>
        <CosToggle
          className="mt-4"
          label={t('nodes.ipmiControl.on')}
          isOn={isOn}
          disabled={isDisconnecting}
          onChange={setIsOn}
        />
        <CosStroke type="dot" />
        <div className="flex items-center gap-x-4">
          <CosButton
            loading={isDisconnecting}
            disabled={isOn}
            onClick={onConfirmClick}
          >
            {t('nodes.ipmiControl.confirm')}
          </CosButton>
          <CosButton
            type="ghost"
            disabled={isDisconnecting}
            onClick={goBackToNodeDetailsPage}
          >
            {t('nodes.ipmiControl.cancel')}
          </CosButton>
        </div>
      </div>
    </CosGeneralPanel>
  )
}
