import { Asset } from './Carousel'

export type CarouselSlideProps = {
  asset: Asset
}

export const CarouselSlide = (props: CarouselSlideProps) => {
  const { asset } = props

  return (
    <div className="flex w-full shrink-0 justify-center">
      <img
        className="h-[550px] object-contain"
        draggable={false}
        src={asset.src}
        alt={asset.alt}
      />
    </div>
  )
}
