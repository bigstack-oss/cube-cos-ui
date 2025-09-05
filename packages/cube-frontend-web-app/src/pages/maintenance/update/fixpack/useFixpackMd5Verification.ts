import { VerifyFixpackMd5Sum400ResponseData } from '@cube-frontend/api'
import { fixpacksApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import {
  isCosApiResponse,
  isCosRequestError,
} from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { isAxiosError } from 'axios'
import { useContext } from 'react'
import { Md5ChecksumPair } from '../_components/md5VerificationUtils'
import {
  UseMd5Verification,
  useMd5Verification,
  UseMd5VerificationArgs,
} from '../_components/useMd5Verification'

type UseFixpackMd5VerificationArgs = Pick<
  UseMd5VerificationArgs,
  'pkgFileName' | 'checksumFileName' | 'onVerified'
>

export const useFixpackMd5Verification = (
  args: UseFixpackMd5VerificationArgs,
): UseMd5Verification => {
  const { dataCenter } = useContext(DataCenterContext)

  const { mutateResource: callVerifyApi } = useCosMutationRequest(
    fixpacksApi.verifyFixpackMd5Sum,
  )

  const verify = async (): Promise<Md5ChecksumPair> => {
    const { fixpackMd5, expectedMd5 } = await callVerifyApi({
      dataCenter: dataCenter!.name,
    })

    return {
      pkgMd5Checksum: fixpackMd5!,
      expectedMd5Checksum: expectedMd5,
    }
  }

  const errorToPair = (error: unknown) => {
    if (!isCosRequestError(error)) {
      return undefined
    }

    const nativeError = error.native

    if (!isAxiosError(nativeError) || !isCosApiResponse(nativeError.response)) {
      return undefined
    }

    const errorData = nativeError.response.data.data as
      | VerifyFixpackMd5Sum400ResponseData
      | undefined

    return {
      pkgMd5Checksum: errorData?.fixpackMd5 ?? '',
      expectedMd5Checksum: errorData?.expectedMd5 ?? '',
    }
  }

  const md5Verification = useMd5Verification({
    verify,
    errorToPair,
    ...args,
  })

  return md5Verification
}
