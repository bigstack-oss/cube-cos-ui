import { Asset } from './Carousel'

export type CarouselSlideProps = {
  asset: Asset
  index: number
  activeIndex: number
}

export const CarouselSlide = (props: CarouselSlideProps) => {
  const { asset, index, activeIndex } = props

  return (
    <div
      className="flex w-full shrink-0 items-center justify-center transition-all"
      style={{
        marginLeft: index === 0 ? `-${100 * activeIndex}%` : undefined,
      }}
    >
      <img
        className="w-full object-contain"
        draggable={false}
        src={asset.path}
        alt={asset.alt}
      />
    </div>
  )
}
