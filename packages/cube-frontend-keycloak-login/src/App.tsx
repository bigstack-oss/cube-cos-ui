import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/urbanist/400.css'
import '@fontsource/urbanist/500.css'
import '@fontsource/urbanist/600.css'
import '@fontsource/urbanist/800.css'
import { useMemo } from 'react'
import { Asset, Carousel } from './components/Carousel/Carousel'
import { LoginForm } from './components/LoginForm/LoginForm'
import './keycloakLoginContextSetupDev'
import './tailwind.css'

export const App = () => {
  const { resourcesPath } = window.keycloakLoginContext

  const assets = useMemo<Asset[]>(() => {
    const assetsWithPath = [
      {
        path: '/img/automation.png',
        alt: 'Automation',
      },
      {
        path: '/img/network.png',
        alt: 'Network',
      },
      {
        path: '/img/storage.png',
        alt: 'Storage',
      },
      {
        path: '/img/compute.png',
        alt: 'Compute',
      },
      {
        path: '/img/gpu.png',
        alt: 'GPU',
      },
      {
        path: '/img/monitor.png',
        alt: 'Monitor',
      },
    ]

    return assetsWithPath.map((asset) => ({
      src: `${resourcesPath}${asset.path}`,
      alt: asset.alt,
    }))
  }, [resourcesPath])

  return (
    <div className="flex size-full min-h-[720px] min-w-[1280px] bg-grey-0">
      <LoginForm />
      <Carousel assets={assets} />
    </div>
  )
}
