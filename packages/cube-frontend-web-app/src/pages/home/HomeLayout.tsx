import { CosTabs } from '@cube-frontend/ui-library'
import { MouseEvent } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { links } from './links'

export const HomeLayout = () => {
  const location = useLocation()

  const navigate = useNavigate()

  // TODO: make a reusable component to make navigation easier.
  const onTabClick = (e: MouseEvent<HTMLElement>, to: string) => {
    e.preventDefault()
    navigate(to)
  }

  return (
    <div>
      <CosTabs>
        <CosTabs.Tab
          href={links.overview}
          isActive={location.pathname === links.overview}
          onClick={(e) => onTabClick(e, links.overview)}
        >
          Overview
        </CosTabs.Tab>
        <CosTabs.Tab
          href={links.chart}
          isActive={location.pathname === links.chart}
          onClick={(e) => onTabClick(e, links.chart)}
        >
          Chart
        </CosTabs.Tab>
        <CosTabs.Tab
          href={links.health}
          isActive={location.pathname === links.health}
          onClick={(e) => onTabClick(e, links.health)}
        >
          Health
        </CosTabs.Tab>
        <CosTabs.Tab
          href={links.manage}
          isActive={location.pathname === links.manage}
          onClick={(e) => onTabClick(e, links.manage)}
        >
          Manage
        </CosTabs.Tab>
      </CosTabs>
      <Outlet />
    </div>
  )
}
