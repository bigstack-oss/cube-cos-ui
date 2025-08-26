import { Node } from '@cube-frontend/api'
import {
  CosButton,
  CosInput,
  CosPasswordInput,
  CosStatusReaction,
  CosStroke,
} from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { upperFirst } from 'lodash'
import { FormEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { verifyIpmiResponseToLog } from './ipmiUtils'
import { IPMISetup, useIPMISetup } from './useIPMISetup'

type ConnectToIPMIProps = {
  node: Node | undefined
  backHref: string
  isVerified: boolean
  onLogChange: (log: string) => void
  toggleValidationLog: (isOpen?: boolean) => void
}

export const ConnectToIPMI = (props: ConnectToIPMIProps) => {
  const { node, backHref, isVerified, onLogChange, toggleValidationLog } = props

  const navigate = useNavigate()

  const { dataCenter } = useContext(DataCenterContext)

  const {
    setup,
    fieldsValidity,
    allFieldsValid,
    onSetupChange,
    getParsedSetup,
  } = useIPMISetup(node?.ipmi.ip ?? '')

  const {
    isLoading: isVerifying,
    errorState,
    mutateResource: verifyNodeIpmi,
  } = useCosMutationRequest(nodesApi.verifyNodeIpmi)

  const [isSaving, setIsSaving] = useState(false)

  const onVerify = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (isVerifying || !allFieldsValid) return

    toggleValidationLog(true)

    try {
      const data = await verifyNodeIpmi({
        dataCenter: dataCenter!.name,
        nodeName: node!.hostname,
        nodeIpmiSettingRequest: getParsedSetup(),
      })
      onLogChange(verifyIpmiResponseToLog(data))
    } catch (error) {
      console.error('Verify IPMI setup error: ', error)
      onLogChange('')
    }
  }

  const renderValidationResult = () => {
    if (isVerified) return <CosStatusReaction status="success" />
    if (errorState) {
      return (
        <CosStatusReaction
          status="failed"
          message={upperFirst(errorState.api?.msg)}
        />
      )
    }
    return null
  }

  const goBack = (): void => {
    navigate(backHref)
  }

  const handleSetupChange = (field: keyof IPMISetup, value: string): void => {
    onSetupChange(field, value)
    onLogChange('')
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

  const isInputDisabled = isVerifying || isSaving

  return (
    <div className="flex flex-col gap-y-4">
      <p className="primary-body5 text-functional-text">
        Make sure the IPMI protocol and its associated port are accessible on
        both the host and the firewall.
      </p>
      <form className="flex flex-col gap-y-4" onSubmit={onVerify}>
        <CosInput
          label="Port"
          placeholder="Port"
          value={setup.port}
          errorMessage={!!setup.port && !fieldsValidity.port && 'Invalid port'}
          isLoading={!node}
          disabled={isInputDisabled}
          onChange={(e) => handleSetupChange('port', e.target.value)}
        />
        <CosInput
          label="IP"
          placeholder="IP"
          value={setup.ip}
          errorMessage={!!setup.ip && !fieldsValidity.ip && 'Invalid IP'}
          isLoading={!node}
          disabled={isInputDisabled}
          onChange={(e) => handleSetupChange('ip', e.target.value)}
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
          onChange={(e) => handleSetupChange('username', e.target.value)}
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
          onChange={(e) => handleSetupChange('password', e.target.value)}
        />
        <div className="flex items-center gap-x-4">
          <CosButton
            type="secondary"
            htmlType="submit"
            className="self-start"
            loading={isVerifying}
            disabled={!allFieldsValid || isSaving}
          >
            Verify
          </CosButton>
          {renderValidationResult()}
        </div>
      </form>
      <CosStroke type="dot" />
      <div className="mt-3 flex items-center gap-x-4">
        <CosButton
          loading={isSaving}
          disabled={!node || !allFieldsValid || !isVerified}
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
