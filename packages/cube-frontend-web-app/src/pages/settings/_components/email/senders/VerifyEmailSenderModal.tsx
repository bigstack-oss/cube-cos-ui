import { SettingsApiTryEmailSenderRequest } from '@cube-frontend/api'
import { CosInput, CosModal } from '@cube-frontend/ui-library'
import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { z } from 'zod'
import { EmailSenderRow } from './emailSendersUtils'

type VerifyEmailSenderModalProps = {
  isOpen: boolean
  toBeVerifiedRow: EmailSenderRow | undefined
  onSenderVerified: (rowId: string) => void
  onClose: () => void
}

const emailSchema = z.string().email('Invalid email').optional()

export const VerifyEmailSenderModal = (props: VerifyEmailSenderModalProps) => {
  const { isOpen, toBeVerifiedRow, onSenderVerified, onClose } = props

  const { name: dataCenter } = useContext(DataCenterContext)

  const [sendTo, setSendTo] = useState('')

  const {
    isLoading: isTrying,
    mutateResource: tryEmailSender,
    errorState,
    clearError,
  } = useCosMutationRequest(
    settingsApi.tryEmailSender as (
      params: SettingsApiTryEmailSenderRequest,
    ) => Promise<CosApiResponse<undefined>>,
  )

  useEffect(() => {
    if (isOpen) {
      setSendTo('')
      clearError()
    }
  }, [isOpen, clearError])

  const inputError = useMemo<string | undefined>(
    () => emailSchema.safeParse(sendTo).error?.issues[0].message,
    [sendTo],
  )

  const onActionClick = async () => {
    if (!toBeVerifiedRow) {
      return
    }

    try {
      await tryEmailSender({
        dataCenter,
        senderHost: toBeVerifiedRow.host,
        tryEmailSender: {
          email: sendTo,
        },
      })
      onSenderVerified(toBeVerifiedRow.id)
    } catch {
      // Noop
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setSendTo(value)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && sendTo && !inputError) {
      onActionClick()
    }
  }

  return (
    <CosModal
      title="Send Test Email"
      size="sm"
      isOpen={isOpen}
      actionText="Send"
      actionButtonProps={{
        loading: isTrying,
        disabled: !sendTo || !!inputError,
      }}
      onActionClick={onActionClick}
      onCloseClick={onClose}
    >
      <div className="flex flex-col gap-y-2">
        {errorState && (
          <div className="text-status-negative">
            {errorState.api?.msg || errorState.native.message}
          </div>
        )}
        <div className="primary-body2 font-semibold text-functional-text">
          Send to
        </div>
        <CosInput
          type="email"
          placeholder="Email"
          value={sendTo}
          helpMessage="You have to input an email address to receive test email."
          disabled={isTrying}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </CosModal>
  )
}
