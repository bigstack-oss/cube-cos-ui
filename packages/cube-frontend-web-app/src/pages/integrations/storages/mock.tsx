import { AxiosPromise } from 'axios'
import dayjs from 'dayjs'
import { GetIntegratedStoragesResponseDataInner } from '@cube-frontend/api'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockIntegrationsStoragesApi = async ({
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
    vendor: 'Power Raven',
    models: [
      {
        name: 'AFF A280 Raven',
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
        name: 'AFF A280 Raven',
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
