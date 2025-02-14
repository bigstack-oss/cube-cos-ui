import { twJoin, twMerge } from 'tailwind-merge'
import {
  SideBarComboboxOption,
  SideBarComboboxOptionProps,
} from '../../../components/CosSideBar/SideBarComboboxOption'

const sideBarOptionRowTextClass = twJoin('primary-body2')

const sideBarOptionRowClass = twMerge(
  'grid grid-cols-[80px,repeat(2,200px)] items-center justify-items-center gap-3',
)

const SideBarOptionRowHeader = () => {
  return (
    <div className={sideBarOptionRowClass}>
      <h3 />
      <h3 className={sideBarOptionRowTextClass}>Regular</h3>
      <h3 className={sideBarOptionRowTextClass}>Notification</h3>
    </div>
  )
}

type SideBarOptionRowProps = {
  title: string
  children: React.ReactNode
}

const SideBarOptionRow = (props: SideBarOptionRowProps) => {
  const { title, children } = props

  return (
    <div className={sideBarOptionRowClass}>
      <span className="primary-body2 justify-self-start">{title}</span>
      {children}
    </div>
  )
}

export type SideBarOptionsBlockProps = {
  option: SideBarComboboxOptionProps
}

export const SideBarOptionsGrid = (props: SideBarOptionsBlockProps) => {
  const { option } = props

  return (
    <div className="flex w-fit flex-col gap-y-5 rounded-lg bg-white p-4">
      <SideBarOptionRowHeader />
      <SideBarOptionRow title="Default">
        <SideBarComboboxOption
          {...option}
          isSelected={false}
          notificationCount={0}
        />
        <SideBarComboboxOption
          {...option}
          isSelected={false}
          notificationCount={2}
        />
      </SideBarOptionRow>
      <SideBarOptionRow title="Selected">
        <SideBarComboboxOption
          {...option}
          isSelected={true}
          notificationCount={0}
        />
        <SideBarComboboxOption
          {...option}
          isSelected={true}
          notificationCount={2}
        />
      </SideBarOptionRow>
    </div>
  )
}
