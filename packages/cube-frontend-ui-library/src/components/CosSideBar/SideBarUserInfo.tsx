import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { SideBarBlock } from './SideBarBlock'
import { UserNameTag } from './UserNameTag'

export type SideBarUserInfoProps = {
  /**
   * @default false
   */
  isLoading?: boolean
  dataCenter:
    | {
        name: string
        version: string
      }
    | undefined
  username: string | undefined
}

const SideBarUserInfo = (props: SideBarUserInfoProps) => {
  const { isLoading = false, dataCenter, username } = props

  const renderDataCenter = () => {
    if (isLoading) {
      return <CosSkeleton className="h-[18px] w-[38px]" />
    }
    return (
      <span className="secondary-body2 font-medium text-functional-text">
        {dataCenter?.name || '-'}
      </span>
    )
  }

  const renderUserName = () => {
    if (isLoading) {
      return <CosSkeleton className="h-[18px] w-[42px]" />
    }
    return <UserNameTag>{username || '-'}</UserNameTag>
  }

  const renderVersion = () => {
    if (isLoading) {
      return <CosSkeleton className="h-[16px] w-[156px]" />
    }
    return (
      <span className="primary-body4 font-medium text-functional-text">
        {dataCenter?.version || '-'}
      </span>
    )
  }

  return (
    <SideBarBlock className="flex flex-col gap-y-3 px-[22px] py-4">
      <div className="flex items-center justify-between">
        {renderDataCenter()}
        {renderUserName()}
      </div>
      {renderVersion()}
    </SideBarBlock>
  )
}

export default SideBarUserInfo
