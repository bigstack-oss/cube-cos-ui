import { SideBarBlock } from './SideBarBlock'

const SideBarFooter = () => {
  return (
    <SideBarBlock className="flex flex-1 flex-col justify-end py-4">
      <div className="primary-body5 flex h-[21px] cursor-pointer items-center px-[22px] text-functional-text">
        CubeCMP
      </div>
      <div className="primary-body5 flex h-[21px] cursor-pointer items-center px-[22px] text-functional-text">
        Help
      </div>
      <div className="flex h-[21px] items-center px-[22px] text-[9px] text-functional-text-light">
        Copyright©Bigstack
      </div>
    </SideBarBlock>
  )
}

export default SideBarFooter
