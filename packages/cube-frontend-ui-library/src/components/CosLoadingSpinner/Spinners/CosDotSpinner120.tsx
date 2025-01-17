import { Dot120 } from '../Svgs/Dot120'

export const CosDotSpinner120 = () => {
  return (
    // The size of container must be equal to the size of dots.
    <div className="relative inline size-4 text-cosmos-primary">
      <Dot120 className="absolute rotate-0 animate-cos-dot-spinner-120-vector-0" />
      <Dot120 className="absolute rotate-[135deg] animate-cos-dot-spinner-120-vector-1" />
      <Dot120 className="absolute rotate-[270deg] animate-cos-dot-spinner-120-vector-2" />
    </div>
  )
}
