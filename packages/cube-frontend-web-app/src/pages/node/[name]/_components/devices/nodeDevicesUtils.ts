import {
  DeviceType,
  ListNodeDevicesResponseDataInner,
} from '@cube-frontend/api'
import { CosTableRow, GetCosBasicTable } from '@cube-frontend/ui-library'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export type DeviceEditableData = {
  definedClass: DeviceType
  osdReweight: string
}

export type DeviceRow = CosTableRow &
  ListNodeDevicesResponseDataInner & {
    isEditing: boolean
    /**
     * Whether the `updateNodeDevice` and `updateNodeOsd` APIs are still calling.
     */
    isSaving: boolean
    isSavingDone: boolean
    dataForEdit: DeviceEditableData
  }

export const DeviceTable = GetCosBasicTable<DeviceRow>()

export const blockDeviceToRow = (
  blockDevice: ListNodeDevicesResponseDataInner,
): DeviceRow => ({
  ...blockDevice,
  id: blockDevice.device,
  isEditing: false,
  isSaving: false,
  isSavingDone: false,
  dataForEdit: createEditableData(blockDevice),
})

export const isDeviceOrOSDProcessing = (
  blockDevice: ListNodeDevicesResponseDataInner,
): boolean => {
  return (
    blockDevice.status.isProcessing ||
    blockDevice.osd.daemons.some((osd) => osd.status.isProcessing)
  )
}

export const createEditableData = (
  blockDevice: ListNodeDevicesResponseDataInner,
): DeviceEditableData => {
  return {
    definedClass: blockDevice.class,
    osdReweight: formatOSDReweight(blockDevice.osd.reweight),
  }
}

export const useDeviceEditableDataSchema = () => {
  const { t } = useTranslation()

  const reweightErrorMessage: string = t(
    'nodes.details.devices.osdReweightInvalidMessage',
  )

  const deviceEditableDataSchema = z.object({
    definedClass: z.nativeEnum(DeviceType),
    osdReweight: z
      .string()
      .regex(/^[01](\.\d{1,2})?$/, reweightErrorMessage)
      .refine((str) => {
        const float = parseFloat(str)
        return 0 <= float && float <= 1
      }, reweightErrorMessage)
      .transform((str) => parseFloat(str)),
  })

  return deviceEditableDataSchema
}

export type DeviceSaveActions = {
  /** Set when the Defined Class changed; `undefined` means leave it alone. */
  definedClass?: DeviceType
  /** Set when the OSD reweight changed; `undefined` means leave it alone. */
  osdReweight?: number
}

export type ParsedDeviceEditableData = {
  definedClass: DeviceType
  osdReweight: number
}

/**
 * Decides which updates a Save sends, so that a class-only change never
 * touches the OSD reweight (it would move data) and vice versa. `initial` is
 * the row's own editable data parsed by the same schema as `parsed`, so both
 * sides go through `formatOSDReweight` and compare like for like. Reweights are
 * compared as two-decimal numbers, so `1` and `1.00` count as unchanged. If the
 * initial data does not parse, every field counts as changed.
 */
export const getDeviceSaveActions = (
  initial: ParsedDeviceEditableData | undefined,
  parsed: ParsedDeviceEditableData,
): DeviceSaveActions => {
  const toHundredths = (value: number) => Math.round(value * 100)
  const actions: DeviceSaveActions = {}

  if (parsed.definedClass !== initial?.definedClass) {
    actions.definedClass = parsed.definedClass
  }
  if (
    initial === undefined ||
    toHundredths(parsed.osdReweight) !== toHundredths(initial.osdReweight)
  ) {
    actions.osdReweight = parsed.osdReweight
  }

  return actions
}

export const formatOSDUsage = (usagePercent: number): string => {
  if (usagePercent === 0) return '0%'
  const rounded = Math.round(usagePercent)
  return `${Math.min(1, rounded)}%`
}

export const formatOSDReweight = (reweight: number): string => {
  const reweightStr = reweight.toString()
  const hasTwoDecimalPlaces = /\.\d{2}$/.test(reweightStr)

  if (hasTwoDecimalPlaces) {
    return reweightStr
  }

  // For numbers with no decimal places or just one, format it to
  // one decimal place.
  return reweight.toFixed(1)
}
