import { SideBarBlock } from './SideBarBlock'
import CubeCOSLogo from '../../assets/cubecos_full_logo.svg?react'

const SideBarTitle = () => {
  return (
    <SideBarBlock className="h-[54px] cursor-pointer px-[22px] py-[14px]">
      <CubeCOSLogo className="h-[26px]" />
    </SideBarBlock>
  )
}

export default SideBarTitle
