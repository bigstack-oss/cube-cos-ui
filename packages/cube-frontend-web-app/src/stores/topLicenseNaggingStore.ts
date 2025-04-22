import { create } from 'zustand'

type TopLicenseNaggingStore = {
  isClosed: boolean
}

type TopLicenseNaggingStoreActions = {
  closeTopLicenseNagging: () => void
  restoreDefault: () => void
}

const defaultState: TopLicenseNaggingStore = {
  isClosed: false,
}

export const useTopLicenseNaggingStore = create<
  TopLicenseNaggingStore & TopLicenseNaggingStoreActions
>((set) => ({
  isClosed: false,
  closeTopLicenseNagging: () => set({ isClosed: true }),
  restoreDefault: () => set(defaultState),
}))
