import {
  DeviceType,
  ListNodeDevicesResponseDataInner,
} from '@cube-frontend/api'
import { describe, expect, it } from 'vitest'
import { getDeviceSaveActions } from './nodeDevicesUtils'

const createDevice = (
  definedClass: DeviceType,
  reweight: number,
): ListNodeDevicesResponseDataInner =>
  ({
    class: definedClass,
    osd: { reweight },
  }) as unknown as ListNodeDevicesResponseDataInner

describe('getDeviceSaveActions', () => {
  const hdd = createDevice(DeviceType.Hdd, 1)

  it('sends only the class when only the class changed', () => {
    expect(
      getDeviceSaveActions(hdd, {
        definedClass: DeviceType.Ssd,
        osdReweight: 1,
      }),
    ).toEqual({ definedClass: DeviceType.Ssd })
  })

  it('sends only the reweight when only the reweight changed', () => {
    expect(
      getDeviceSaveActions(hdd, {
        definedClass: DeviceType.Hdd,
        osdReweight: 0.5,
      }),
    ).toEqual({ osdReweight: 0.5 })
  })

  it('sends both when both changed', () => {
    expect(
      getDeviceSaveActions(hdd, {
        definedClass: DeviceType.Ssd,
        osdReweight: 0.95,
      }),
    ).toEqual({ definedClass: DeviceType.Ssd, osdReweight: 0.95 })
  })

  it('sends nothing when nothing changed', () => {
    expect(
      getDeviceSaveActions(hdd, {
        definedClass: DeviceType.Hdd,
        osdReweight: 1,
      }),
    ).toEqual({})
  })

  it('treats 1 and 1.00 as the same reweight', () => {
    expect(
      getDeviceSaveActions(hdd, {
        definedClass: DeviceType.Hdd,
        osdReweight: parseFloat('1.00'),
      }),
    ).toEqual({})
    expect(
      getDeviceSaveActions(createDevice(DeviceType.Hdd, 0.3), {
        definedClass: DeviceType.Hdd,
        osdReweight: 0.1 + 0.2,
      }),
    ).toEqual({})
  })
})
