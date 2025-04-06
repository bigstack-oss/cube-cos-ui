import { SideBarBlock } from './SideBarBlock'
import CubeCOSLogo from '../../assets/cubecos_full_logo.svg?react'
import { cloneElement, PropsWithChildren, ReactElement } from 'react'

export type SideBarTitleProps = {
  LogoContainer?: ReactElement<PropsWithChildren>
}

const SideBarTitle = (props: SideBarTitleProps) => {
  const { LogoContainer } = props

  const renderLogo = () => {
    const logoElement = <CubeCOSLogo className="h-[26px]" />

    if (LogoContainer) {
      return cloneElement(LogoContainer, {
        children: logoElement,
      })
    }

    return logoElement
  }

  return (
    <SideBarBlock className="h-[54px] cursor-pointer px-[22px] py-[14px]">
      {renderLogo()}
    </SideBarBlock>
  )
}

export default SideBarTitle
