import { CubeLeft } from '../Svgs/CubeLeft'
import { CubeRight } from '../Svgs/CubeRight'
import { CubeTop } from '../Svgs/CubeTop'

export const CosCubeSpinner = () => {
  return (
    // The size of container must be equal to the size of dots.
    <div className="relative inline size-[30px] text-functional-text">
      <CubeLeft className="absolute animate-cos-cube-spinner-vector-0" />
      <CubeTop className="absolute animate-cos-cube-spinner-vector-1" />
      <CubeRight className="absolute animate-cos-cube-spinner-vector-2" />
    </div>
  )
}
