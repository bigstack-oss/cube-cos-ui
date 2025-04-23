import { useContext } from 'react'
import { SideBarBottomLinkProps } from '@cube-frontend/ui-library'
import { DataCenterContext } from '../context/DataCenterContext'

export const useSidebarBottomLinks = (): SideBarBottomLinkProps[] => {
  const { dataCenter } = useContext(DataCenterContext)

  const links: SideBarBottomLinkProps[] = [
    {
      text: 'Help',
      href:
        dataCenter?.additional.helpUrl ||
        'https://docs.bigstack.co/docs/cubecos/quick_start/get_started',
    },
  ]

  return links
}
