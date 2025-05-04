import { useTimeZoneTime } from '../../internal/utils/timeZone/useTimeZoneTime'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { CosTag } from '../CosTag/CosTag'
import { SideBarBlock } from './SideBarBlock'
import { utcTimeZoneToDisplay } from './utils'

type SideBarTimeZoneProps = {
  isLoading: boolean
  utcTimeZone: string | undefined
}

const SideBarTimeZone = (props: SideBarTimeZoneProps) => {
  const { isLoading, utcTimeZone } = props

  const now = useTimeZoneTime(utcTimeZone, 1000)

  const renderTime = () => {
    if (isLoading)
      return <CosSkeleton className="mb-2 h-[15px] w-[156px] rounded-[5px]" />

    return (
      <p className="secondary-body5 mb-2 font-semibold text-functional-text">
        {now.format('YYYY/MM/DD HH:mm:ss')}
      </p>
    )
  }

  const renderTimeZone = () => {
    /**
     * TODO: Replace CosSkeleton with the loading state of `CosTag`
     */
    if (isLoading)
      return <CosSkeleton className="h-[23px] w-[58px] rounded-full" />

    return (
      <CosTag color="primary-blue" variant="stroke">
        {`UTC ${utcTimeZoneToDisplay(utcTimeZone)}`}
      </CosTag>
    )
  }

  return (
    <SideBarBlock className="flex flex-col px-[22px] py-4">
      <p className="primary-body6 mb-1 text-functional-text">
        Data Center Time:
      </p>
      {renderTime()}
      {renderTimeZone()}
    </SideBarBlock>
  )
}

export default SideBarTimeZone
