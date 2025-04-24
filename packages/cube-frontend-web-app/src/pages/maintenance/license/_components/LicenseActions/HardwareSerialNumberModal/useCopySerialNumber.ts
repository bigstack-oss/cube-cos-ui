import { Node } from '@cube-frontend/api'
import { useState, useRef, useEffect } from 'react'

const MESSAGE_TIMEOUT = 2 * 1000

export const useCopySerialNumber = (selectedNodes: Node[]) => {
  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const copySuccessTimeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  )

  const copySerialNumber = () => {
    const copyText = selectedNodes.map((node) => node.license.serial).join(', ')
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
    if (copySuccessTimeoutIdRef.current) {
      clearTimeout(copySuccessTimeoutIdRef.current)
    }
  }, [])

  return {
    showCopySuccess,
    copySerialNumber,
  }
}
