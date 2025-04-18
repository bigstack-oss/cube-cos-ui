import { GetCosViewDetailsTable } from '@cube-frontend/ui-library'

export const LicenseTable = GetCosViewDetailsTable<MockLicense>()

export type MockLicense = {
  id: string
  product: string
  name: string
  hosts: string[]
  issueDate: string
  expireDate: string
  expired: string
  type: string
  quantity: number
  supportPlan: string
  feature: string
}

export const mockLicenses: MockLicense[] = [
  {
    id: '1',
    product: 'CubeCOS',
    name: 'License for COS',
    hosts: ['Dell01', 'Dell02', 'Dell03'],
    issueDate: '2025/04/17',
    expireDate: '2025/05/16',
    expired: 'in 30 days',
    type: 'Trial',
    quantity: 1,
    supportPlan: 'Plan A',
    feature: 'virtualization',
  },
  {
    id: '2',
    product: 'CubeCMP',
    name: 'License for CMP',
    hosts: ['Dell04', 'Dell05', 'Dell06'],
    issueDate: '2025/04/17',
    expireDate: '2025/05/16',
    expired: 'in 30 days',
    type: 'Trial',
    quantity: 2,
    supportPlan: 'Plan B',
    feature: 'kubernetes',
  },
]

export const isCmpLicense = (license: MockLicense): boolean => {
  return license.product.toLowerCase().includes('cmp')
}
