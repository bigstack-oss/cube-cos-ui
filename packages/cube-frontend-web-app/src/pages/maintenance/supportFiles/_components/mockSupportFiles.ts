import { SupportFileRow } from '../MaintenanceSupportFilesPage'

export const mockSupportFiles: SupportFileRow[] = [
  {
    id: '1',
    name: '2023-10-01 12:00:00',
    files: [
      {
        description: 'File Description 1',
        sizeMiB: 30000,
        group: 'Group 1',
        name: 'File 1',
        source: {
          host: 'Dell 13',
          role: 'Control-Coveraged',
        },
        status: {
          current: 'current',
          createdAt: '2023-10-01T12:00:00Z',
          isCreating: false,
        },
        url: 'https://desktop.docker.com/mac/main/arm64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module&_gl=1*8ggevk*_gcl_au*MTU4NTE3MjMyMy4xNzQzNTkwMzc3*_ga*MTU1NjIyMTEyMi4xNzQzNTkwMjk3*_ga_XJWPQMJYHQ*MTc0MzU5MDM3Ny4xLjEuMTc0MzU5MDM4Ni41MS4wLjA.',
      },
      {
        description: 'File Description 2',
        sizeMiB: 30000,
        group: 'Group 2',
        name: 'File 2',
        source: {
          host: 'Dell 14',
          role: 'Control-Coveraged',
        },
        status: {
          current: 'current',
          createdAt: '2023-10-01T12:00:00Z',
          isCreating: false,
        },
        url: 'https://example.com/file2',
      },
      {
        description: 'File Description 3',
        sizeMiB: 3000,
        group: 'Group 3',
        name: 'File 3',
        source: {
          host: 'Dell 53',
          role: 'Control-Coveraged',
        },
        status: {
          current: 'current',
          createdAt: '2023-10-01T12:00:00Z',
          isCreating: false,
        },
        url: 'https://example.com/file3',
      },
      {
        description: 'File Description 4',
        sizeMiB: 30000,
        group: 'Group 4',
        name: 'File 4',
        source: {
          host: 'Dell 16',
          role: 'Control-Coveraged',
        },
        status: {
          current: 'current',
          createdAt: '2023-10-01T12:00:00Z',
          isCreating: false,
        },
        url: 'https://desktop.docker.com/mac/main/arm64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module&_gl=1*8ggevk*_gcl_au*MTU4NTE3MjMyMy4xNzQzNTkwMzc3*_ga*MTU1NjIyMTEyMi4xNzQzNTkwMjk3*_ga_XJWPQMJYHQ*MTc0MzU5MDM3Ny4xLjEuMTc0MzU5MDM4Ni41MS4wLjA.',
      },
    ],
    sizeMiB: 30000,
    description: 'Files Comments',
    status: {
      createdAt: '2023-10-01T12:00:00Z',
      isCreating: false,
      current: 'current',
    },
  },
]
