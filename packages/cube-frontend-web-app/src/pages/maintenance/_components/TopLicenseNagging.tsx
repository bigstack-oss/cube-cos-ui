import { useContext } from 'react'
import { useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { CosNagging } from '@cube-frontend/ui-library'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { quickStartUrl } from '@cube-frontend/web-app/utils/help'
import { useInvalidMessageList } from '@cube-frontend/web-app/hooks/license/useLicenseInvalidMessageList'
import { useTopLicenseNaggingStore } from '@cube-frontend/web-app/stores/topLicenseNaggingStore'
import { links } from '../links'

export const TopLicenseNagging = () => {
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)
  const { additional } = dataCenter!

  const errorMessageList = useInvalidMessageList(additional.nodeLicenseStatus)

  const { isClosed, closeTopLicenseNagging } = useTopLicenseNaggingStore()

  if (pathname !== links.license || isClosed) {
    return null
  }

  if (errorMessageList.length === 0) {
    return null
  }

  return (
    <CosNagging
      className="w-full"
      variant="top"
      type="error"
      title={t('maintenance.license.nagging.haveDetectedIssues')}
      description={errorMessageList}
      link={{
        text: t('maintenance.license.nagging.goToHelp'),
        href: additional.helpUrl || quickStartUrl,
      }}
      onClose={closeTopLicenseNagging}
    />
  )
}
