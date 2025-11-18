import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { DataCenterAdditionalNodeLicenseStatus } from '@cube-frontend/api'
import { CosSideBarProps } from '@cube-frontend/ui-library'
import { useInvalidMessageList } from '../hooks/license/useLicenseInvalidMessageList'
import { links } from '../pages/maintenance/links'

export const useSideBarNagging = (
  nodeLicenseStatus: DataCenterAdditionalNodeLicenseStatus | undefined,
): CosSideBarProps['naggingProps'] => {
  const navigation = useNavigate()

  const { t } = useTranslation()

  const invalidMessageList = useInvalidMessageList(nodeLicenseStatus)

  if (invalidMessageList.length === 0) {
    return undefined
  }

  return {
    type: 'error',
    title: invalidMessageList[0],
    link: {
      text: t('maintenance.license.nagging.goToLicense'),
      onClick: () => {
        navigation(links.license)
      },
    },
  }
}
