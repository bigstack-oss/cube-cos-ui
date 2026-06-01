import { delay, http, HttpResponse } from 'msw'
import {
  ListNodeGPUCardsResponse,
  UpdateNodeGPUCardPutRequest,
  UpdateNodeGPUCardResponse,
} from '@cube-frontend/api'
import { mockGpuResource } from './gpu'

export const handlers = [
  http.get(
    '/api/v1/datacenters/:dataCenter/nodes/:nodeName/gpuCards',
    async () => {
      await delay(2000)
      const res: ListNodeGPUCardsResponse = {
        code: 200,
        data: mockGpuResource,
        msg: 'Success',
        status: 'success',
      }

      return HttpResponse.json(res)
    },
  ),
  http.put<
    { dataCenter: string; nodeName: string; gpuId: string },
    UpdateNodeGPUCardPutRequest,
    UpdateNodeGPUCardResponse
  >(
    '/api/v1/datacenters/:dataCenter/nodes/:nodeName/gpuCards/:gpuId',
    async () => {
      await delay(2000)
      const res: UpdateNodeGPUCardResponse = {
        code: 200,
        msg: 'Success',
        status: 'ok',
      }

      return HttpResponse.json(res)
    },
  ),
]
