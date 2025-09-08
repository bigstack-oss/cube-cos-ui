import { PropsWithChildren } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { CosPaginationItemWrap } from './CosPaginationItemWrap'

const paginationItemButton = cva(
  [
    'flex size-7 shrink-0 items-center justify-center rounded-full',
    'transition-colors duration-300 ease-in-out',
  ],
  {
    variants: {
      isActive: {
        true: '',
        false: '',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        isActive: false,
        disabled: false,
        class: 'bg-grey-0 text-functional-text hover:bg-functional-hover-grey',
      },
      {
        isActive: true,
        disabled: false,
        class:
          'bg-functional-hover-secondary font-semibold text-functional-text',
      },
      { disabled: true, class: 'text-functional-disable-text' },
    ],
  },
)

type CosPaginationItemButtonProps = PropsWithChildren<{
  isMinimal: boolean
  onClick: () => void
}> &
  (
    | {
        type: 'number'
        isActive: boolean
      }
    | {
        type: 'icon'
        disabled: boolean
      }
  )

export const CosPaginationItemButton = (
  props: CosPaginationItemButtonProps,
) => {
  const { isMinimal, type, children, onClick } = props

  const isActive =
    type === 'number'
      ? ((props as Extract<CosPaginationItemButtonProps, { type: 'number' }>)
          .isActive ?? false)
      : false

  const disabled =
    type === 'icon'
      ? ((props as Extract<CosPaginationItemButtonProps, { type: 'icon' }>)
          .disabled ?? false)
      : false

  return (
    <CosPaginationItemWrap isMinimal={isMinimal}>
      <button
        type="button"
        className={twMerge(paginationItemButton({ isActive, disabled }))}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </CosPaginationItemWrap>
  )
}
