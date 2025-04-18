import { useState } from 'react'

type UseExpandedRowIdSet = {
  expandedRowIdSet: Set<string>
  onExpandChange: (parentRowId: string, value: boolean) => void
  resetExpandedRowIdSet: () => void
}

export const useExpandedRowIdSet = (): UseExpandedRowIdSet => {
  const [expandedRowIdSet, setExpandedRowIdSet] = useState<Set<string>>(
    () => new Set(),
  )

  const onExpandChange = (parentRowId: string, value: boolean): void => {
    setExpandedRowIdSet((prev) => {
      const next = new Set(prev)
      if (value) {
        next.add(parentRowId)
      } else {
        next.delete(parentRowId)
      }
      return next
    })
  }

  const resetExpandedRowIdSet = (): void => {
    setExpandedRowIdSet(new Set())
  }

  return {
    expandedRowIdSet,
    onExpandChange,
    resetExpandedRowIdSet,
  }
}
