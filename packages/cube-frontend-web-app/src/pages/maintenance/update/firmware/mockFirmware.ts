import { GetFirmwareUpgradeProgressResponseData } from '@cube-frontend/api'

export const mockUpdatableNodes = [
  {
    name: 'example-node-0',
    firmware: {
      active: 'Cube Appliance 3.1.0',
      inactive: 'Cube Appliance 3.1.0',
    },
  },
  {
    name: 'example-node-1',
    firmware: {
      active: 'Cube Appliance 3.1.0',
      inactive: 'Cube Appliance 3.1.0',
    },
  },
  {
    name: 'example-node-2',
    firmware: {
      active: 'Cube Appliance 3.1.0',
      inactive: 'Cube Appliance 3.1.0',
    },
  },
]

export const mockUpdateProgresses: GetFirmwareUpgradeProgressResponseData = {
  version: 'CUBE Appliance 3.1.0',
  progresses: [
    {
      host: 'example-node-0',
      // @ts-expect-error: firmware is still under development, some types are not finalized yet.
      // This will be fixed once the frontend integration with the backend is complete.
      phase: '',
      status: {
        // @ts-expect-error: firmware is still under development, some types are not finalized yet.
        // This will be fixed once the frontend integration with the backend is complete.
        current: 'available',
        isProcessing: false,
        processPercent: 0,
        description: '',
      },
    },
    {
      host: 'example-node-1',
      // @ts-expect-error: firmware is still under development, some types are not finalized yet.
      // This will be fixed once the frontend integration with the backend is complete.
      phase: '',
      status: {
        current: 'failed',
        isProcessing: false,
        processPercent: 0,
        description: '',
      },
    },
    {
      host: 'example-node-2',
      // @ts-expect-error: firmware is still under development, some types are not finalized yet.
      // This will be fixed once the frontend integration with the backend is complete.
      phase: '',
      status: {
        current: 'resolved',
        isProcessing: false,
        processPercent: 0,
        description: '',
      },
    },
    {
      host: 'example-node-3',
      // @ts-expect-error: firmware is still under development, some types are not finalized yet.
      // This will be fixed once the frontend integration with the backend is complete.
      phase: 'partitioning',
      status: {
        current: 'installing',
        isProcessing: true,
        processPercent: 75,
        description: 'swapping partition for Cube Appliance 3.1.0',
      },
    },
    {
      host: 'example-node-4',
      // @ts-expect-error: firmware is still under development, some types are not finalized yet.
      // This will be fixed once the frontend integration with the backend is complete.
      phase: '',
      status: {
        // @ts-expect-error: firmware is still under development, some types are not finalized yet.
        // This will be fixed once the frontend integration with the backend is complete.
        current: 'waitingReboot',
        isProcessing: false,
        processPercent: 0,
        description: '',
      },
    },
  ],
}
