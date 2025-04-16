import { CosIconText } from '@cube-frontend/ui-library'
import { getLicenseExpiryStatus } from './utils'

export type ExpiryIconTextProps = {
  expiryDays: number
}

export const ExpiryIconText = (props: ExpiryIconTextProps) => {
  const { expiryDays } = props

  const expiryStatus = getLicenseExpiryStatus(expiryDays)
  const expiryStatusDisplay = {
    expired: () => <CosIconText type="error">expired</CosIconText>,
    expiring: () => <CosIconText type="warning">expiring</CosIconText>,
    valid: () => null,
  }

  return expiryStatusDisplay[expiryStatus]()
}
