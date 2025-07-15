import { NodeBlockDevicesInner } from '@cube-frontend/api'
import { CosTableRow, GetCosBasicTable } from '@cube-frontend/ui-library'
import { z } from 'zod'

export type NodeBlockDeviceInnerWaitingForApiUpdate = Omit<
  NodeBlockDevicesInner,
  'status'
> & {
  class: 'SSD' | 'HDD'
  osd: {
    pgs: number
    reweight: number
    daemons: {
      id: string
      usagePercent: number
      status: {
        current: string
      }
    }[]
  }
  status: NodeBlockDevicesInner['status'] & {
    isPromotable: boolean
    isDemotable: boolean
  }
}

type DeviceEditableData = {
  definedClass: NodeBlockDeviceInnerWaitingForApiUpdate['class']
  osdReweight: string
}

export type DeviceRow = CosTableRow &
  NodeBlockDeviceInnerWaitingForApiUpdate & {
    isEditing: boolean
    isSaving: boolean
    dataForEdit: DeviceEditableData
  }

export const DeviceTable = GetCosBasicTable<DeviceRow>()

export const blockDeviceToRow = (
  blockDevice: NodeBlockDeviceInnerWaitingForApiUpdate,
): DeviceRow => {
  return {
    id: blockDevice.device,
    ...blockDevice,
    isEditing: false,
    isSaving: false,
    dataForEdit: createEditableData(blockDevice),
  }
}

export const createEditableData = (
  blockDevice: NodeBlockDeviceInnerWaitingForApiUpdate,
): DeviceEditableData => {
  return {
    definedClass: blockDevice.class,
    osdReweight: blockDevice.osd.reweight.toFixed(1),
  }
}

export const mockDevices: NodeBlockDeviceInnerWaitingForApiUpdate[] = [
  {
    serial: '57T0A05UF5YE',
    device: 'sda',
    type: 'HDD',
    class: 'HDD',
    sizeMiB: 533008.5754,
    osd: {
      pgs: 123,
      reweight: 1.0,
      daemons: [
        {
          id: 'OSD.0',
          usagePercent: 70,
          status: {
            current: 'up',
          },
        },
      ],
    },
    availability: 'in-use',
    status: {
      current: 'ok',
      description: '',
      isPromotable: true,
      isDemotable: true,
    },
  },
  {
    serial: '1230A05UF6G3',
    device: 'sdb',
    type: 'SSD',
    class: 'SSD',
    sizeMiB: 123456.78,
    osd: {
      pgs: 456,
      reweight: 0.5,
      daemons: [
        {
          id: 'OSD.0',
          usagePercent: 25,
          status: {
            current: 'up',
          },
        },
        {
          id: 'OSD.1',
          usagePercent: 70,
          status: {
            current: 'down',
          },
        },
      ],
    },
    availability: 'in-use',
    status: {
      current: 'ok',
      description: '',
      isPromotable: true,
      isDemotable: false,
    },
  },
  {
    serial: '4560A05UF6G3',
    device: 'sdc',
    type: 'HDD',
    class: 'HDD',
    sizeMiB: 345678.9,
    osd: {
      pgs: 0,
      reweight: 0,
      daemons: [],
    },
    availability: 'can be added',
    status: {
      current: 'ok',
      description: '',
      isPromotable: false,
      isDemotable: false,
    },
  },
]

const deviceEditableDataSchema = z.object({
  definedClass: z.enum(['SSD', 'HDD']),
  osdReweight: z.number().min(0).max(1),
})

export const parseDeviceEditableData = (
  data: DeviceEditableData,
): z.infer<typeof deviceEditableDataSchema> | undefined => {
  const parsed = deviceEditableDataSchema.safeParse(data)
  return parsed.data
}
