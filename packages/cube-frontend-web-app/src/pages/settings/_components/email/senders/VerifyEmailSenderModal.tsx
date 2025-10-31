import {
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { CosInput, CosModal } from '@cube-frontend/ui-library'
import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'

import { EmailSenderRow } from './emailSendersUtils'

type VerifyEmailSenderModalProps = {
  isOpen: boolean
  toBeVerifiedRow: EmailSenderRow | undefined
  onSenderVerified: (rowId: string) => void
  onClose: () => void
}

const emailSchema = z.string().email()

export const VerifyEmailSenderModal = (props: VerifyEmailSenderModalProps) => {
  const { isOpen, toBeVerifiedRow, onSenderVerified, onClose } = props

  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const [sendTo, setSendTo] = useState('')

  const {
    isLoading: isTrying,
    mutateResource: tryEmailSender,
    errorState,
    clearError,
  } = useCosMutationRequest(settingsApi.tryEmailSender)

  useEffect(() => {
    if (isOpen) {
      setSendTo('')
      clearError()
    }
  }, [isOpen, clearError])

  const isEmailValid = useMemo<boolean>(
    () => emailSchema.safeParse(sendTo).success,
    [sendTo],
  )

  const onActionClick = async () => {
    if (!toBeVerifiedRow) {
      return
    }

    try {
      await tryEmailSender({
        dataCenter: dataCenter!.name,
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
    if (e.key === 'Enter' && isEmailValid) {
      onActionClick()
    }
  }

  return (
    <CosModal
      title={t('settings.emailSender.modal.title')}
      size="sm"
      isOpen={isOpen}
      actionText={t('settings.emailSender.modal.send')}
      actionButtonProps={{
        loading: isTrying,
        disabled: !isEmailValid,
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
          {t('settings.emailSender.modal.sendTo')}
        </div>
        <CosInput
          type="email"
          placeholder={t('settings.emailSender.modal.email')}
          value={sendTo}
          helpMessage={t('settings.emailSender.modal.emailHelpMessage')}
          disabled={isTrying}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </CosModal>
  )
}
