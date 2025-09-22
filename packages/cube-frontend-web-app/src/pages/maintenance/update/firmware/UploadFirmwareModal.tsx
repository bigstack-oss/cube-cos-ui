import { CosModal, CosStroke, CosUpload } from '@cube-frontend/ui-library'
import { firmwaresApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { HttpStatusCode, isAxiosError } from 'axios'
import { useContext, useEffect, useId, useMemo } from 'react'
import { Md5Verification } from '../_components/Md5Verification'
import { PkgAndChecksumInfo } from '../_components/md5VerificationUtils'
import { useFileUpload } from '../_components/useFileUpload'
import { useScrollToMd5Verification } from '../_components/useScrollToMd5Verification'
import { checksumFileExtensions } from '../maintenanceUpdateUtils'
import { useFirmwareMd5Verification } from './useFirmwareMd5Verification'

type UploadFirmwareModalProps = {
  isOpen: boolean
  onClose: () => void
  onMd5Verified: () => Promise<unknown>
}

export const UploadFirmwareModal = (props: UploadFirmwareModalProps) => {
  const { isOpen, onClose, onMd5Verified } = props

  const { dataCenter } = useContext(DataCenterContext)

  const pkgInputId = useId()
  const checksumInputId = useId()

  const pkgFileUpload = useFileUpload({
    request: async (file, config) => {
      await firmwaresApi.uploadFirmware(
        {
          dataCenter: dataCenter!.name,
          file: file.name,
          body: file,
        },
        config,
      )
    },
    errorToMessage: (error) => {
      if (!error) return undefined

      if (isAxiosError(error) && error.status == HttpStatusCode.Conflict) {
        // TODO: show error message based on business error code in error API response when it's implemented.
        return 'A duplicate Firmware ID was found, or an MD5 checksum is being verified.'
      }

      return 'Unknown error occurred, please try again.'
    },
  })

  const checksumFileUpload = useFileUpload({
    request: async (file, config) => {
      await firmwaresApi.uploadFirmwareMd5Sum(
        {
          dataCenter: dataCenter!.name,
          body: file,
        },
        config,
      )
    },
    errorToMessage: (error) => {
      if (!error) return undefined

      if (isAxiosError(error) && error.status == HttpStatusCode.Conflict) {
        // TODO: show error message based on business error code in error API response when it's implemented.
        return 'An MD5 checksum is being verified, or a firmware upload is in progress.'
      }

      return 'Unknown error occurred, please try again.'
    },
  })

  const {
    verificationState,
    md5FileNamePair,
    md5ChecksumPair,
    verifyMd5,
    resetMd5,
  } = useFirmwareMd5Verification({
    pkgFileName: pkgFileUpload.fileName,
    checksumFileName: checksumFileUpload.fileName,
    onVerified: onMd5Verified,
  })

  useEffect(() => {
    if (pkgFileUpload.isUploaded && checksumFileUpload.isUploaded) {
      verifyMd5()
    }
  }, [pkgFileUpload.isUploaded, checksumFileUpload.isUploaded, verifyMd5])

  const { modalBodyRef } = useScrollToMd5Verification(verificationState)

  const pkgAndChecksumInfo = useMemo<PkgAndChecksumInfo | undefined>(() => {
    if (!md5FileNamePair || !md5ChecksumPair) return undefined

    const { pkg: pkgFileName, checksum: checksumFileName } = md5FileNamePair
    const { pkgMd5Checksum, expectedMd5Checksum } = md5ChecksumPair

    return {
      pkg: {
        fileName: pkgFileName,
        md5Checksum: pkgMd5Checksum,
      },
      checksum: {
        fileName: checksumFileName,
        md5Checksum: expectedMd5Checksum ?? '',
      },
    }
  }, [md5FileNamePair, md5ChecksumPair])

  const isMd5Verifying = verificationState === 'verifying'
  const isMd5ChecksumVerified = verificationState === 'verified'

  const isUploading =
    pkgFileUpload.isUploading || checksumFileUpload.isUploading

  const isUploaded = pkgFileUpload.isUploaded || checksumFileUpload.isUploaded

  const onCancelClick = (): void => {
    if (!isMd5ChecksumVerified) {
      if (isUploading) {
        if (
          !confirm(
            'An upload is in progress. Do you wish to cancel the upload?',
          )
        ) {
          return
        }
        pkgFileUpload.abort()
        checksumFileUpload.abort()
      } else if (isUploaded) {
        if (
          !confirm(
            'Some of the files have been uploaded. Do you wish to cancel the upload?',
          )
        ) {
          return
        }
      }
    }

    pkgFileUpload.reset({ checkUploading: false })
    checksumFileUpload.reset({ checkUploading: false })
    resetMd5()

    onClose()
  }

  useEffect(() => {
    const onBeforeUnload = (e: Event): boolean => {
      if (isUploading || isUploaded) {
        e.preventDefault()
        // Return truthy value to support legacy browsers.
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
        return true
      }
      return false
    }

    window.addEventListener('beforeunload', onBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [isUploading, isUploaded])

  const onAbortClick = (abort: () => void): void => {
    if (confirm('Do you wish to cancel the upload?')) {
      abort()
    }
  }

  const renderUploadSections = () => {
    return (
      <>
        <div className="flex flex-col items-start gap-y-3">
          <label htmlFor={pkgInputId} className="primary-body4 font-semibold">
            Upload Firmware
          </label>
          <CosUpload
            className="w-full"
            buttonText="Upload from computer"
            inputId={pkgInputId}
            accept=".pkg"
            isUploading={pkgFileUpload.isUploading}
            disabled={isMd5Verifying || isMd5ChecksumVerified}
            onFileChange={pkgFileUpload.start}
          >
            {pkgFileUpload.isUploading && (
              <CosUpload.ProgressBar
                fileName={pkgFileUpload.fileName}
                progress={pkgFileUpload.progress}
                onAbortClick={() => onAbortClick(pkgFileUpload.abort)}
              />
            )}
            {pkgFileUpload.isUploaded && (
              <CosUpload.File onCancel={pkgFileUpload.reset}>
                {pkgFileUpload.fileName}
              </CosUpload.File>
            )}
            {!!pkgFileUpload.errorMessage && (
              <CosUpload.Error
                message={pkgFileUpload.errorMessage}
                onClose={pkgFileUpload.clearError}
              />
            )}
          </CosUpload>
        </div>
        <div className="flex flex-col items-start gap-y-3">
          <label
            htmlFor={checksumInputId}
            className="primary-body4 font-semibold"
          >
            Upload Checksum
          </label>
          <CosUpload
            className="w-full"
            buttonText="Choose checksum"
            inputId={checksumInputId}
            accept={checksumFileExtensions}
            isUploading={checksumFileUpload.isUploading}
            disabled={isMd5Verifying || isMd5ChecksumVerified}
            onFileChange={checksumFileUpload.start}
          >
            {checksumFileUpload.isUploading && (
              <CosUpload.ProgressBar
                fileName={checksumFileUpload.fileName}
                progress={checksumFileUpload.progress}
                onAbortClick={() => onAbortClick(checksumFileUpload.abort)}
              />
            )}
            {checksumFileUpload.isUploaded && (
              <CosUpload.File onCancel={checksumFileUpload.reset}>
                {checksumFileUpload.fileName}
              </CosUpload.File>
            )}
            {!!checksumFileUpload.errorMessage && (
              <CosUpload.Error
                message={checksumFileUpload.errorMessage}
                onClose={checksumFileUpload.clearError}
              />
            )}
          </CosUpload>
        </div>
      </>
    )
  }

  return (
    <CosModal
      title="Upload Firmware"
      isOpen={isOpen}
      actionText="Done"
      actionButtonProps={{
        disabled: !isMd5ChecksumVerified,
      }}
      isCancelButtonVisible={!isMd5ChecksumVerified}
      bodyRef={modalBodyRef}
      onActionClick={onCancelClick}
      onCloseClick={onCancelClick}
    >
      <div className="flex flex-col gap-y-5">
        {!isMd5ChecksumVerified && renderUploadSections()}
        {(isMd5Verifying || verificationState === 'failed') && (
          <CosStroke type="dot" />
        )}
        {!!verificationState && (
          <Md5Verification
            verificationState={verificationState}
            pkgAndChecksumInfo={pkgAndChecksumInfo}
          />
        )}
      </div>
    </CosModal>
  )
}
