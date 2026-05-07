import { ResourceRow } from './NodeResources'

export enum GpuResourceType {
  Unset = 'unset',
  Passthrough = 'Passthrough',
  SriovVgpu = 'SR-IOV vGPU',
  MigVgpu = 'MIG-backed vGPU',
}

export enum GpuStatus {
  Unassigned = 'Unassigned', // Hardware detected but not initialized
  Idle = 'Idle', // Initialized but no VMs attached
  InUse = 'in-use', // One or more VMs attached
}

type ResourceProfile = {
  id: string
  name: string
  vramMb: number
  counts: number
  remaining: number
  aliasName: string
}

type AttachedInstance = {
  id: string
  name: string
  profileAlias: string
  utilizationPercent: number
  memoryUsage: {
    allocatedMb: number
    totalMb: number
  }
  links: {
    grafana: string
    console: string
  }
}

export type NodeResourceInner = {
  id: string
  name: string
  resourceType: GpuResourceType
  pciAddress: string
  status: GpuStatus
  supportTypes: string[]
  vram: {
    allocatedGiB: number
    totalGiB: number
    utilizationPercent: number
  }
  gpu: {
    utilizationPercent: number
  }
  allocationSummary: {
    current: number
    total: number
  }
  profiles: ResourceProfile[]
  attachedInstances: AttachedInstance[]
}

