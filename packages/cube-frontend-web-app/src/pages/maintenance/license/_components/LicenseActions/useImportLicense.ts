import {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  LicensesApiImportClusterLicenseRequest,
  VerifyLicenseResponseData,
} from '@cube-frontend/api'
import { licenseApi } from '@cube-frontend/web-app/api/cosApi'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { CosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'

const MESSAGE_TIMEOUT = 5 * 1000

export type UseImportLicenseOptions = {
  onImportLicenseSuccess: () => void
}

export const useImportLicense = (options: UseImportLicenseOptions) => {
  const { onImportLicenseSuccess } = options

  const { dataCenter } = useContext(DataCenterContext)

  const {
    mutateResource: verifyLicense,
    isLoading: isVerifyingLicenseFile,
    errorState: verifyLicenseErrorState,
  } = useCosMutationRequest(licenseApi.verifyLicense)

  const {
    mutateResource: importLicense,
    isLoading: isUploadingLicense,
    errorState: importLicenseErrorState,
  } = useCosMutationRequest(
    licenseApi.importClusterLicense as (
      params: LicensesApiImportClusterLicenseRequest,
    ) => Promise<CosApiResponse<undefined>>,
  )

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [licenseVerifyInfo, setLicenseVerifyInfo] =
    useState<VerifyLicenseResponseData>()

  const handleImportLicenseButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const licenseFile = e.target.files?.[0]
    if (!licenseFile) {
      return
    }

    try {
      const licenseVerifyInfo = await verifyLicense({
        dataCenter: dataCenter!.name,
        license: licenseFile,
      })

      setLicenseVerifyInfo(licenseVerifyInfo)
    } catch {
      clearFileInput()
    }
  }

  const clearFileInput = () => {
    if (fileInputRef.current?.value) {
      fileInputRef.current.value = ''
    }
  }

  const closeImportLicenseModal = () => {
    setLicenseVerifyInfo(undefined)
    clearFileInput()
  }

  const [showImportSuccessText, setShowImportSuccessText] = useState(false)

  const importSuccessTimeoutIdRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null)

  useEffect(() => {
    if (importSuccessTimeoutIdRef.current) {
      clearTimeout(importSuccessTimeoutIdRef.current)
    }
  }, [])

  const handleImportLicense = async () => {
    const licenseFile = fileInputRef.current?.files?.[0]
    if (!licenseFile) {
      return
    }

    try {
      await importLicense({
        dataCenter: dataCenter!.name,
        license: licenseFile,
      })

      onImportLicenseSuccess()

      setShowImportSuccessText(true)
      if (importSuccessTimeoutIdRef.current) {
        clearTimeout(importSuccessTimeoutIdRef.current)
      }

      importSuccessTimeoutIdRef.current = setTimeout(() => {
        setShowImportSuccessText(false)
      }, MESSAGE_TIMEOUT)
    } finally {
      closeImportLicenseModal()
    }
  }

  return {
    fileInputRef,
    isVerifyingLicenseFile,
    verifyLicenseErrorState,
    isUploadingLicense,
    importLicenseErrorState,
    handleImportLicenseButtonClick,
    handleFileChange,
    closeImportLicenseModal,
    handleImportLicense,
    licenseVerifyInfo,
    showImportSuccessText,
  }
}
