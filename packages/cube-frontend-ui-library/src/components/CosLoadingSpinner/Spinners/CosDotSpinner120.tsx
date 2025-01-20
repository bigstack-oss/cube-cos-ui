import { PropsWithClassName } from '@cube-frontend/utils'
import { Dot120 } from '../Svgs/Dot120'
import { twMerge } from 'tailwind-merge'

export const CosDotSpinner120 = (props: PropsWithClassName) => {
  const { className } = props

  return (
    // The size of container must be equal to the size of dots.
    <div
      className={twMerge(
        'relative inline size-4 text-cosmos-primary',
        className,
      )}
    >
      <Dot120 className="absolute rotate-0 animate-cos-dot-spinner-120-vector-0" />
      <Dot120 className="absolute rotate-[135deg] animate-cos-dot-spinner-120-vector-1" />
      <Dot120 className="absolute rotate-[270deg] animate-cos-dot-spinner-120-vector-2" />
    </div>
  )
}
