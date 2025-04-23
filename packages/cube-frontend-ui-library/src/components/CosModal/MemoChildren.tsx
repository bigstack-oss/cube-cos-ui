import React from 'react'

export type MemoChildrenProps = {
  shouldUpdate: boolean
  children: React.ReactNode
}

/**
 * `MemoChildren` is a wrapper that prevents re-rendering of its children
 * unless `shouldUpdate` is set to true.
 *
 * This is useful for UI elements that should remain stable while parent states,
 * such as `isLoading` are toggling, to prevent flicker or layout shifts.
 */
export default React.memo(
  ({ children }: MemoChildrenProps) => children as React.ReactElement,
  (_, { shouldUpdate }) => !shouldUpdate,
)
