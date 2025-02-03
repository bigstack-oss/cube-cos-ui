import { PropsWithClassName } from '@cube-frontend/utils'
import { CubeLeft } from '../Svgs/CubeLeft'
import { CubeRight } from '../Svgs/CubeRight'
import { CubeTop } from '../Svgs/CubeTop'
import { twMerge } from 'tailwind-merge'

export const CosCubeSpinner = (props: PropsWithClassName) => {
  const { className } = props

  return (
    // The size of container must be equal to the size of dots.
    <div
      className={twMerge(
        'relative inline size-[30px] text-functional-text',
        className,
      )}
    >
      <CubeLeft className="absolute animate-cos-cube-spinner-vector-0" />
      <CubeTop className="absolute animate-cos-cube-spinner-vector-1" />
      <CubeRight className="absolute animate-cos-cube-spinner-vector-2" />
    </div>
  )
}
