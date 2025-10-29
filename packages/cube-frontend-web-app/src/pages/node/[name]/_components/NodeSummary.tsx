import { range } from 'lodash'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { Node, NodeStatusEnum } from '@cube-frontend/api'
import {
  CosButton,
  CosGeneralPanel,
  CosSkeleton,
  CosStroke,
  CosTag,
  CosTooltip,
} from '@cube-frontend/ui-library'
import Copy from '@cube-frontend/ui-library/icons/monochrome/copy.svg?react'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import {
  humanizeDuration,
  toLicenseExpirationDate,
} from '@cube-frontend/web-app/utils/date'
import { CreateSupportFilesModal } from '../../_components/CreateSupportFilesModal'
import { useCreateSupportFilesModal } from '../../_components/useCreateSupportFilesModal'
import { VipLabel } from '../../_components/VipLabel'
import { ActionMenu } from './ActionMenu'

type NodeSummaryProps = {
  node: Node | undefined
}

export const NodeSummary = (props: NodeSummaryProps) => {
  const { node } = props

  const { t } = useTranslation()

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
        hoverContent={{ message: t('nodes.details.clickToCopy') }}
        clickContent={{ message: t('nodes.details.copied') }}
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
      <CosGeneralPanel>
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2.5">
              <CosSkeleton className="h-6 w-[70px]" />
              <CosSkeleton className="h-6 w-[120px] rounded-full" />
            </div>
            <CosButton disabled={true}>{t('nodes.details.action')}</CosButton>
          </div>
          <CosStroke type="dot" />
          <div className="w-fit rounded-[5px] border border-functional-border-divider">
            {range(0, 6).map(renderSkeletonRow)}
          </div>
        </div>
      </CosGeneralPanel>
    )
  }

  return (
    <CosGeneralPanel
      topic={node.hostname}
      leftSlot={
        <div className="flex items-center gap-x-2.5">
          {node.isVirtualIpOwner && <VipLabel />}
          <CosTag className="h-[23px]" color="blue" variant="filled">
            {node.role}
          </CosTag>
        </div>
      }
      rightSlot={
        <ActionMenu
          node={node}
          onCreateSupportFileClick={openCreateSupportFilesModal}
        />
      }
    >
      <div className="flex flex-col gap-y-6">
        <CosStroke type="dot" />
        {node.status === NodeStatusEnum.Up && (
          <table className="w-fit min-w-[560px] border-separate border-spacing-0">
            <tbody>
              {renderRow(t('nodes.details.cpuSpec'), node.cpuSpec)}
              {renderRow(
                t('nodes.details.memorySpec'),
                toReadableSizeString(node.memory.totalMiB, 'MiB'),
              )}
              {renderRow(
                t('nodes.details.upTime'),
                humanizeDuration(t, node.uptimeSeconds),
              )}
              {renderRow(
                t('nodes.details.licenseExpiration'),
                toLicenseExpirationDate(node.license, t, { includeTime: true }),
              )}
              {renderRow(
                t('nodes.details.managementIp'),
                <div className="flex items-center gap-x-5">
                  <span>{node.managementIP}</span>
                  {renderCopyButton(node.managementIP)}
                </div>,
              )}
              {renderRow(
                t('nodes.details.storageIp'),
                <div className="flex items-center gap-x-5">
                  <span>{node.storageIP}</span>
                  {renderCopyButton(node.storageIP)}
                </div>,
              )}
            </tbody>
          </table>
        )}
        {!!node && (
          <CreateSupportFilesModal
            isOpen={isCreateSupportFilesModalOpen}
            selectedNodes={[node]}
            comments={comments}
            onCommentsChange={onCommentsChange}
            onCloseClick={closeCreateSupportFilesModal}
          />
        )}
      </div>
    </CosGeneralPanel>
  )
}
