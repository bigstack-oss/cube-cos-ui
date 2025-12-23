import { useTranslation } from 'react-i18next'

type SyncingStatusProps = {
  status: string
}

export const SyncingStatus = (props: SyncingStatusProps) => {
  const { status } = props

  const { t } = useTranslation()

  return t('maintenance.update.syncingStatus', {
    status,
  })
}
