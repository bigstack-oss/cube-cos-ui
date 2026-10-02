import { PropsWithChildren, useMemo } from 'react'
import { Asset, Carousel } from '../Carousel/Carousel'

export type AuthLayoutProps = PropsWithChildren<{
  resourcesPath: string
}>

/**
 * The frame every page shares: the page's own content on the left half,
 * the product carousel on the right half.
 */
export const AuthLayout = (props: AuthLayoutProps) => {
  const { resourcesPath, children } = props

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
      {children}
      <Carousel assets={assets} />
    </div>
  )
}
