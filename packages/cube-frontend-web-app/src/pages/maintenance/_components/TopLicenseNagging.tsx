import { useContext } from 'react'
import { useLocation } from 'react-router'
import { isNil } from 'lodash'
import { CosNagging } from '@cube-frontend/ui-library'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { quickStartUrl } from '@cube-frontend/web-app/utils/help'
import { getInvalidMessageList } from '@cube-frontend/web-app/utils/license'
import { useTopLicenseNaggingStore } from '@cube-frontend/web-app/stores/topLicenseNaggingStore'
import { links } from '../links'

export const TopLicenseNagging = () => {
  const { pathname } = useLocation()
  const { dataCenter } = useContext(DataCenterContext)
  const { isClosed, closeTopLicenseNagging } = useTopLicenseNaggingStore()

  if (pathname !== links.license || isClosed || isNil(dataCenter)) {
    return null
  }

  const { additional } = dataCenter
  const errorMessageList = getInvalidMessageList(additional.nodeLicenseStatus)

  if (errorMessageList.length === 0) {
    return null
  }

  return (
    <CosNagging
      className="w-full"
      variant="top"
      type="error"
      title="We have detected some issues with your license"
      description={errorMessageList}
      link={{
        text: 'Go to Help',
        href: additional.helpUrl || quickStartUrl,
      }}
      onClose={closeTopLicenseNagging}
    />
  )
}
