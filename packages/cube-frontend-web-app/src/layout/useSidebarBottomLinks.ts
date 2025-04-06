import { SideBarBottomLinkProps } from '@cube-frontend/ui-library'

export const useSidebarBottomLinks = (): SideBarBottomLinkProps[] => {
  const links: SideBarBottomLinkProps[] = [
    {
      text: 'Help',
      href: 'https://docs.bigstack.co/docs/cubecos/quick_start/get_started',
    },
  ]

  return links
}
