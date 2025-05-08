import { Node, NodeLicenseCurrentStatus } from '@cube-frontend/api'
import {
  CosButton,
  CosOverflowMenu,
  CosSkeleton,
  CosStroke,
  CosTag,
  CosTooltip,
} from '@cube-frontend/ui-library'
import Copy from '@cube-frontend/ui-library/icons/monochrome/copy.svg?react'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import dayjs from 'dayjs'
import { range } from 'lodash'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { CreateSupportFilesModal } from '../../_components/CreateSupportFilesModal'
import { useCreateSupportFilesModal } from '../../_components/useCreateSupportFilesModal'
import { Panel } from './Panel'

type NodeSummaryProps = {
  node: Node | undefined
}

export const NodeSummary = (props: NodeSummaryProps) => {
  const { node } = props

  const {
    isCreateSupportFilesModalOpen,
    comments,
    onCommentsChange,
    openCreateSupportFilesModal,
    closeCreateSupportFilesModal,
  } = useCreateSupportFilesModal()

  const renderRow = (label: string, content: ReactNode) => {
    return (
      <tr
        className={twMerge(
          '[&:first-of-type>td]:rounded-tr-[5px] [&:first-of-type>th]:rounded-tl-[5px]',
          '[&:last-of-type>td]:rounded-br-[5px] [&:last-of-type>td]:border-b [&:last-of-type>th]:rounded-bl-[5px] [&:last-of-type>th]:border-b',
        )}
      >
        <th
          className={twMerge(
            'w-[120px] whitespace-nowrap px-4 py-2.5 text-left',
            'primary-body4 font-semibold text-functional-text',
            'border-l border-t border-functional-border-divider',
          )}
        >
          {label}
        </th>
        <td
          className={twMerge(
            'primary-body4 w-[440x] px-4 py-2.5 text-functional-text-light',
            'border-r border-t border-functional-border-divider',
          )}
        >
          {content}
        </td>
      </tr>
    )
  }

  const renderCopyButton = (content: string) => {
    const onCopyClick = () => {
      navigator.clipboard.writeText(content)
    }

    return (
      <CosTooltip
        hoverContent={{ message: 'Click to copy' }}
        clickContent={{ message: 'Copied' }}
      >
        <Copy
          className="icon-md cursor-pointer text-functional-text-light"
          onClick={onCopyClick}
        />
      </CosTooltip>
    )
  }

  const renderSkeletonRow = (index: number) => {
    return (
      <div
        key={index}
        className={twMerge(
          'flex items-center gap-x-8 px-4 py-2.5',
          index !== 0 && 'border-t border-t-functional-border-divider',
        )}
      >
        <CosSkeleton className="h-[15px] w-[60px]" />
        <div className="pr-4">
          <CosSkeleton className="h-[16px] w-[300px]" />
        </div>
      </div>
    )
  }

  if (!node) {
    return (
      <Panel className="gap-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2.5">
            <CosSkeleton className="h-6 w-[70px]" />
            <CosSkeleton className="h-6 w-[120px] rounded-full" />
          </div>
          <CosButton disabled={true}>Action</CosButton>
        </div>
        <CosStroke type="dot" />
        <div className="w-fit rounded-[5px] border border-functional-border-divider">
          {range(0, 6).map(renderSkeletonRow)}
        </div>
      </Panel>
    )
  }

  const getLicenseExpiration = (): string => {
    const { status, expiry } = node.license

    if (status.current === NodeLicenseCurrentStatus.Unlicense) {
      return 'Unlicense'
    }

    return dayjs.respectTzOffset(expiry.date).format('YYYY/MM/DD HH:mm')
  }

  return (
    <Panel className="gap-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2.5">
          <span className="primary-h4 text-functional-text">
            {node.hostname}
          </span>
          <CosTag className="h-[23px]" color="blue" variant="filled">
            {node.role}
          </CosTag>
        </div>
        <CosOverflowMenu triggerElement={<CosButton>Action</CosButton>}>
          <CosOverflowMenu.Title>Basic</CosOverflowMenu.Title>
          <CosOverflowMenu.Item
            type="plain"
            title="Create support file"
            onClick={openCreateSupportFilesModal}
          />
        </CosOverflowMenu>
      </div>
      <CosStroke type="dot" />
      <table className="w-fit min-w-[560px] border-separate border-spacing-0">
        <tbody>
          {renderRow('CPU Spec', node.cpuSpec)}
          {renderRow(
            'Memory Spec',
            toReadableSizeString(node.memory.totalMiB, 'MiB'),
          )}
          {renderRow(
            'Up Time',
            dayjs.duration(node.uptimeSeconds, 'seconds').humanize(),
          )}
          {renderRow('COS License Expiration', getLicenseExpiration())}
          {renderRow(
            'Management IP',
            <div className="flex items-center gap-x-5">
              <span>{node.managementIP}</span>
              {renderCopyButton(node.managementIP)}
            </div>,
          )}
          {renderRow(
            'Storage IP',
            <div className="flex items-center gap-x-5">
              <span>{node.storageIP}</span>
              {renderCopyButton(node.storageIP)}
            </div>,
          )}
        </tbody>
      </table>
      {!!node && (
        <CreateSupportFilesModal
          isOpen={isCreateSupportFilesModalOpen}
          selectedNodes={[node]}
          comments={comments}
          onCommentsChange={onCommentsChange}
          onCloseClick={closeCreateSupportFilesModal}
        />
      )}
    </Panel>
  )
}
