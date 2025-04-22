import { useNavigate } from 'react-router'
import { GetDataCentersResponseDataInnerAdditionalNodeLicenseStatus } from '@cube-frontend/api'
import { CosSideBarProps } from '@cube-frontend/ui-library'
import { getInvalidMessageList } from '../utils/license'
import { links } from '../pages/maintenance/links'

export const useSideBarNagging = (
  nodeLicenseStatus:
    | GetDataCentersResponseDataInnerAdditionalNodeLicenseStatus
    | undefined,
): CosSideBarProps['naggingProps'] => {
  const navigation = useNavigate()

  const invalidMessageList = getInvalidMessageList(nodeLicenseStatus)

  if (invalidMessageList.length === 0) {
    return undefined
  }

  return {
    type: 'error',
    title: invalidMessageList[0],
    link: {
      text: 'Go to License',
      onClick: () => {
        navigation(links.license)
      },
    },
  }
}
