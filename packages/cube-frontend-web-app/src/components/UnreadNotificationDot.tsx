import { ClassNameValue, twMerge } from 'tailwind-merge'

type UnreadNotificationDotProps = {
  className?: ClassNameValue
}

export const UnreadNotificationDot = (props: UnreadNotificationDotProps) => {
  const { className } = props

  return (
    <span
      className={twMerge(
        'pointer-events-none size-[4.5px] rounded-full bg-cosmos-secondary',
        className,
      )}
    />
  )
}
