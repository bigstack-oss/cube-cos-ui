import { useEffect, useRef, useState } from 'react'
import { BatchLicenseAttachmentTableRow } from './LicenseAttachmentTable'

const MESSAGE_TIMEOUT = 2 * 1000

export const useCopySerialNumber = (
  selectedLicenseAttachments: BatchLicenseAttachmentTableRow[],
) => {
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const copySuccessTimeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  )

  const copySerialNumber = () => {
    const copyText = selectedLicenseAttachments
      .map((licenseAttachment) => licenseAttachment.serialNumber)
      .join(',')
    navigator.clipboard.writeText(copyText)

    setShowCopySuccess(true)

    if (copySuccessTimeoutIdRef.current) {
      clearTimeout(copySuccessTimeoutIdRef.current)
    }

    copySuccessTimeoutIdRef.current = setTimeout(() => {
      setShowCopySuccess(false)
    }, MESSAGE_TIMEOUT)
  }

  useEffect(() => {
    return () => {
      if (copySuccessTimeoutIdRef.current) {
        clearTimeout(copySuccessTimeoutIdRef.current)
      }
    }
  }, [])

  return {
    showCopySuccess,
    copySerialNumber,
  }
}
