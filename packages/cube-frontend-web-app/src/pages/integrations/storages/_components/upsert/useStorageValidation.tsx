import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useOpenState } from '@cube-frontend/web-app/hooks/useOpenState/useOpenState'
import { useCallback, useContext, useState } from 'react'
import { mockValidateStorages } from '../../mock'
import {
  ParsedStorageForm,
  validateStorageResponseToLog,
} from '../../storageUtils'

export const useStorageValidation = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const [validationLog, setValidationLog] = useState('')
  const validationLogPanel = useOpenState(true)

  const {
    isLoading: isValidating,
    errorState: validationErrorState,
    mutateResource: validateStorage,
    // @ts-expect-error: mock function for testing
  } = useCosMutationRequest(mockValidateStorages)

  const clearValidationLog = useCallback(() => setValidationLog(''), [])

  const validate = async (parsedStorage: ParsedStorageForm): Promise<void> => {
    validationLogPanel.open()

    try {
      // @ts-expect-error: mock function for testing
      const data = await validateStorage({
        dataCenter: dataCenter!.name,
        storage: parsedStorage,
      })
      setValidationLog(validateStorageResponseToLog(data))
    } catch (error) {
      console.error('Validate storage error: ', error)
      clearValidationLog()
    }
  }

  const isValidated = !!validationLog

  return {
    validate,
    isValidated,
    isValidating,
    validationLog,
    validationLogPanel,
    validationErrorState,
    clearValidationLog,
  }
}
