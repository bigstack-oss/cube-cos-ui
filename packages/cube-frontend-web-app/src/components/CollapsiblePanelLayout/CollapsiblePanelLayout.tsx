import { cva } from 'class-variance-authority'
import { ReactElement } from 'react'
import { LeftPanel, LeftPanelProps } from './LeftPanel'
import { RightPanel, RightPanelProps } from './RightPanel'
import { useCollapsiblePanels } from './useCollapsiblePanels'
import { CollapsiblePanelsContext } from './collapsiblePanelsContext'

type CollapsiblePanelLayoutProps = {
  /**
   * Whether the right panel is open by default
   * @default true
   */
  defaultPanelOpen?: boolean
  /**
   * If provided, this prop controls whether the right panel is open.
   * The component becomes controlled and will always reflect the value of `isRightPanelOpen`.
   *
   * Use `onRightPanelOpenChange` to respond to user interactions
   * and update the state in the parent.
   *
   * If omitted, the component manages its own open/close state internally
   * starting from `defaultRightPanelOpen`.
   */
  isControlledPanelOpen?: boolean
  /**
   * Useful only when `isRightPanelOpen` is controlled.
   */
  onControlledPanelOpenChange?: (open: boolean) => void
  /**
   * Width of the right panel as a percentage of the container (0-100)
   * @default 50
   */
  rightPanelWidthPercentage?: number
  children: [
    ReactElement<LeftPanelProps, typeof LeftPanel>,
    ReactElement<RightPanelProps, typeof RightPanel>,
  ]
}

const layout = cva('flex items-start', {
  variants: {
    isOpen: {
      true: 'gap-x-4',
    },
  },
})

export const CollapsiblePanelLayout = (props: CollapsiblePanelLayoutProps) => {
  const {
    defaultPanelOpen = true,
    isControlledPanelOpen,
    onControlledPanelOpenChange,
    rightPanelWidthPercentage = 50,
    children,
  } = props

  const [leftPanel, rightPanel] = children

  if (leftPanel.type !== LeftPanel) {
    throw new Error(
      'CollapsiblePanelLayout: first child must be <CollapsiblePanelLayout.LeftPanel>',
    )
  }

  if (rightPanel.type !== RightPanel) {
    throw new Error(
      'CollapsiblePanelLayout: second child must be <CollapsiblePanelLayout.RightPanel>',
    )
  }

  const { isOpen, toggleOpen, close } = useCollapsiblePanels({
    defaultPanelOpen,
    isControlledPanelOpen,
    onControlledPanelOpenChange,
  })

  // Ensure the panel width percentage stays within 0-100.
  const clampedWidth = Math.min(100, Math.max(0, rightPanelWidthPercentage))

  // Convert the clamped percentage into a CSS width calculation,
  // leaving 16px as the gap between left and right panels.
  const rightPanelWidth = `calc((100% - 16px) * ${clampedWidth / 100})`

  return (
    <CollapsiblePanelsContext.Provider
      value={{ rightPanelWidth, isOpen, toggleOpen, close }}
    >
      <div className={layout({ isOpen })}>{children}</div>
    </CollapsiblePanelsContext.Provider>
  )
}

CollapsiblePanelLayout.LeftPanel = LeftPanel
CollapsiblePanelLayout.RightPanel = RightPanel
