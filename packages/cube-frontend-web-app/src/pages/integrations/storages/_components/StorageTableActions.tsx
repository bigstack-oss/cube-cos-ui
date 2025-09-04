import { CreateStorageButton } from './CreateStorageButton'
import { GotoModelListButton } from './GotoModelListButton'

export const StorageTableActions = () => {
  return (
    <div className="flex items-center gap-x-2">
      <GotoModelListButton />
      <CreateStorageButton />
    </div>
  )
}
