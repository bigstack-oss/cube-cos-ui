import { ListTuningResponseDataTuningsInnerLimitationDefault } from '@cube-frontend/api'
import { create } from 'zustand'

type EditTuningsStoreState = {
  initialData: EditTuningsInitialData | undefined
}

export type EditTuningsInitialData = {
  specName: string
} & (
  | {
      value: ListTuningResponseDataTuningsInnerLimitationDefault
      hosts: string[]
    }
  | {
      value?: never
      hosts?: never
    }
)

const createDefaultState = (): EditTuningsStoreState => ({
  initialData: undefined,
})

type EditTuningsStoreActions = {
  setInitialData: (initialData: EditTuningsInitialData) => void
}

export const useEditTuningsStore = create<
  EditTuningsStoreState & EditTuningsStoreActions
>((set) => ({
  ...createDefaultState(),
  setInitialData: (initialData: EditTuningsInitialData) => {
    set({
      initialData,
    })
  },
}))
