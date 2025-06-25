import { VerifyNodeIpmiResponseData } from '@cube-frontend/api'
import dayjs from 'dayjs'

type LogItem = {
  label: string
  value: string
}

export const verifyIpmiResponseToLog = (
  data: VerifyNodeIpmiResponseData,
): string => {
  const { board, product } = data

  const boardManufacturingDate = dayjs
    .utc(board.manufacturingDate)
    .format('ddd MMM dd HH:mm:ss YYYY')

  const logItems: LogItem[] = [
    {
      label: 'Board Mfg Date',
      value: boardManufacturingDate,
    },
    {
      label: 'Board Mfg',
      value: board.manufacturer,
    },
    {
      label: 'Board Product',
      value: board.product,
    },
    {
      label: 'Board Serial',
      value: board.serial,
    },
    {
      label: 'Board Part Number',
      value: board.partNumber,
    },
    {
      label: 'Product Manufacturer',
      value: product.manufacturer,
    },
    {
      label: 'Product Name',
      value: product.name,
    },
    {
      label: 'Product Version',
      value: product.version,
    },
    {
      label: 'Product Serial',
      value: product.serial,
    },
  ]

  return logItems.map((item) => `${item.label}: ${item.value}`).join('\n')
}
