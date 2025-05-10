import { useEffect, useRef, useState } from 'react'

type UseDelayedRepairState = {
  showRepairDoneText: boolean
  /**
   * Services that are in `ng` status when the Repair button is clicked.
   */
  observedServiceNames: Set<string>
  setObservedServiceNames: (names: Set<string>) => void
}

export const useDelayedRepairState = (
  isFixing: boolean,
): UseDelayedRepairState => {
  const [showRepairDoneText, setShowRepairDoneText] = useState(false)

  const [observedServiceNames, setObservedServiceNamesState] = useState<
    Set<string>
  >(() => new Set())

  const prevIsFixing = useRef(isFixing)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined

    if (prevIsFixing.current && !isFixing) {
      // Fixing status has transitioned from true to false.
      // Show the "Done!" text for a couple of seconds, then hide it and clear
      // the observed service names.
      setShowRepairDoneText(true)
      setTimeout(() => {
        setShowRepairDoneText(false)
        setObservedServiceNamesState(new Set())
      }, 3000)
    }

    prevIsFixing.current = isFixing

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isFixing])

  const setObservedServiceNames = (names: Set<string>): void => {
    setObservedServiceNamesState(names)
  }

  return {
    observedServiceNames,
    showRepairDoneText,
    setObservedServiceNames,
  }
}
