import { ListTuningResponseDataTuningsInnerLimitationDefault } from '@cube-frontend/api'
import { create } from 'zustand'

type EditTuningsStoreState = {
  defaultData: EditTuningsDefaultData | undefined
}

export type EditTuningsDefaultData = {
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
  defaultData: undefined,
})

type EditTuningsStoreActions = {
  setDefaultData: (defaultData: EditTuningsDefaultData) => void
}

export const useEditTuningsStore = create<
  EditTuningsStoreState & EditTuningsStoreActions
>((set) => ({
  ...createDefaultState(),
  setDefaultData: (defaultData: EditTuningsDefaultData) => {
    set({
      defaultData,
    })
  },
}))
