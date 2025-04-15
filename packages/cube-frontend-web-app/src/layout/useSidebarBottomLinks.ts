import { SideBarBottomLinkProps } from '@cube-frontend/ui-library'
import { useContext } from 'react'
import { DataCenterContext } from '../context/DataCenterContext'

export const useSidebarBottomLinks = (): SideBarBottomLinkProps[] => {
  const { additional } = useContext(DataCenterContext)

  const links: SideBarBottomLinkProps[] = [
    {
      text: 'Help',
      href:
        additional.helpUrl ||
        'https://docs.bigstack.co/docs/cubecos/quick_start/get_started',
    },
  ]

  return links
}
