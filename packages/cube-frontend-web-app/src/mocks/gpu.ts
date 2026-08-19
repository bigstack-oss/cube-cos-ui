import { delay, http, HttpResponse } from 'msw'
import {
  GetGpuInstanceConsole200Response,
  ListNodeGPUCardsResponse,
  UpdateNodeGPUCardPutRequest,
  UpdateNodeGPUCardResponse,
} from '@cube-frontend/api'
import {
  GPUCardStatus,
  GPUResourceType,
  GPUSupportResourceType,
  ListNodeGPUCardsResponseDataInner,
} from '@cube-frontend/api/sdk/api'

const mockGpuCards: Omit<ListNodeGPUCardsResponseDataInner, 'links'>[] = [
  // MIG-backed vGPU + InUse
  {
    id: 'gpu-001',
    degraded: false,
    name: 'NVIDIA A100 80GB',
    resourceType: GPUResourceType.MigBackedVgpu,
    pciAddress: '0000:01:00.0',
    status: {
      current: GPUCardStatus.InUse,
      isProcessing: false,
    },
    supportResourceTypes: [
      GPUSupportResourceType.Pgpu,
      GPUSupportResourceType.SriovVgpu,
      GPUSupportResourceType.MigBackedVgpu,
    ],
    sriovVgpuProfileCountLimit: 10,
    vram: {
      allocatedMiB: 32768,
      totalMiB: 81920,
      utilizationPercent: 40,
    },
    gpu: {
      utilizationPercent: 24,
    },
    allocationSummary: {
      current: 2,
      total: 6,
    },
    profiles: {
      sriovVgpu: [
        {
          id: 1,
          name: 'A100-1-5C',
          vramMiB: 5120,
          count: 0,
          remaining: null,
          aliasName: 'Inference_Small',
          countLimit: null,
        },
        {
          id: 2,
          name: 'A100-2-10C',
          vramMiB: 10240,
          count: 0,
          remaining: null,
          aliasName: 'Training_Medium',
          countLimit: null,
        },
      ],
      migBackedVgpu: [
        {
          id: 1,
          name: 'A100-1-5C',
          vramMiB: 5120,
          count: 16,
          remaining: 14,
          aliasName: 'Inference_Small',
          countLimit: 16,
        },
        {
          id: 2,
          name: 'A100-2-10C',
          vramMiB: 10240,
          count: 8,
          remaining: 7,
          aliasName: 'Training_Medium',
          countLimit: 8,
        },
      ],
    },
    attachedInstances: [
      {
        id: 'vm-99',
        name: 'AI-Worker-01',
        profileAlias: 'A100-1-5C',
        utilizationPercent: 20.35,
        memoryUsage: {
          allocatedMiB: 1044,
          totalMiB: 5120,
        },
        links: {
          grafana: 'https://example.grafana/vm-99',
        },
      },
    ],
  },
  // MIG-backed vGPU + Idle
  {
    id: 'gpu-002',
    degraded: false,
    name: 'NVIDIA A100 40GB',
    resourceType: GPUResourceType.MigBackedVgpu,
    pciAddress: '0000:02:00.0',
    status: {
      current: GPUCardStatus.Idle,
      isProcessing: true,
    },
    supportResourceTypes: [
      GPUSupportResourceType.Pgpu,
      GPUSupportResourceType.SriovVgpu,
      GPUSupportResourceType.MigBackedVgpu,
    ],
    sriovVgpuProfileCountLimit: 10,
    vram: {
      allocatedMiB: 0,
      totalMiB: 4096000,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 4,
    },
    profiles: {
      sriovVgpu: [
        {
          id: 1,
          name: 'A100-1-5C',
          vramMiB: 5120,
          count: 0,
          remaining: null,
          aliasName: 'Inference_Small',
          countLimit: null,
        },
        {
          id: 2,
          name: 'A100-2-10C',
          vramMiB: 10240,
          count: 0,
          remaining: null,
          aliasName: 'Training_Medium',
          countLimit: null,
        },
      ],
      migBackedVgpu: [
        {
          id: 1,
          name: 'A100-1-5C',
          vramMiB: 5120,
          count: 16,
          remaining: 14,
          aliasName: 'Inference_Small',
          countLimit: 16,
        },
        {
          id: 2,
          name: 'A100-2-10C',
          vramMiB: 10240,
          count: 8,
          remaining: 7,
          aliasName: 'Training_Medium',
          countLimit: 8,
        },
      ],
    },
    attachedInstances: [],
  },
  // Unassigned
  {
    id: 'gpu-003',
    degraded: false,
    name: 'NVIDIA A100 80GB',
    resourceType: GPUResourceType.Unset,
    pciAddress: '0000:03:00.0',
    status: {
      current: GPUCardStatus.Unassigned,
      isProcessing: false,
    },
    supportResourceTypes: [
      GPUSupportResourceType.Pgpu,
      GPUSupportResourceType.SriovVgpu,
      GPUSupportResourceType.MigBackedVgpu,
    ],
    sriovVgpuProfileCountLimit: 10,
    vram: {
      allocatedMiB: 0,
      totalMiB: 81920,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 0,
    },
    profiles: {
      sriovVgpu: [],
      migBackedVgpu: [],
    },
    attachedInstances: [],
  },
  // SR-IOV vGPU + InUse
  {
    id: 'gpu-004',
    degraded: false,
    name: 'Intel Data Center GPU Flex 170',
    resourceType: GPUResourceType.SriovVgpu,
    pciAddress: '0000:04:00.0',
    status: {
      current: GPUCardStatus.InUse,
      isProcessing: false,
    },
    supportResourceTypes: [
      GPUSupportResourceType.Pgpu,
      GPUSupportResourceType.SriovVgpu,
    ],
    sriovVgpuProfileCountLimit: 10,
    vram: {
      allocatedMiB: 12000,
      totalMiB: 16384,
      utilizationPercent: 73,
    },
    gpu: {
      utilizationPercent: 65,
    },
    allocationSummary: {
      current: 3,
      total: 8,
    },
    profiles: {
      sriovVgpu: [
        {
          id: 1,
          name: 'Flex-170-2G',
          vramMiB: 2048,
          count: 8,
          remaining: null,
          aliasName: 'Media_Transcode',
          countLimit: null,
        },
      ],
      migBackedVgpu: [],
    },
    attachedInstances: [
      {
        id: 'vm-201',
        name: 'Transcode-Node-01',
        profileAlias: 'Flex-170-2G',
        utilizationPercent: 72.1,
        memoryUsage: {
          allocatedMiB: 1800,
          totalMiB: 2048,
        },
        links: {
          grafana: 'https://example.grafana/vm-201',
        },
      },
      {
        id: 'vm-202',
        name: 'Transcode-Node-02',
        profileAlias: 'Flex-170-2G',
        utilizationPercent: 55.0,
        memoryUsage: {
          allocatedMiB: 1400,
          totalMiB: 2048,
        },
        links: {
          grafana: 'https://example.grafana/vm-202',
        },
      },
      {
        id: 'vm-203',
        name: 'Transcode-Node-03',
        profileAlias: 'Flex-170-2G',
        utilizationPercent: 30.5,
        memoryUsage: {
          allocatedMiB: 900,
          totalMiB: 2048,
        },
        links: {
          grafana: 'https://example.grafana/vm-203',
        },
      },
    ],
  },
  // SR-IOV vGPU + Idle
  {
    id: 'gpu-005',
    degraded: false,
    name: 'Intel Data Center GPU Flex 140',
    resourceType: GPUResourceType.SriovVgpu,
    pciAddress: '0000:05:00.0',
    status: {
      current: GPUCardStatus.Idle,
      isProcessing: true,
    },
    supportResourceTypes: [
      GPUSupportResourceType.Pgpu,
      GPUSupportResourceType.SriovVgpu,
    ],
    sriovVgpuProfileCountLimit: 10,
    vram: {
      allocatedMiB: 0,
      totalMiB: 12288,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 4,
    },
    profiles: {
      sriovVgpu: [
        {
          id: 1,
          name: 'Flex-140-1G',
          vramMiB: 1024,
          count: 4,
          remaining: null,
          aliasName: 'VDI_Light',
          countLimit: null,
        },
      ],
      migBackedVgpu: [],
    },
    attachedInstances: [],
  },
  // Unassigned
  {
    id: 'gpu-006',
    degraded: false,
    name: 'Intel Data Center GPU Flex 170',
    resourceType: GPUResourceType.Unset,
    pciAddress: '0000:06:00.0',
    status: {
      current: GPUCardStatus.Unassigned,
      isProcessing: false,
    },
    supportResourceTypes: [
      GPUSupportResourceType.Pgpu,
      GPUSupportResourceType.SriovVgpu,
    ],
    sriovVgpuProfileCountLimit: 10,
    vram: {
      allocatedMiB: 0,
      totalMiB: 16384,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 0,
    },
    profiles: { sriovVgpu: [], migBackedVgpu: [] },
    attachedInstances: [],
  },
  // Passthrough + InUse
  {
    id: 'gpu-007',
    degraded: false,
    name: 'NVIDIA RTX 4090',
    resourceType: GPUResourceType.Pgpu,
    pciAddress: '0000:07:00.0',
    status: {
      current: GPUCardStatus.InUse,
      isProcessing: true,
    },
    supportResourceTypes: [GPUSupportResourceType.Pgpu],
    sriovVgpuProfileCountLimit: null,
    vram: {
      allocatedMiB: 24576,
      totalMiB: 24576,
      utilizationPercent: 88,
    },
    gpu: {
      utilizationPercent: 92,
    },
    allocationSummary: {
      current: 1,
      total: 1,
    },
    profiles: { sriovVgpu: [], migBackedVgpu: [] },
    attachedInstances: [
      {
        id: 'vm-301',
        name: 'ML-Training-GPU',
        profileAlias: '',
        utilizationPercent: 92.0,
        memoryUsage: {
          allocatedMiB: 22000,
          totalMiB: 24576,
        },
        links: {
          grafana: 'https://example.grafana/vm-301',
        },
      },
    ],
  },
  // Passthrough + Idle
  {
    id: 'gpu-008',
    degraded: false,
    name: 'NVIDIA RTX 4080',
    resourceType: GPUResourceType.Pgpu,
    pciAddress: '0000:08:00.0',
    status: {
      current: GPUCardStatus.Idle,
      isProcessing: false,
    },
    supportResourceTypes: [GPUSupportResourceType.Pgpu],
    sriovVgpuProfileCountLimit: null,
    vram: {
      allocatedMiB: 0,
      totalMiB: 16384,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 1,
    },
    profiles: { sriovVgpu: [], migBackedVgpu: [] },
    attachedInstances: [],
  },
  // Unassigned
  {
    id: 'gpu-009',
    degraded: false,
    name: 'NVIDIA T4',
    resourceType: GPUResourceType.Unset,
    pciAddress: '0000:09:00.0',
    status: {
      current: GPUCardStatus.Unassigned,
      isProcessing: false,
    },
    supportResourceTypes: [GPUSupportResourceType.Pgpu],
    sriovVgpuProfileCountLimit: null,
    vram: {
      allocatedMiB: 0,
      totalMiB: 16384,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 0,
    },
    profiles: { sriovVgpu: [], migBackedVgpu: [] },
    attachedInstances: [],
  },
  // Passthrough + InUse (H100)
  {
    id: 'gpu-010',
    degraded: false,
    name: 'NVIDIA H100 80GB',
    resourceType: GPUResourceType.Pgpu,
    pciAddress: '0000:0a:00.0',
    status: {
      current: GPUCardStatus.InUse,
      isProcessing: false,
    },
    supportResourceTypes: [
      GPUSupportResourceType.Pgpu,
      GPUSupportResourceType.SriovVgpu,
      GPUSupportResourceType.MigBackedVgpu,
    ],
    sriovVgpuProfileCountLimit: 10,
    vram: {
      allocatedMiB: 40000,
      totalMiB: 81920,
      utilizationPercent: 48,
    },
    gpu: {
      utilizationPercent: 55,
    },
    allocationSummary: {
      current: 1,
      total: 1,
    },
    profiles: { sriovVgpu: [], migBackedVgpu: [] },
    attachedInstances: [
      {
        id: 'vm-401',
        name: 'LLM-Inference-01',
        profileAlias: '',
        utilizationPercent: 55.0,
        memoryUsage: {
          allocatedMiB: 40000,
          totalMiB: 81920,
        },
        links: {
          grafana: 'https://example.grafana/vm-401',
        },
      },
    ],
  },
  // SR-IOV vGPU + Idle (L40)
  {
    id: 'gpu-011',
    degraded: false,
    name: 'NVIDIA L40',
    resourceType: GPUResourceType.SriovVgpu,
    pciAddress: '0000:0b:00.0',
    status: {
      current: GPUCardStatus.Idle,
      isProcessing: false,
    },
    supportResourceTypes: [
      GPUSupportResourceType.Pgpu,
      GPUSupportResourceType.SriovVgpu,
    ],
    sriovVgpuProfileCountLimit: 10,
    vram: {
      allocatedMiB: 0,
      totalMiB: 49152,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 8,
    },
    profiles: {
      sriovVgpu: [
        {
          id: 1,
          name: 'L40-6Q',
          vramMiB: 6144,
          count: 8,
          remaining: null,
          aliasName: 'VDI_Standard',
          countLimit: null,
        },
      ],
      migBackedVgpu: [],
    },
    attachedInstances: [],
  },
  // Unset + Unassigned
  {
    id: 'gpu-012',
    degraded: false,
    name: 'NVIDIA A30',
    resourceType: GPUResourceType.Unset,
    pciAddress: '0000:0c:00.0',
    status: {
      current: GPUCardStatus.Unassigned,
      isProcessing: false,
    },
    supportResourceTypes: [
      GPUSupportResourceType.Pgpu,
      GPUSupportResourceType.SriovVgpu,
      GPUSupportResourceType.MigBackedVgpu,
    ],
    sriovVgpuProfileCountLimit: 8,
    vram: {
      allocatedMiB: 0,
      totalMiB: 24576,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 0,
    },
    profiles: { sriovVgpu: [], migBackedVgpu: [] },
    attachedInstances: [],
  },
]

