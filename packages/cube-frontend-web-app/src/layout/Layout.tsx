import { PropsWithChildren } from 'react'
import Sidebar from './SideBar/SideBar'
import Header from './Header/Header'
import Content from './Content'

const Layout = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <div className="h-svh min-w-full overflow-hidden bg-scene-background">
      <div className="flex h-svh flex-row">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <Content>{children}</Content>
        </div>
      </div>
    </div>
  )
}

export default Layout
