import { NodeLicenseCurrentStatus } from '@cube-frontend/api/sdk'
import { respectTz } from '@cube-frontend/utils'
import dayjs from 'dayjs'
import { describe, expect, it, suite } from 'vitest'
import { formatLicenseDate, toLicenseExpirationDate } from './date'

dayjs.extend(respectTz)

describe('Date Utils', () => {
  suite('formatLicenseDate', () => {
    const sampleDate = '2025-07-02T12:34:56.789-03:00'

    it('returns `YYYY-MM-DD` when options is not provided', () => {
      expect(formatLicenseDate(sampleDate)).toEqual('2025/07/02')
    })

    it('returns `YYYY-MM-DD` when the includeTime option is not provided', () => {
      expect(formatLicenseDate(sampleDate, {})).toEqual('2025/07/02')
    })

    it('returns `YYYY-MM-DD` when the includeTime option is false', () => {
      expect(
        formatLicenseDate(sampleDate, {
          includeTime: false,
        }),
      ).toEqual('2025/07/02')
    })

    it('returns `YYYY-MM-DD HH:mm` when the includeTime option is true', () => {
      expect(
        formatLicenseDate(sampleDate, {
          includeTime: true,
        }),
      ).toEqual('2025/07/02 12:34')
    })
  })

  suite('toLicenseExpirationDate', () => {
    const sampleExpiryDate = '2025-07-02T12:34:56.789+08:00'

    const createLicense = (
      status: NodeLicenseCurrentStatus,
      expiryDate: string,
    ): Parameters<typeof toLicenseExpirationDate>[0] => {
      return {
        status: {
          current: status,
          isExpiring: false,
        },
        expiry: {
          date: expiryDate,
          days: 123,
        },
      }
    }

    it('returns `YYYY-MM-DD` when options is not provided', () => {
      const license = createLicense(
        NodeLicenseCurrentStatus.Valid,
        sampleExpiryDate,
      )
      expect(toLicenseExpirationDate(license)).toEqual('2025/07/02')
    })

    it('returns `YYYY-MM-DD` when the includeTime option is not provided', () => {
      const license = createLicense(
        NodeLicenseCurrentStatus.Valid,
        sampleExpiryDate,
      )
      expect(toLicenseExpirationDate(license, {})).toEqual('2025/07/02')
    })

    it('returns `YYYY-MM-DD` when the includeTime option is false', () => {
      const license = createLicense(
        NodeLicenseCurrentStatus.Valid,
        sampleExpiryDate,
      )
      expect(
        toLicenseExpirationDate(license, {
          includeTime: false,
        }),
      ).toEqual('2025/07/02')
    })

    it('returns `YYYY-MM-DD HH:mm` when the includeTime option is true', () => {
      const license = createLicense(
        NodeLicenseCurrentStatus.Valid,
        sampleExpiryDate,
      )
      expect(
        toLicenseExpirationDate(license, {
          includeTime: true,
        }),
      ).toEqual('2025/07/02 12:34')
    })

    it('returns empty string when expiry.date is empty', () => {
      const license = createLicense(NodeLicenseCurrentStatus.Valid, '')
      expect(toLicenseExpirationDate(license)).toEqual('')
    })

    it("returns 'Unlicense' for license in unlicense status", () => {
      const license = createLicense(
        NodeLicenseCurrentStatus.Unlicense,
        '2025-07-02T12:34:56.789+08:00',
      )
      expect(toLicenseExpirationDate(license)).toEqual('Unlicense')
    })

    it('returns empty string when expiry.date is empty', () => {
      const license = createLicense(NodeLicenseCurrentStatus.Valid, '')
      expect(toLicenseExpirationDate(license)).toEqual('')
    })
  })
})
