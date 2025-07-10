import { GetTriggerResponseData } from '@cube-frontend/api'
import { create } from 'zustand'

type EditTriggersStoreState = {
  initialData: GetTriggerResponseData | undefined
}

const createDefaultState = (): EditTriggersStoreState => ({
  initialData: undefined,
})

type EditTriggersStoreActions = {
  setInitialData: (initialData: GetTriggerResponseData) => void
}

export const useEditTriggersStore = create<
  EditTriggersStoreState & EditTriggersStoreActions
>((set) => ({
  ...createDefaultState(),
  setInitialData: (initialData: GetTriggerResponseData) => {
    set({
      initialData,
    })
  },
}))
