import { CosButton, CosStroke, CosToggle } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { updateIsIPMIEnabled } from './NodeIPMIControlPage'

type DisconnectFromIPMIProps = {
  nodeName: string
}

export const DisconnectFromIPMI = (props: DisconnectFromIPMIProps) => {
  const { nodeName } = props

  const navigate = useNavigate()

  const [isOn, setIsOn] = useState(true)

  const [isDisconnecting, setIsDisconnecting] = useState(false)

  const goBackToNodeDetailsPage = (): void => {
    navigate(CosRoutesEnum.NODE_DETAIL_PAGE(nodeName))
  }

  const onConfirmClick = async (): Promise<void> => {
    setIsDisconnecting(true)
    try {
      // TODO: Call disconnect IPMI API.
      setTimeout(() => {
        updateIsIPMIEnabled(false)
        goBackToNodeDetailsPage()
      }, 2000)
    } catch (error) {
      console.error('Disconnect from IPMI error: ', error)
      setIsDisconnecting(false)
    }
  }

  return (
    <div
      className="flex flex-col gap-y-4 rounded-[5px] bg-grey-0 px-8 py-6"
      style={{
        boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.10)',
      }}
    >
      <div className="secondary-h4 text-functional-title">
        Disconnect From IPMI
      </div>
      <p className="primary-body5 mt-2 text-functional-text">
        Once disconnected from IPMI, power control actions (power on/off, power
        cycle) will no longer be available.
      </p>
      <CosToggle
        className="mt-4"
        label="On"
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
          Confirm
        </CosButton>
        <CosButton
          type="ghost"
          disabled={isDisconnecting}
          onClick={goBackToNodeDetailsPage}
        >
          Cancel
        </CosButton>
      </div>
    </div>
  )
}
