import {
  CosButton,
  CosInput,
  CosPasswordInput,
  CosStatusReaction,
  CosStroke,
} from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { updateIsIPMIEnabled } from './NodeIPMIControlPage'
import { useIPMISetup } from './useIPMISetup'

type ConnectToIPMIProps = {
  nodeName: string
  isValidationLogOpen: boolean
  onLogChange: (log: string) => void
  toggleValidationLog: (isOpen?: boolean) => void
}

type ValidationStatus = 'validating' | 'success' | 'failed' | undefined

export const ConnectToIPMI = (props: ConnectToIPMIProps) => {
  const { nodeName, onLogChange, toggleValidationLog } = props

  const navigate = useNavigate()

  const { setup, fieldsValidity, allFieldsValid, onSetupChange } =
    useIPMISetup()

  const [validationStatus, setValidationStatus] =
    useState<ValidationStatus>(undefined)
  const [isSaving, setIsSaving] = useState(false)

  const isValidating = validationStatus === 'validating'

  const onValidateClick = async (): Promise<void> => {
    toggleValidationLog(true)
    setValidationStatus('validating')

    try {
      // TODO: Call validate IPMI API.
      setTimeout(() => {
        setValidationStatus('success')
        onLogChange(
          'Board Mfg Date: Tue Dec 20 17:31:00 2016\nBoard Mfg: DELL\nBoard Product: PowerEdge R630\nBoard Serial: CN747516CK0286\nBoard Part Number: 02C2CPA04\nProduct Manufacturer: DELL\nProduct Name: PowerEdge R630\nProduct Version: 01\nProduct Serial: 1MXXZH2',
        )
      }, 1000)
    } catch (error) {
      console.error('Validate IPMI setup error: ', error)
      setValidationStatus('failed')
      onLogChange('')
    }
  }

  const renderValidationResult = () => {
    if (validationStatus === 'success')
      return <CosStatusReaction status="success" />
    if (validationStatus === 'failed')
      return <CosStatusReaction status="failed" />
    return null
  }

  const goBackToNodeDetailsPage = (): void => {
    navigate(CosRoutesEnum.NODE_DETAIL_PAGE(nodeName))
  }

  const onConfirmClick = async (): Promise<void> => {
    setIsSaving(true)
    try {
      // TODO: Call save API.
      setTimeout(() => {
        updateIsIPMIEnabled(true)
        goBackToNodeDetailsPage()
      }, 1000)
    } catch (error) {
      console.error('Enable IPMI error: ', error)
      setIsSaving(false)
    }
  }

  return (
    <div
      className="flex flex-1 shrink-0 flex-col gap-y-4 rounded-[5px] bg-grey-0 px-8 py-6"
      style={{
        boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.10)',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="secondary-h4 text-functional-title">
          Connect to IPMI
        </div>
        <button
          type="button"
          className="inline-flex size-[26px] cursor-pointer items-center justify-center rounded-full bg-blue-150"
          onClick={() => toggleValidationLog()}
        >
          <InformationCircle className="icon-lg text-functional-text" />
        </button>
      </div>
      <p className="primary-body5 text-functional-text">
        Make sure the IPMI protocol and its associated port are accessible on
        both the host and the firewall.
      </p>
      <CosInput
        label="Port"
        placeholder="Port"
        value={setup.port}
        errorMessage={!!setup.port && !fieldsValidity.port && 'Invalid port'}
        disabled={isValidating}
        onChange={(e) => onSetupChange('port', e.target.value)}
      />
      <CosInput
        label="IP"
        placeholder="IP"
        value={setup.ip}
        errorMessage={!!setup.ip && !fieldsValidity.ip && 'Invalid IP'}
        disabled={isValidating}
        onChange={(e) => onSetupChange('ip', e.target.value)}
      />
      <CosInput
        label="Username"
        placeholder="Username"
        value={setup.username}
        errorMessage={
          !!setup.username && !fieldsValidity.username && 'Invalid username'
        }
        disabled={isValidating}
        onChange={(e) => onSetupChange('username', e.target.value)}
      />
      <CosPasswordInput
        label="Password"
        placeholder="Password"
        value={setup.password}
        errorMessage={
          !!setup.password && !fieldsValidity.password && 'Invalid password'
        }
        disabled={isValidating}
        onChange={(e) => onSetupChange('password', e.target.value)}
      />
      <div className="flex items-center gap-x-6">
        <CosButton
          className="self-start"
          loading={isValidating}
          disabled={!allFieldsValid}
          onClick={onValidateClick}
        >
          Validate
        </CosButton>
        {renderValidationResult()}
      </div>
      <CosStroke type="dot" />
      <div className="mt-3 flex items-center gap-x-4">
        <CosButton
          loading={isSaving}
          disabled={!allFieldsValid || validationStatus !== 'success'}
          onClick={onConfirmClick}
        >
          Confirm
        </CosButton>
        <CosButton type="ghost" onClick={goBackToNodeDetailsPage}>
          Cancel
        </CosButton>
      </div>
    </div>
  )
}
