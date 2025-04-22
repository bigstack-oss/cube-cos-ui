import { useContext } from 'react'
import { SideBarBottomLinkProps } from '@cube-frontend/ui-library'
import { DataCenterContext } from '../context/DataCenterContext'
import { quickStartUrl } from '../utils/help'

export const useSidebarBottomLinks = (): SideBarBottomLinkProps[] => {
  const { dataCenter } = useContext(DataCenterContext)

  const links: SideBarBottomLinkProps[] = [
    {
      text: 'Help',
      href: dataCenter?.additional.helpUrl || quickStartUrl,
    },
  ]

  return links
}
