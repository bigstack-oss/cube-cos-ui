import CheckmarkBold from '@cube-frontend/ui-library/icons/monochrome/checkmark_bold.svg?react'
import CircleFill from '@cube-frontend/ui-library/icons/monochrome/circle_fill.svg?react'
import CrossFill from '@cube-frontend/ui-library/icons/monochrome/cross_fill.svg?react'
import { cva } from 'class-variance-authority'
import { ClassValue } from 'class-variance-authority/types'
import { upperFirst } from 'lodash'
import { SvgComponent } from '../CosIcon/CosIcon'
import { CosStatusReactionSkeleton } from './CosStatusReactionSkeleton'
import {
  baseClass,
  computeStatusType,
  Status,
  StatusType,
} from './cosStatusReactionUtils'

export type CosStatusReactionProps = {
  status: Status
  message?: string
}

const statusReaction = cva([baseClass, 'secondary-body3 font-semibold'], {
  variants: {
    type: {
      neutral: 'text-status-neutral',
      success: 'text-status-positive',
      warning: 'text-status-negative',
    } satisfies Record<StatusType, ClassValue>,
  },
})

const iconMap: Record<StatusType, SvgComponent> = {
  neutral: CheckmarkBold,
  success: CircleFill,
  warning: CrossFill,
}

export const CosStatusReaction = (props: CosStatusReactionProps) => {
  const { status, message } = props

  const type = computeStatusType(status)

  const Icon = iconMap[type]

  return (
    <div className={statusReaction({ type })}>
      <Icon className="icon-md-sm shrink-0" />
      <span>{message || upperFirst(status)}</span>
    </div>
  )
}

CosStatusReaction.Skeleton = CosStatusReactionSkeleton
