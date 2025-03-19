import { PropsWithClassName } from '@cube-frontend/utils'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type SettingsSectionProps = PropsWithClassName & PropsWithChildren

export const SettingsSection = (props: SettingsSectionProps) => {
  const { className, children } = props

  return (
    <div
      className={twMerge(
        [
          'flex flex-col gap-y-6 px-6 py-4',
          'rounded-[5px] bg-grey-0 shadow-[0px_0px_3px_0px_rgba(0,_0,_0,_0.10)]',
        ],
        className,
      )}
    >
      {children}
    </div>
  )
}
