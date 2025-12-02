import { CosLogConsole } from '@cube-frontend/ui-library'
import { useTranslation } from 'react-i18next'

type ReleaseNotePanelProps = {
  releaseNote?: string
}

export const ReleaseNotePanel = (props: ReleaseNotePanelProps) => {
  const { releaseNote = '' } = props

  const { t } = useTranslation()

  return (
    <CosLogConsole>
      {releaseNote || t('maintenance.update.noData')}
    </CosLogConsole>
  )
}
