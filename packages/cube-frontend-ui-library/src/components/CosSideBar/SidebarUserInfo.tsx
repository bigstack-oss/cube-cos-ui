import { SideBarBlock } from './SideBarBlock'
import { UserNameTag } from './UserNameTag'

export type SideBarUserInfoProps = {
  dataCenter: {
    name: string
    version: string
  }
  username: string
}

const SideBarUserInfo = (props: SideBarUserInfoProps) => {
  const { dataCenter, username } = props

  return (
    <SideBarBlock className="flex flex-col gap-y-3 px-[22px] py-4">
      <div className="flex items-center justify-between">
        <span className="secondary-body2 font-medium text-functional-text">
          {dataCenter.name}
        </span>
        <UserNameTag>{username}</UserNameTag>
      </div>
      <span className="primary-body4 font-medium text-functional-text">
        {dataCenter.version}
      </span>
    </SideBarBlock>
  )
}

export default SideBarUserInfo
