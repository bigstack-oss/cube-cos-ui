import { ColumnCompareFnMap } from '@cube-frontend/ui-library'
import { z } from 'zod'

const convertIpv4ToNumber = (ip: string) => {
  return Number(
    ip
      .split('.')
      .map((num) => num.padStart(3, '0'))
      .join(''),
  )
}

// TODO: Add unit tests.
const ipv4Compare = (precedingIp: string, followIp: string) =>
  convertIpv4ToNumber(precedingIp) - convertIpv4ToNumber(followIp)

export const ipv4CompareFnMap: ColumnCompareFnMap<string> = {
  ascending: (precedingStatus, followingStatus) =>
    ipv4Compare(precedingStatus, followingStatus) > 0,
  descending: (precedingStatus, followingStatus) =>
    ipv4Compare(precedingStatus, followingStatus) < 0,
}

const ipV4Schema = z.ipv4()

export const isIPv4 = (value: string): boolean => {
  return ipV4Schema.safeParse(value).success
}