/**
 * The API builds these per card, filtered to the card's PCI address. Mirror that
 * shape so a row opens a link that names one card, not the whole node.
 */
const historyLink = (pciAddress: string, panelId: number): string =>
  `https://example.grafana/grafana/d/i-device/device?orgId=1&var-GPU_HOST=example-node-0&var-GPU_PCIID=${encodeURIComponent(
    pciAddress,
  )}&from=now-3h&to=now&viewPanel=${panelId}`

export const mockGpuResource: ListNodeGPUCardsResponseDataInner[] =
  mockGpuCards.map((card) => ({
    ...card,
    links: {
      workloadHistory: historyLink(card.pciAddress, 50),
      vramHistory: historyLink(card.pciAddress, 51),
    },
  }))

export const mockListNodeGpuCards = http.get(
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
)

export const mockUpdateNodeGpuCard = http.put<
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
)

export const mockGetGpuInstanceConsole = http.get<{
  dataCenter: string
  nodeName: string
  instanceId: string
}>(
  '/api/v1/datacenters/:dataCenter/nodes/:nodeName/gpuCards/instances/:instanceId/console',
  async ({ params }) => {
    await delay(1000)
    const res: GetGpuInstanceConsole200Response = {
      code: 200,
      data: {
        console: `https://example.console/${params.instanceId}`,
      },
      msg: 'gpu instance console link retrieved successfully',
      status: 'ok',
    }

    return HttpResponse.json(res)
  },
)
