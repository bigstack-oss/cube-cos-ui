import { useUILibraryTranslation } from '../../i18n/useUILibraryTranslation'
import { Status } from './cosStatusReactionUtils'

export const useStatusReactionTranslation = (): Record<Status, string> => {
  const { t } = useUILibraryTranslation()

  return {
    neutral: t('component.status.reaction.neutral'),
    success: t('component.status.reaction.success'),
    available: t('component.status.reaction.available'),
    done: t('component.status.reaction.done'),
    error: t('component.status.reaction.error'),
    duplicate: t('component.status.reaction.duplicate'),
    failed: t('component.status.reaction.failed'),
  }
}
