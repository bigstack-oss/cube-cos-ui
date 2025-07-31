import { AxiosPromise } from 'axios'
import dayjs from 'dayjs'
import { GetIntegratedStoragesResponseDataInner } from '@cube-frontend/api'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockGetIntegrationsStoragesApi = async ({
  dataCenter: _dataCenter,
}: {
  dataCenter: string
}): AxiosPromise<{
  code: number
  data: GetIntegratedStoragesResponseDataInner[]
}> => {
  await sleep(1000)
  // @ts-expect-error - Temporarily using mock data until backend API is ready
  return Promise.resolve({
    code: 200,
    data: {
      code: 200,
      data: [
        {
          name: 'CubeStorage',
          type: 'built-in',
          vendor: 'Net App',
          managementIp: '192.168.1.1',
          updatedAt: dayjs().format(),
          isDefault: false,
          status: {
            current: 'ok',
            isProcessing: false,
          },
        },
        {
          name: 'Storage 2',
          type: 'External',
          vendor: 'Power Link',
          managementIp: '192.168.1.2',
          updatedAt: dayjs().format(),
          isDefault: true,
          status: {
            current: 'ok',
            isProcessing: false,
          },
        },
        {
          name: 'Storage 3',
          type: 'External',
          vendor: 'Power Link',
          managementIp: '192.168.1.3',
          updatedAt: dayjs().format(),
          isDefault: false,
          status: {
            current: 'ok',
            isProcessing: false,
          },
        },
      ],
    },
  })
}

export type GetIntegratedStorageDetailsResponseData = {
  name: string
  type: string
  vendor: string
  managementIp: string
  updatedAt: string
  isDefault: boolean
  model: string
  port: string
  ip: string
  username: string
  status: {
    current: string
    isProcessing: boolean
  }
}

export const mockGetIntegrationsStorageDetailsApi = async ({
  dataCenter: _dataCenter,
}: {
  dataCenter: string
}): AxiosPromise<{
  code: number
  data: GetIntegratedStorageDetailsResponseData
}> => {
  await sleep(1000)
  // @ts-expect-error - Temporarily using mock data until backend API is ready
  return Promise.resolve({
    code: 200,
    data: {
      code: 200,
      data: {
        name: 'Storage 2',
        type: 'External',
        vendor: 'NetApp',
        model: 'AFF A250',
        port: '8080',
        ip: '192.168.1.2',
        username: 'admin',
        managementIp: '192.168.1.2',
        updatedAt: dayjs().format(),
        isDefault: true,
        status: {
          current: 'ok',
          isProcessing: false,
        },
      },
    },
  })
}

export const mockUploadModelList = async (): AxiosPromise<{ code: number }> => {
  await sleep(3000)
  // @ts-expect-error - Temporarily using mock data until backend API is ready
  return Promise.resolve({
    code: 200,
    data: {
      code: 200,
    },
  })
}

export type StorageMaterial = {
  vendor: string
  models: {
    name: string
    protocol: string
    attributes: Record<string, { type: string; value: unknown }>
  }[]
}

export const mockStorageMaterials: StorageMaterial[] = [
  {
    vendor: 'NetApp',
    models: [
      {
        name: 'AFF A250',
        protocol: 'NFS',
        attributes: {
          managementIp: {
            type: 'string',
            value: '',
          },
          username: {
            type: 'string',
            value: '',
          },
          password: {
            type: 'string',
            value: '',
          },
          host: {
            type: 'string',
            value: '',
          },
          port: {
            type: 'integer',
            value: 80,
          },
          path: {
            type: 'string',
            value: '',
          },
        },
      },
      {
        name: 'AFF A280',
        protocol: 'ISCSI',
        attributes: {
          managementIp: {
            type: 'string',
            value: '',
          },
          username: {
            type: 'string',
            value: '',
          },
          password: {
            type: 'string',
            value: '',
          },
          host: {
            type: 'string',
            value: '',
          },
          port: {
            type: 'integer',
            value: 80,
          },
        },
      },
    ],
  },
  {
    vendor: 'Power',
    models: [
      {
        name: 'AFF A250 Power',
        protocol: 'NFS',
        attributes: {
          managementIp: {
            type: 'string',
            value: '',
          },
          username: {
            type: 'string',
            value: '',
          },
          password: {
            type: 'string',
            value: '',
          },
          host: {
            type: 'string',
            value: '',
          },
          port: {
            type: 'integer',
            value: 80,
          },
          path: {
            type: 'string',
            value: '',
          },
        },
      },
      {
        name: 'AFF A280 Power',
        protocol: 'ISCSI',
        attributes: {
          managementIp: {
            type: 'string',
            value: '',
          },
          username: {
            type: 'string',
            value: '',
          },
          password: {
            type: 'string',
            value: '',
          },
          host: {
            type: 'string',
            value: '',
          },
          port: {
            type: 'integer',
            value: 80,
          },
        },
      },
    ],
  },
]

export const mockFetchStorageMaterials = async (): AxiosPromise<{
  code: number
  data: StorageMaterial[]
}> => {
  await sleep(3000)
  // @ts-expect-error - Temporarily using mock data until backend API is ready
  return Promise.resolve({
    code: 200,
    data: {
      code: 200,
      data: mockStorageMaterials,
    },
  })
}

export type ValidateStoragesResponseData = {
  status: string
}

export const mockValidateStorages = async (): AxiosPromise<{
  code: number
  data: ValidateStoragesResponseData
}> => {
  await sleep(3000)
  // @ts-expect-error: Mock function for testing
  return Promise.resolve({
    code: 200,
    data: {
      code: 200,
      data: {
        status: 'success',
      },
    },
  })
}

export const mockUpsertStorage = async (): AxiosPromise<{
  code: number
}> => {
  await sleep(3000)
  // @ts-expect-error: Mock function for testing
  return Promise.resolve({
    code: 200,
    data: {},
  })
}
