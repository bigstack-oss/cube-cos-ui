import { delay, http, HttpResponse } from 'msw'
import { ListNodeGPUCardsResponse } from '@cube-frontend/api'
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
]
