import {
  DeviceType,
  ListNodeDevicesResponseDataInner,
} from '@cube-frontend/api'
import { describe, expect, it } from 'vitest'
import {
  createEditableData,
  getDeviceSaveActions,
  ParsedDeviceEditableData,
} from './nodeDevicesUtils'

const createDevice = (
  definedClass: DeviceType,
  reweight: number,
): ListNodeDevicesResponseDataInner =>
  ({
    class: definedClass,
    osd: { reweight },
  }) as unknown as ListNodeDevicesResponseDataInner

// The editor's starting values, parsed the way the edit schema parses them
// (the reweight string becomes a number), as onSaveClick does for its baseline.
const initialOf = (
  device: ListNodeDevicesResponseDataInner,
): ParsedDeviceEditableData => {
  const editable = createEditableData(device)
  return {
    definedClass: editable.definedClass,
    osdReweight: parseFloat(editable.osdReweight),
  }
}

describe('getDeviceSaveActions', () => {
  const hdd = createDevice(DeviceType.Hdd, 1)

  it('sends only the class when only the class changed', () => {
    expect(
      getDeviceSaveActions(initialOf(hdd), {
        definedClass: DeviceType.Ssd,
        osdReweight: 1,
      }),
    ).toEqual({ definedClass: DeviceType.Ssd })
  })

  it('sends only the reweight when only the reweight changed', () => {
    expect(
      getDeviceSaveActions(initialOf(hdd), {
        definedClass: DeviceType.Hdd,
        osdReweight: 0.5,
      }),
    ).toEqual({ osdReweight: 0.5 })
  })

  it('sends both when both changed', () => {
    expect(
      getDeviceSaveActions(initialOf(hdd), {
        definedClass: DeviceType.Ssd,
        osdReweight: 0.95,
      }),
    ).toEqual({ definedClass: DeviceType.Ssd, osdReweight: 0.95 })
  })

  it('sends nothing when nothing changed', () => {
    expect(
      getDeviceSaveActions(initialOf(hdd), {
        definedClass: DeviceType.Hdd,
        osdReweight: 1,
      }),
    ).toEqual({})
  })

  it('treats 1 and 1.00 as the same reweight', () => {
    expect(
      getDeviceSaveActions(initialOf(hdd), {
        definedClass: DeviceType.Hdd,
        osdReweight: parseFloat('1.00'),
      }),
    ).toEqual({})
    expect(
      getDeviceSaveActions(initialOf(createDevice(DeviceType.Hdd, 0.3)), {
        definedClass: DeviceType.Hdd,
        osdReweight: 0.1 + 0.2,
      }),
    ).toEqual({})
  })

  // Ceph's fixed point gives 0.9499969 for 0.95. The editor shows it as "0.9"
  // (formatOSDReweight), so the baseline must be 0.9 too, or a class-only Save
  // would send reweight 0.9.
  it('sends only the class for a raw fixed-point reweight', () => {
    const device = createDevice(DeviceType.Hdd, 0.9499969)
    const edited = createEditableData(device)

    expect(
      getDeviceSaveActions(initialOf(device), {
        definedClass: DeviceType.Ssd,
        osdReweight: parseFloat(edited.osdReweight),
      }),
    ).toEqual({ definedClass: DeviceType.Ssd })
  })

  it('sends every field when the initial data does not parse', () => {
    expect(
      getDeviceSaveActions(undefined, {
        definedClass: DeviceType.Hdd,
        osdReweight: 1,
      }),
    ).toEqual({ definedClass: DeviceType.Hdd, osdReweight: 1 })
  })
})
