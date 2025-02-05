import { useContext } from 'react'
import { SideBarBlock } from './SideBarBlock'
import { UserContext } from '@cube-frontend/web-app/context/UserContext'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'

export type UserNameTagProps = {
  children: string
}

const UserNameTag = (props: UserNameTagProps) => {
  const { children } = props

  return (
    <div className="primary-body5 flex items-center justify-center rounded border border-primary px-[5px] font-medium text-primary">
      {children}
    </div>
  )
}

const SideBarInfoBlock = () => {
  const dataCenter = useContext(DataCenterContext)
  const userInfo = useContext(UserContext)

  return (
    <SideBarBlock className="flex flex-col gap-y-3 px-[22px] py-4">
      <div className="flex items-center justify-between">
        <span className="secondary-body2 font-medium text-functional-text">
          {dataCenter.name}
        </span>
        <UserNameTag>{userInfo.name}</UserNameTag>
      </div>
      <span className="primary-body4 font-medium text-functional-text">
        {dataCenter.version}
      </span>
    </SideBarBlock>
  )
}

export default SideBarInfoBlock
