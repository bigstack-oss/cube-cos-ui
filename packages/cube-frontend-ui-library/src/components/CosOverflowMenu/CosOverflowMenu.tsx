import { assignRefValue } from '@cube-frontend/utils'
import { cva } from 'class-variance-authority'
import {
  cloneElement,
  ReactElement,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { useFloating } from '../../internal/utils/floating/useFloating'
import { CosOverflowMenuContext } from './CosOverflowMenuContext'
import { CosOverflowMenuDivider } from './CosOverflowMenuDivider'
import { CosOverflowMenuItem } from './CosOverflowMenuItem'
import { CosOverflowMenuTitle } from './CosOverflowMenuTitle'

type CosOverflowMenuProps = {
  triggerElement: ReactElement<{
    ref?: Ref<HTMLElement>
    onClick?: (e: ReactMouseEvent<HTMLElement>) => void
  }>
  children: ReactNode
}

const menu = cva(
  [
    'absolute z-10',
    'rounded-[5px] border border-functional-border-divider bg-grey-0 py-2',
    'shadow-[0px_0px_2px_0px_rgba(0,_0,_0,_0.20)]',
  ],
  {
    variants: {
      isOpen: {
        false: 'invisible',
      },
    },
  },
)

export const CosOverflowMenu = (props: CosOverflowMenuProps) => {
  const { triggerElement, children } = props

  const [isOpen, setIsOpen] = useState(false)

  const { anchorRef, elementRef, resolvedStyles } = useFloating({
    placement: 'bottom-left',
    offsets: {
      y: 8,
    },
  })

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const onOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isAnchor = anchorRef.current?.contains(target)
      const isMenu = elementRef.current?.contains(target)

      if (!isAnchor && !isMenu) {
        setIsOpen(false)
      }
    }

    window.addEventListener('click', onOutsideClick)

    return () => {
      window.removeEventListener('click', onOutsideClick)
    }
  }, [anchorRef, elementRef])

  const clonedAnchor = cloneElement(triggerElement, {
    ref: (element: HTMLElement | null) => {
      assignRefValue(triggerElement.props.ref, element)
      assignRefValue(anchorRef, element)
    },
    onClick: (e: ReactMouseEvent<HTMLElement>) => {
      setIsOpen((prev) => !prev)
      triggerElement.props.onClick?.(e)
    },
  })

  return (
    <CosOverflowMenuContext.Provider value={closeMenu}>
      {clonedAnchor}
      {createPortal(
        <div
          ref={elementRef}
          className={menu({ isOpen })}
          style={resolvedStyles?.floatingStyle}
        >
          {children}
        </div>,
        document.body,
      )}
    </CosOverflowMenuContext.Provider>
  )
}

CosOverflowMenu.Item = CosOverflowMenuItem
CosOverflowMenu.Divider = CosOverflowMenuDivider
CosOverflowMenu.Title = CosOverflowMenuTitle
