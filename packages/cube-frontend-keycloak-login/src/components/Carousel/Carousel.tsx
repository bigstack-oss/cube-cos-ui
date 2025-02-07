import { useMemo, useState } from 'react'
import { CarouselPagination } from './CarouselPagination'
import { CarouselSlide } from './CarouselSlide'

export type Asset = {
  path: string
  alt: string
}

const assets: Asset[] = [
  {
    path: '/img/login_slide_0.png',
    alt: 'cubecos',
  },
  {
    path: '/img/login_slide_1.png',
    alt: 'File storage',
  },
  {
    path: '/img/login_slide_2.png',
    alt: 'Virtualization',
  },
]

export const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const { resourcesPath } = window.keycloakLoginContext

  const assetsWithUrl = useMemo<Asset[]>(() => {
    const computeUrl = (assetPath: string): string => {
      return `${resourcesPath}${assetPath}`
    }

    return assets.map((asset) => ({
      path: computeUrl(asset.path),
      alt: asset.alt,
    }))
  }, [resourcesPath])

  return (
    <div className="relative flex h-full w-1/2 items-center bg-primary">
      <div className="flex h-full overflow-hidden">
        {assetsWithUrl.map((asset, index) => (
          <CarouselSlide
            key={asset.path}
            asset={asset}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </div>
      <CarouselPagination
        itemCount={assets.length}
        activeIndex={activeIndex}
        onIndicatorClick={setActiveIndex}
      />
    </div>
  )
}
