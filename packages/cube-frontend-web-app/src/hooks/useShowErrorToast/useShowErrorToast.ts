import { useToast } from '@cube-frontend/ui-library'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { parseErrorMessage } from '@cube-frontend/web-app/utils/errorMessage'
import dayjs from 'dayjs'
import { uniqueId } from 'lodash'
import { useContext } from 'react'

type UseShowErrorToast = (error: unknown) => void

/**
 * This hook has a dependency on the data center.
 * Do not use it outside of `<Content>`.
 */
export const useShowErrorToast = (): UseShowErrorToast => {
  const { addToast, removeToast } = useToast()

  const { dataCenter } = useContext(DataCenterContext)

  const showErrorToast = (error: unknown): void => {
    const errorMessage =
      parseErrorMessage(error) ||
      // TODO: i18n.
      'Unknown error occurred, please try again.'

    const toastId = uniqueId('error-toast')
    const now = dayjs.utc().utcOffset(dataCenter!.utcTimeZone)

    addToast({
      id: toastId,
      type: 'error',
      message: errorMessage,
      time: now.format('YYYY/MM/DD HH:mm'),
      onClose: () => removeToast(toastId),
    })
  }

  return showErrorToast
}
