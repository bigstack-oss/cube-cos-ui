import { uniqueId } from 'lodash'
import { useState } from 'react'

export type UseOperationErrors = {
  operationErrors: OperationError[]
  onOperationErrorOccur: (errorMessage: string) => void
  onOperationErrorClose: (index: number) => void
}

type OperationError = {
  id: string
  message: string
}

const getNewId = (): string => {
  return uniqueId('operationError')
}

const MAX_ERROR_COUNT = 5

export const useOperationErrors = (): UseOperationErrors => {
  const [operationErrors, setOperationErrors] = useState<OperationError[]>([])

  const onOperationErrorOccur = (errorMessage: string): void => {
    setOperationErrors((prev) => {
      const next = [
        ...prev,
        {
          id: getNewId(),
          message: errorMessage,
        },
      ]
      if (next.length > MAX_ERROR_COUNT) {
        next.shift()
      }
      return next
    })
  }

  const onOperationErrorClose = (index: number): void => {
    setOperationErrors((prev) => {
      const next = [...prev]
      next.splice(index, 1)
      return next
    })
  }

  return {
    operationErrors,
    onOperationErrorOccur,
    onOperationErrorClose,
  }
}
