import { useContext } from 'react'
import { SideBarBottomLinkProps } from '@cube-frontend/ui-library'
import { DataCenterContext } from '../context/DataCenterContext'
import { quickStartUrl } from '../utils/help'
import { useTranslation } from 'react-i18next'

export const useSidebarBottomLinks = (): SideBarBottomLinkProps[] => {
  const { dataCenter } = useContext(DataCenterContext)

  const { t } = useTranslation()

  const links: SideBarBottomLinkProps[] = []

  if (dataCenter) {
    links.push({
      text: t('sidebar.apiDocument'),
      href: dataCenter.additional.v1ApiDocUrl,
    })
  }

  links.push({
    text: t('sidebar.help'),
    href: dataCenter?.additional.helpUrl || quickStartUrl,
  })

  return links
}
