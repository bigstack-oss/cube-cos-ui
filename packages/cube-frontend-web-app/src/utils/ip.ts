import { ColumnCompareFnMap } from '@cube-frontend/ui-library'

const convertIpv4ToNumber = (ip: string) => {
  return Number(
    ip
      .split('.')
      .map((num) => `000${num}`.slice(-3))
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
