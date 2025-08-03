import { CreateStorageButton } from './CreateStorageButton'
import { UploadModelsButton } from './UploadModelsButton'

export const StorageTableActions = () => {
  return (
    <div className="flex items-center gap-x-2">
      <UploadModelsButton />
      <CreateStorageButton />
    </div>
  )
}
