import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { CosLoadingSpinner, cosTableStyles } from '@cube-frontend/ui-library'
import CheckmarkCircleFill from '@cube-frontend/ui-library/icons/monochrome/checkmark_circle_fill.svg?react'
import CrossFill from '@cube-frontend/ui-library/icons/monochrome/cross_fill.svg?react'
import {
  Md5VerificationState,
  PkgAndChecksumInfo,
} from './md5VerificationUtils'

type Md5VerificationProps = {
  verificationState: Md5VerificationState | undefined
  pkgAndChecksumInfo: PkgAndChecksumInfo | undefined
}

export const Md5Verification = (props: Md5VerificationProps) => {
  const { verificationState, pkgAndChecksumInfo } = props

  const isVerified = verificationState === 'verified'

  const { t } = useTranslation()

  const getDescription = () => {
    if (isVerified) {
      return t('maintenance.update.md5Verification.verifyCompleted')
    }
    return t('maintenance.update.md5Verification.errorMessage.verifyFailed')
  }

  const renderResult = () => {
    if (isVerified) {
      return (
        <div className="secondary-body3 flex items-center gap-x-2 font-semibold text-status-positive">
          <CheckmarkCircleFill className="icon-md-sm" />
          {t('maintenance.update.md5Verification.fileIntegrityVerified')}
        </div>
      )
    }

    return (
      <div className="secondary-body3 flex items-center gap-x-2 font-semibold text-status-negative">
        <CrossFill className="icon-md-sm" />
        {t('maintenance.update.md5Verification.verifyFailed')}
      </div>
    )
  }

  if (verificationState === 'verifying') {
    return (
      <div className="primary-body2 flex items-center gap-x-5 text-functional-text">
        {t('maintenance.update.md5Verification.verifyingMd5Checksum')}
        <CosLoadingSpinner variant="dot45" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-5">
      <div className="primary-body2 text-functional-text">
        {getDescription()}
      </div>
      <table className={cosTableStyles.table()}>
        <thead>
          <tr>
            <th
              className={twMerge(
                cosTableStyles.th({ isTableEmpty: false }),
                'whitespace-nowrap',
              )}
            >
              {t('maintenance.update.md5Verification.fileName')}
            </th>
            <th
              className={twMerge(
                cosTableStyles.th({ isTableEmpty: false }),
                'whitespace-nowrap',
              )}
            >
              {t('maintenance.update.md5Verification.md5Checksum')}
            </th>
            <th className={cosTableStyles.th({ isTableEmpty: false })} />
          </tr>
        </thead>
        <tbody>
          <tr
            className={twMerge(
              cosTableStyles.bodyTr({ isHoverable: false }),
              '[&>td:not(:last-of-type)]:hover:bg-functional-hover-grey',
            )}
          >
            <td
              className={cosTableStyles.td({
                emphasize: true,
                fitContent: true,
              })}
            >
              {pkgAndChecksumInfo?.pkg.fileName}
            </td>
            <td
              className={twMerge(
                cosTableStyles.td(),
                'border-r border-functional-border-divider',
              )}
            >
              {pkgAndChecksumInfo?.pkg.md5Checksum}
            </td>
            <td
              className={twMerge(cosTableStyles.td(), 'rounded-br-[5px]')}
              rowSpan={2}
            >
              {renderResult()}
            </td>
          </tr>
          <tr
            className={twMerge(
              cosTableStyles.bodyTr(),
              '[&:last-of-type>td:last-of-type]:rounded-br-none',
            )}
          >
            <td
              className={cosTableStyles.td({
                emphasize: true,
                fitContent: true,
              })}
            >
              {pkgAndChecksumInfo?.checksum.fileName}
            </td>
            <td className={cosTableStyles.td()}>
              {pkgAndChecksumInfo?.checksum.md5Checksum}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
