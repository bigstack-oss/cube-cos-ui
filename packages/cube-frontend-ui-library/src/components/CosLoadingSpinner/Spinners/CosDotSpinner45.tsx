import { Dot45 } from '../Svgs/Dot45'

export const CosDotSpinner45 = () => {
  return (
    // The size of container must be equal to the size of dots.
    <div className="relative inline size-4 text-cosmos-primary">
      <Dot45 className="absolute rotate-0 animate-cos-dot-spinner-45-vector-0" />
      <Dot45 className="absolute rotate-45 animate-cos-dot-spinner-45-vector-1" />
      <Dot45 className="absolute rotate-90 animate-cos-dot-spinner-45-vector-2" />
      <Dot45 className="absolute rotate-[135deg] animate-cos-dot-spinner-45-vector-3" />
      <Dot45 className="absolute rotate-180 animate-cos-dot-spinner-45-vector-4" />
      <Dot45 className="absolute rotate-[225deg] animate-cos-dot-spinner-45-vector-5" />
      <Dot45 className="absolute rotate-[270deg] animate-cos-dot-spinner-45-vector-6" />
      <Dot45 className="absolute rotate-[315deg] animate-cos-dot-spinner-45-vector-7" />
    </div>
  )
}
