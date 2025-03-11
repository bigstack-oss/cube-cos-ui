import { range } from 'lodash'
import { Ref, useEffect, useRef, useState } from 'react'

export type UseIsVisible<Element extends HTMLElement> = {
  elementRef: Ref<Element | null>
  isVisible: boolean
}

const thresholds = range(0, 20).map((i) => (i + 1) / 20)

export const useIsVisible = <
  Element extends HTMLElement,
>(): UseIsVisible<Element> => {
  const elementRef = useRef<Element | null>(null)

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        setIsVisible(!!entry && entry.intersectionRatio >= 0.5)
      },
      {
        threshold: thresholds,
      },
    )

    const element = elementRef.current

    if (element) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return {
    elementRef,
    isVisible,
  }
}