export const mockData: ResourceRow[] = [
  // MIG-backed vGPU + InUse
  {
    id: 'gpu-001',
    name: 'NVIDIA A100 80GB',
    resourceType: GpuResourceType.MigVgpu,
    pciAddress: '0000:01:00.0',
    status: GpuStatus.InUse,
    supportTypes: ['passThrough', 'SR-IOV vGPU', 'MIG-backed vGPU'],
    vram: {
      allocatedGiB: 80,
      totalGiB: 100,
      utilizationPercent: 40,
    },
    gpu: {
      utilizationPercent: 24,
    },
    allocationSummary: {
      current: 2,
      total: 6,
    },
    profiles: [
      {
        id: 'a100-1-5c',
        name: 'A100-1-5C',
        vramMb: 510,
        counts: 16,
        remaining: 14,
        aliasName: 'Inference_Small',
      },
      {
        id: 'a100-2-10c',
        name: 'A100-2-10C',
        vramMb: 240,
        counts: 8,
        remaining: 7,
        aliasName: 'Training_Medium',
      },
    ],
    attachedInstances: [
      {
        id: 'vm-99',
        name: 'AI-Worker-01',
        profileAlias: 'A100-1-5C',
        utilizationPercent: 20.35,
        memoryUsage: {
          allocatedMb: 40,
          totalMb: 50,
        },
        links: {
          grafana: 'https://example.grafana/vm-99',
          console: 'https://example.console/vm-99',
        },
      },
    ],
  },
  // MIG-backed vGPU + Idle
  {
    id: 'gpu-002',
    name: 'NVIDIA A100 40GB',
    resourceType: GpuResourceType.MigVgpu,
    pciAddress: '0000:02:00.0',
    status: GpuStatus.Idle,
    supportTypes: ['passThrough', 'SR-IOV vGPU', 'MIG-backed vGPU'],
    vram: {
      allocatedGiB: 0,
      totalGiB: 400,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 4,
    },
    profiles: [
      {
        id: 'a100-1-5c-40g',
        name: 'A100-1-5C',
        vramMb: 5120,
        counts: 8,
        remaining: 8,
        aliasName: 'Inference_Small',
      },
    ],
    attachedInstances: [],
  },
  // MIG-backed vGPU + Unassigned
  {
    id: 'gpu-003',
    name: 'NVIDIA A100 80GB',
    resourceType: GpuResourceType.MigVgpu,
    pciAddress: '0000:03:00.0',
    status: GpuStatus.Unassigned,
    supportTypes: ['passThrough', 'SR-IOV vGPU', 'MIG-backed vGPU'],
    vram: {
      allocatedGiB: 0,
      totalGiB: 81920,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 0,
    },
    profiles: [],
    attachedInstances: [],
  },
  // SR-IOV vGPU + InUse
  {
    id: 'gpu-004',
    name: 'Intel Data Center GPU Flex 170',
    resourceType: GpuResourceType.SriovVgpu,
    pciAddress: '0000:04:00.0',
    status: GpuStatus.InUse,
    supportTypes: ['passThrough', 'SR-IOV vGPU'],
    vram: {
      allocatedGiB: 12000,
      totalGiB: 16384,
      utilizationPercent: 73,
    },
    gpu: {
      utilizationPercent: 65,
    },
    allocationSummary: {
      current: 3,
      total: 8,
    },
    profiles: [
      {
        id: 'flex-170-2g',
        name: 'Flex-170-2G',
        vramMb: 2048,
        counts: 8,
        remaining: 5,
        aliasName: 'Media_Transcode',
      },
    ],
    attachedInstances: [
      {
        id: 'vm-201',
        name: 'Transcode-Node-01',
        profileAlias: 'Flex-170-2G',
        utilizationPercent: 72.1,
        memoryUsage: {
          allocatedMb: 1800,
          totalMb: 2048,
        },
        links: {
          grafana: 'https://example.grafana/vm-201',
          console: 'https://example.console/vm-201',
        },
      },
      {
        id: 'vm-202',
        name: 'Transcode-Node-02',
        profileAlias: 'Flex-170-2G',
        utilizationPercent: 55.0,
        memoryUsage: {
          allocatedMb: 1400,
          totalMb: 2048,
        },
        links: {
          grafana: 'https://example.grafana/vm-202',
          console: 'https://example.console/vm-202',
        },
      },
      {
        id: 'vm-203',
        name: 'Transcode-Node-03',
        profileAlias: 'Flex-170-2G',
        utilizationPercent: 30.5,
        memoryUsage: {
          allocatedMb: 900,
          totalMb: 2048,
        },
        links: {
          grafana: 'https://example.grafana/vm-203',
          console: 'https://example.console/vm-203',
        },
      },
    ],
  },
  // SR-IOV vGPU + Idle
  {
    id: 'gpu-005',
    name: 'Intel Data Center GPU Flex 140',
    resourceType: GpuResourceType.SriovVgpu,
    pciAddress: '0000:05:00.0',
    status: GpuStatus.Idle,
    supportTypes: ['passThrough', 'SR-IOV vGPU'],
    vram: {
      allocatedGiB: 0,
      totalGiB: 12288,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 4,
    },
    profiles: [
      {
        id: 'flex-140-1g',
        name: 'Flex-140-1G',
        vramMb: 1024,
        counts: 4,
        remaining: 4,
        aliasName: 'VDI_Light',
      },
    ],
    attachedInstances: [],
  },
  // SR-IOV vGPU + Unassigned
  {
    id: 'gpu-006',
    name: 'Intel Data Center GPU Flex 170',
    resourceType: GpuResourceType.SriovVgpu,
    pciAddress: '0000:06:00.0',
    status: GpuStatus.Unassigned,
    supportTypes: ['passThrough', 'SR-IOV vGPU'],
    vram: {
      allocatedGiB: 0,
      totalGiB: 16384,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 0,
    },
    profiles: [],
    attachedInstances: [],
  },
  // Passthrough + InUse
  {
    id: 'gpu-007',
    name: 'NVIDIA RTX 4090',
    resourceType: GpuResourceType.Passthrough,
    pciAddress: '0000:07:00.0',
    status: GpuStatus.InUse,
    supportTypes: ['passThrough'],
    vram: {
      allocatedGiB: 24576,
      totalGiB: 24576,
      utilizationPercent: 88,
    },
    gpu: {
      utilizationPercent: 92,
    },
    allocationSummary: {
      current: 1,
      total: 1,
    },
    profiles: [],
    attachedInstances: [
      {
        id: 'vm-301',
        name: 'ML-Training-GPU',
        profileAlias: '',
        utilizationPercent: 92.0,
        memoryUsage: {
          allocatedMb: 22000,
          totalMb: 24576,
        },
        links: {
          grafana: 'https://example.grafana/vm-301',
          console: 'https://example.console/vm-301',
        },
      },
    ],
  },
  // Passthrough + Idle
  {
    id: 'gpu-008',
    name: 'NVIDIA RTX 4080',
    resourceType: GpuResourceType.Passthrough,
    pciAddress: '0000:08:00.0',
    status: GpuStatus.Idle,
    supportTypes: ['passThrough'],
    vram: {
      allocatedGiB: 0,
      totalGiB: 16384,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 1,
    },
    profiles: [],
    attachedInstances: [],
  },
  // Passthrough + Unassigned
  {
    id: 'gpu-009',
    name: 'NVIDIA T4',
    resourceType: GpuResourceType.Passthrough,
    pciAddress: '0000:09:00.0',
    status: GpuStatus.Unassigned,
    supportTypes: ['passThrough'],
    vram: {
      allocatedGiB: 0,
      totalGiB: 16384,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 0,
    },
    profiles: [],
    attachedInstances: [],
  },
  // Unset + InUse
  {
    id: 'gpu-010',
    name: 'NVIDIA H100 80GB',
    resourceType: GpuResourceType.Unset,
    pciAddress: '0000:0a:00.0',
    status: GpuStatus.InUse,
    supportTypes: ['passThrough', 'SR-IOV vGPU', 'MIG-backed vGPU'],
    vram: {
      allocatedGiB: 40000,
      totalGiB: 81920,
      utilizationPercent: 48,
    },
    gpu: {
      utilizationPercent: 55,
    },
    allocationSummary: {
      current: 1,
      total: 1,
    },
    profiles: [],
    attachedInstances: [
      {
        id: 'vm-401',
        name: 'LLM-Inference-01',
        profileAlias: '',
        utilizationPercent: 55.0,
        memoryUsage: {
          allocatedMb: 40000,
          totalMb: 81920,
        },
        links: {
          grafana: 'https://example.grafana/vm-401',
          console: 'https://example.console/vm-401',
        },
      },
    ],
  },
  // Unset + Idle
  {
    id: 'gpu-011',
    name: 'NVIDIA L40',
    resourceType: GpuResourceType.Unset,
    pciAddress: '0000:0b:00.0',
    status: GpuStatus.Idle,
    supportTypes: ['passThrough', 'SR-IOV vGPU'],
    vram: {
      allocatedGiB: 0,
      totalGiB: 49152,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 1,
    },
    profiles: [],
    attachedInstances: [],
  },
  // Unset + Unassigned
  {
    id: 'gpu-012',
    name: 'NVIDIA A30',
    resourceType: GpuResourceType.Unset,
    pciAddress: '0000:0c:00.0',
    status: GpuStatus.Unassigned,
    supportTypes: ['passThrough', 'SR-IOV vGPU', 'MIG-backed vGPU'],
    vram: {
      allocatedGiB: 0,
      totalGiB: 24576,
      utilizationPercent: 0,
    },
    gpu: {
      utilizationPercent: 0,
    },
    allocationSummary: {
      current: 0,
      total: 0,
    },
    profiles: [],
    attachedInstances: [],
  },
]
