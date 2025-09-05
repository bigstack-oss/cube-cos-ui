import { useSyncedRef } from '@cube-frontend/utils'
import { useCallback, useState } from 'react'
import {
  Md5ChecksumPair,
  Md5FileNamePair,
  Md5VerificationState,
} from './md5VerificationUtils'

export type UseMd5Verification = {
  verificationState: Md5VerificationState | undefined
  md5FileNamePair: Md5FileNamePair | undefined
  md5ChecksumPair: Md5ChecksumPair | undefined
  verifyMd5: () => Promise<void>
  resetMd5: () => void
}

export type UseMd5VerificationArgs = {
  pkgFileName: string
  checksumFileName: string
  verify: () => Promise<Md5ChecksumPair>
  errorToPair: (error: unknown) => Md5ChecksumPair | undefined
  onVerified: () => unknown
}

export const useMd5Verification = (
  args: UseMd5VerificationArgs,
): UseMd5Verification => {
  const { pkgFileName, checksumFileName, verify, errorToPair, onVerified } =
    args

  const [verificationState, setVerificationState] = useState<
    Md5VerificationState | undefined
  >(undefined)

  const [md5ChecksumPair, setMd5ChecksumPair] = useState<
    Md5ChecksumPair | undefined
  >()

  const [md5FileNamePair, setMd5FileNamePair] = useState<
    Md5FileNamePair | undefined
  >()

  const pkgFileNameRef = useSyncedRef(pkgFileName)
  const checksumFileNameRef = useSyncedRef(checksumFileName)
  const verifyRef = useSyncedRef(verify)
  const errorToPairRef = useSyncedRef(errorToPair)
  const onVerifiedRef = useSyncedRef(onVerified)

  const verifyMd5 = useCallback(async (): Promise<void> => {
    setVerificationState('verifying')
    setMd5FileNamePair({
      pkg: pkgFileNameRef.current,
      checksum: checksumFileNameRef.current,
    })
    setMd5ChecksumPair(undefined)

    try {
      const pair = await verifyRef.current()
      setMd5ChecksumPair(pair)
      setVerificationState('verified')
      onVerifiedRef.current()
    } catch (error) {
      setMd5ChecksumPair(errorToPairRef.current(error))
      setVerificationState('failed')
    }
  }, [
    pkgFileNameRef,
    checksumFileNameRef,
    verifyRef,
    errorToPairRef,
    onVerifiedRef,
  ])

  const resetMd5 = (): void => {
    setVerificationState(undefined)
    setMd5FileNamePair(undefined)
    setMd5ChecksumPair(undefined)
  }

  return {
    verificationState,
    md5FileNamePair,
    md5ChecksumPair,
    verifyMd5,
    resetMd5,
  }
}
