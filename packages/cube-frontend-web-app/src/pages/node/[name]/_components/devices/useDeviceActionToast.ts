import {
  CosNotificationType,
  CosToastType,
  useToast,
} from '@cube-frontend/ui-library'
import dayjs from 'dayjs'
import { uniqueId } from 'lodash'
import { DeviceRow } from './nodeDevicesUtils'

type UseDeviceActionToast = {
  showSuccessToast: (message: string, device: DeviceRow) => void
  showFailedToast: (message: string, device: DeviceRow) => void
}

const getToastId = (): string => uniqueId('device-advanced-actions')

export const useDeviceActionToast = (): UseDeviceActionToast => {
  const { addToast, removeToast } = useToast()

  const createCosToast = (
    type: CosNotificationType,
    message: string,
    _device: DeviceRow,
  ): CosToastType => {
    const id = getToastId()
    return {
      id,
      type,
      message,
      link: {
        text: 'Check',
        href: 'https://youtu.be/dQw4w9WgXcQ',
      },
      time: dayjs(new Date()).format('HH:mm:ss A'),
      onClose: () => removeToast(id),
    }
  }

  const showSuccessToast = (message: string, device: DeviceRow): void => {
    const toast = createCosToast('positive', message, device)
    addToast(toast)
  }

  const showFailedToast = (message: string, device: DeviceRow): void => {
    const toast = createCosToast('neutral', message, device)
    addToast(toast)
  }

  return {
    showSuccessToast,
    showFailedToast,
  }
}
