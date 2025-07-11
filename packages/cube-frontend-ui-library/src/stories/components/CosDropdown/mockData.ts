export type MockDataItem = {
  label: string
  value: string
  disabled?: boolean
}

export const mockData: MockDataItem[] = [
  {
    label: 'Dropdown Item 1',
    value: 'item1',
  },
  {
    label: 'Dropdown Item 2',
    value: 'item2',
  },
  {
    label: 'Dropdown Item 3',
    value: 'item3',
    disabled: true,
  },
  {
    label: 'Dropdown Item 4',
    value: 'item4',
  },
  {
    label: 'Dropdown Item 5',
    value: 'item5',
  },
]
