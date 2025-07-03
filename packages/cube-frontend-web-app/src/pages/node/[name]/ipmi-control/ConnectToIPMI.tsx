import { Node } from '@cube-frontend/api'
import {
  CosButton,
  CosInput,
  CosPasswordInput,
  CosStatusReaction,
  CosStroke,
} from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { FormEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { verifyIpmiResponseToLog } from './ipmiUtils'
import { useIPMISetup } from './useIPMISetup'

type ConnectToIPMIProps = {
  node: Node | undefined
  backHref: string
  isValidationLogOpen: boolean
  onLogChange: (log: string) => void
  toggleValidationLog: (isOpen?: boolean) => void
}

type ValidationStatus = 'validating' | 'success' | 'failed' | undefined

export const ConnectToIPMI = (props: ConnectToIPMIProps) => {
  const { node, backHref, onLogChange, toggleValidationLog } = props

  const navigate = useNavigate()

  const { dataCenter } = useContext(DataCenterContext)

  const {
    setup,
    fieldsValidity,
    allFieldsValid,
    onSetupChange,
    getParsedSetup,
  } = useIPMISetup(node?.ipmi.ip ?? '')

  const [validationStatus, setValidationStatus] =
    useState<ValidationStatus>(undefined)
  const [isSaving, setIsSaving] = useState(false)

  const isValidating = validationStatus === 'validating'

  const onValidate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (isValidating || !allFieldsValid) return

    toggleValidationLog(true)
    setValidationStatus('validating')

    try {
      const { data: response } = await nodesApi.verifyNodeIpmi({
        dataCenter: dataCenter!.name,
        nodeName: node!.hostname,
        nodeIpmiSettingRequest: getParsedSetup(),
      })
      setValidationStatus('success')
      onLogChange(verifyIpmiResponseToLog(response.data))
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

  const goBack = (): void => {
    navigate(backHref)
  }

  const onConfirmClick = async (): Promise<void> => {
    setIsSaving(true)
    try {
      await nodesApi.setNodeIpmi({
        dataCenter: dataCenter!.name,
        nodeName: node!.hostname,
        nodeIpmiSettingRequest: getParsedSetup(),
      })
      goBack()
    } catch (error) {
      console.error('Enable IPMI error: ', error)
      setIsSaving(false)
    }
  }

  const isInputDisabled = isValidating || isSaving

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
      <form className="flex flex-col gap-y-4" onSubmit={onValidate}>
        <CosInput
          label="Port"
          placeholder="Port"
          value={setup.port}
          errorMessage={!!setup.port && !fieldsValidity.port && 'Invalid port'}
          isLoading={!node}
          disabled={isInputDisabled}
          onChange={(e) => onSetupChange('port', e.target.value)}
        />
        <CosInput
          label="IP"
          placeholder="IP"
          value={setup.ip}
          errorMessage={!!setup.ip && !fieldsValidity.ip && 'Invalid IP'}
          isLoading={!node}
          disabled={isInputDisabled}
          onChange={(e) => onSetupChange('ip', e.target.value)}
        />
        <CosInput
          label="Username"
          placeholder="Username"
          value={setup.username}
          errorMessage={
            !!setup.username && !fieldsValidity.username && 'Invalid username'
          }
          isLoading={!node}
          disabled={isInputDisabled}
          onChange={(e) => onSetupChange('username', e.target.value)}
        />
        <CosPasswordInput
          label="Password"
          placeholder="Password"
          value={setup.password}
          errorMessage={
            !!setup.password && !fieldsValidity.password && 'Invalid password'
          }
          isLoading={!node}
          disabled={isInputDisabled}
          onChange={(e) => onSetupChange('password', e.target.value)}
        />
        <div className="flex items-center gap-x-4">
          <CosButton
            type="secondary"
            htmlType="submit"
            className="self-start"
            loading={isValidating}
            disabled={!allFieldsValid || isSaving}
          >
            Validate
          </CosButton>
          {renderValidationResult()}
        </div>
      </form>
      <CosStroke type="dot" />
      <div className="mt-3 flex items-center gap-x-4">
        <CosButton
          loading={isSaving}
          disabled={!node || !allFieldsValid || validationStatus !== 'success'}
          onClick={onConfirmClick}
        >
          Confirm
        </CosButton>
        <CosButton type="ghost" disabled={!node} onClick={goBack}>
          Cancel
        </CosButton>
      </div>
    </div>
  )
}
