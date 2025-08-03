import { CosButton } from '@cube-frontend/ui-library'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext, useRef } from 'react'
import { mockUploadModelList } from '../mock'

export const UploadModelsButton = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const inputRef = useRef<HTMLInputElement>(null)

  const { mutateResource: uploadModel, isLoading: isUploadingModel } =
    // @ts-expect-error - Temporarily using mock data until backend API is ready
    // TODO: Replace with actual API call when available
    useCosMutationRequest(mockUploadModelList)

  const selectFile = () => {
    inputRef.current?.click()
  }

  const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // @ts-expect-error - Temporarily using mock data until backend API is ready
    await uploadModel({
      dataCenter: dataCenter!.name,
      file,
    })

    event.target.value = ''
  }

  return (
    <>
      <CosButton
        type="secondary"
        usage="text-only"
        size="sm"
        loading={isUploadingModel}
        onClick={selectFile}
      >
        Import model list
      </CosButton>
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        hidden={true}
        onChange={upload}
      />
    </>
  )
}
