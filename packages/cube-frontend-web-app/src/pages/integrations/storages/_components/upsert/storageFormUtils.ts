import { z, ZodFormattedError } from 'zod'
import {
  GetIntegrationStorageResponseData,
  ListIntegrationStorageModelsResponseDataInner,
} from '@cube-frontend/api'

export type StorageFormError = ZodFormattedError<StorageForm>

const keyValuePairSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
})

export type keyValuePairSchemaType = z.infer<typeof keyValuePairSchema>

const extraConfigFilesFormSchema = z.object({
  name: z.string().min(1),
  content: z.string(),
  localFileName: z.string().min(1).optional(),
})

export type ExtraConfigFilesForm = z.infer<typeof extraConfigFilesFormSchema>

export const storageFormSchema = z.object({
  name: z.string().min(1, 'Storage name is required'),
  driver: z.string().min(1),
  storage: z.object({
    service: z.object({
      driverSection: z.array(keyValuePairSchema),
      extraSettings: z.array(
        z.object({
          sectionHeader: z.string(),
          settings: z.array(keyValuePairSchema),
        }),
      ),
      extraConfigFiles: z.array(extraConfigFilesFormSchema),
    }),
    volumeType: z.object({
      settings: z.array(keyValuePairSchema),
    }),
    image: z.object({
      useMultipath: z.boolean(),
      forceMultipath: z.boolean(),
    }),
  }),
})

export type StorageForm = z.infer<typeof storageFormSchema>

export const validateStorageForm = (
  storage: StorageForm,
): StorageFormError | undefined => {
  return storageFormSchema.safeParse(storage).error?.format()
}

const getName = (
  initialStorage: GetIntegrationStorageResponseData | undefined,
  currentName: string,
) => {
  if (initialStorage) {
    return initialStorage.name
  }

  return currentName
}

const mergePairsByBaseKeys = (
  basePairs: keyValuePairSchemaType[],
  existingPairs: keyValuePairSchemaType[],
): keyValuePairSchemaType[] => {
  const existingValuesMap = new Map(
    existingPairs.map((pair) => [pair.key, pair.value]),
  )

  return basePairs.map((basePair) => ({
    ...basePair,
    key: basePair.key,
    value: existingValuesMap.get(basePair.key) ?? basePair.value,
  }))
}

const getInitialDriverSection = (
  baseModel: ListIntegrationStorageModelsResponseDataInner | undefined,
  initialStorage: GetIntegrationStorageResponseData | undefined,
) => {
  if (!baseModel) {
    return []
  }

  if (!initialStorage) {
    return baseModel.storage.service.driverSection
  }

  return mergePairsByBaseKeys(
    baseModel.storage.service.driverSection,
    initialStorage.storage.service.driverSection,
  )
}

const getInitialExtraSettings = (
  baseModel: ListIntegrationStorageModelsResponseDataInner | undefined,
  initialStorage: GetIntegrationStorageResponseData | undefined,
) => {
  if (!baseModel) {
    return []
  }

  if (!initialStorage) {
    return baseModel.storage.service.extraSettings
  }

  const storageSectionsMap = new Map(
    initialStorage.storage.service.extraSettings.map((section) => [
      section.sectionHeader,
      section,
    ]),
  )

  return baseModel.storage.service.extraSettings.map((baseModelSection) => {
    const initialStorageSectionSettings =
      storageSectionsMap.get(baseModelSection.sectionHeader)?.settings || []

    return {
      sectionHeader: baseModelSection.sectionHeader,
      settings: mergePairsByBaseKeys(
        baseModelSection.settings,
        initialStorageSectionSettings,
      ),
    }
  })
}

const getInitialExtraConfigFiles = (
  baseModel: ListIntegrationStorageModelsResponseDataInner | undefined,
) => {
  // Only model is used here since extra config files may contains sensitive info,
  // and backend does not return them when fetching existing storage,
  // so every time user need to re-upload the files when editing
  if (baseModel) {
    return baseModel.storage.service.extraConfigFiles.map((file) => ({
      name: file.name,
      content: file.content,
      localFileName: undefined,
    }))
  }

  return []
}

const getInitialVolumeTypeSection = (
  baseModel: ListIntegrationStorageModelsResponseDataInner | undefined,
  initialStorage: GetIntegrationStorageResponseData | undefined,
) => {
  if (!baseModel) {
    return { settings: [] }
  }

  if (!initialStorage) {
    return {
      settings: baseModel.storage.volumeType.settings,
    }
  }

  return {
    settings: mergePairsByBaseKeys(
      baseModel.storage.volumeType.settings,
      initialStorage.storage.volumeType.settings,
    ),
  }
}

const getInitialImageSection = (
  baseModel: ListIntegrationStorageModelsResponseDataInner | undefined,
  initialStorage: GetIntegrationStorageResponseData | undefined,
) => {
  if (initialStorage) {
    return {
      useMultipath: initialStorage.storage.image.useMultipath,
      forceMultipath: initialStorage.storage.image.forceMultipath,
    }
  }

  if (baseModel) {
    return {
      useMultipath: baseModel.storage.image.useMultipath,
      forceMultipath: baseModel.storage.image.forceMultipath,
    }
  }

  return {
    useMultipath: false,
    forceMultipath: false,
  }
}

export type GetInitialStorageFormProps = {
  initialStorage: GetIntegrationStorageResponseData | undefined
  currentName: string
  selectedModel: ListIntegrationStorageModelsResponseDataInner | undefined
}

export const getInitialStorageForm = (
  props: GetInitialStorageFormProps,
): StorageForm => {
  const { initialStorage, currentName, selectedModel } = props

  const name = getName(initialStorage, currentName)
  const driver = initialStorage?.driver ?? selectedModel?.driver ?? ''
  const driverSection = getInitialDriverSection(selectedModel, initialStorage)
  const extraSettings = getInitialExtraSettings(selectedModel, initialStorage)
  const extraConfigFiles = getInitialExtraConfigFiles(selectedModel)
  const volumeType = getInitialVolumeTypeSection(selectedModel, initialStorage)
  const image = getInitialImageSection(selectedModel, initialStorage)

  return {
    name,
    driver,
    storage: {
      service: {
        driverSection,
        extraSettings,
        extraConfigFiles,
      },
      volumeType,
      image,
    },
  }
}
