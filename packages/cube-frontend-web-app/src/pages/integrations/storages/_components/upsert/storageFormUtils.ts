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
  previousStorage: StorageForm | undefined,
) => {
  if (previousStorage?.name) {
    return previousStorage.name
  }

  if (initialStorage) {
    return initialStorage.name
  }
  return ''
}

const calculateInitialFields = (
  initialStorageFields: keyValuePairSchemaType[],
  baseModelFields: keyValuePairSchemaType[],
): keyValuePairSchemaType[] => {
  const initialStorageFieldsMap = new Map(
    initialStorageFields.map((field) => [field.key, field]),
  )

  return baseModelFields.map((modelField) => {
    const existingField = initialStorageFieldsMap.get(modelField.key)
    return existingField ?? modelField
  })
}

const getInitialDriverSection = (
  initialStorage: GetIntegrationStorageResponseData | undefined,
  baseModel: ListIntegrationStorageModelsResponseDataInner | undefined,
) => {
  if (!baseModel) {
    return []
  }

  if (!initialStorage) {
    return baseModel.storage.service.driverSection
  }

  return calculateInitialFields(
    initialStorage.storage.service.driverSection,
    baseModel.storage.service.driverSection,
  )
}

const getInitialExtraSettings = (
  initialStorage: GetIntegrationStorageResponseData | undefined,
  baseModel: ListIntegrationStorageModelsResponseDataInner | undefined,
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
      settings: calculateInitialFields(
        initialStorageSectionSettings,
        baseModelSection.settings,
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
  initialStorage: GetIntegrationStorageResponseData | undefined,
  baseModel: ListIntegrationStorageModelsResponseDataInner | undefined,
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
    settings: calculateInitialFields(
      initialStorage.storage.volumeType.settings,
      baseModel.storage.volumeType.settings,
    ),
  }
}

const getInitialImageSection = (
  initialStorage: GetIntegrationStorageResponseData | undefined,
  model: ListIntegrationStorageModelsResponseDataInner | undefined,
) => {
  if (initialStorage) {
    return {
      useMultipath: initialStorage.storage.image.useMultipath,
      forceMultipath: initialStorage.storage.image.forceMultipath,
    }
  }

  if (model) {
    return {
      useMultipath: model.storage.image.useMultipath,
      forceMultipath: model.storage.image.forceMultipath,
    }
  }

  return {
    useMultipath: false,
    forceMultipath: false,
  }
}

export type GetInitialStorageFormProps = {
  initialStorage: GetIntegrationStorageResponseData | undefined
  previousStorage: StorageForm | undefined
  baseModel: ListIntegrationStorageModelsResponseDataInner | undefined
}

export const getInitialStorageForm = (
  props: GetInitialStorageFormProps,
): StorageForm => {
  const { initialStorage, previousStorage, baseModel } = props

  const name = getName(initialStorage, previousStorage)
  const driver = initialStorage?.driver ?? baseModel?.driver ?? ''
  const driverSection = getInitialDriverSection(initialStorage, baseModel)
  const extraSettings = getInitialExtraSettings(initialStorage, baseModel)
  const extraConfigFiles = getInitialExtraConfigFiles(baseModel)
  const volumeType = getInitialVolumeTypeSection(initialStorage, baseModel)
  const image = getInitialImageSection(initialStorage, baseModel)

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
