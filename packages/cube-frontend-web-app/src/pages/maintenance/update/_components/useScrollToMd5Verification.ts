import { RefObject, useEffect, useRef } from 'react'
import { Md5VerificationState } from './md5VerificationUtils'

type UseScrollToMd5Verification = {
  modalBodyRef: RefObject<HTMLDivElement | null>
}

export const useScrollToMd5Verification = (
  verificationState: Md5VerificationState | undefined,
): UseScrollToMd5Verification => {
  const modalBodyRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const modalBody = modalBodyRef.current
    if (verificationState && modalBody) {
      modalBody.scrollTo({ behavior: 'smooth', top: modalBody.scrollHeight })
    }
  }, [verificationState])

  return {
    modalBodyRef,
  }
}
