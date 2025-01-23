export type WithHoverContent = {
  hoverContent: CosTooltipInformation
}

export type WithClickContent = {
  clickContent: CosTooltipInformation
}

export type CosTooltipInformation = {
  title?: string
  subtext?: string
  message: string
}

export type VisibilityState = 'hover' | 'click' | undefined
