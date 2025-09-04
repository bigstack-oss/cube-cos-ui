import {
  CosCollapsiblePanelLayout,
  CosCollapsiblePanelLayoutProps,
} from '../../../components/CosCollapsiblePanelLayout/CosCollapsiblePanelLayout'

type CollapsiblePanelLayoutProps = Omit<
  CosCollapsiblePanelLayoutProps,
  'children'
> & {
  customToggleButton?: React.ReactElement<{ onClick?: React.MouseEventHandler }>
}

export const CollapsiblePanelLayout = (props: CollapsiblePanelLayoutProps) => {
  const { customToggleButton, ...restProps } = props
  return (
    <CosCollapsiblePanelLayout {...restProps}>
      <CosCollapsiblePanelLayout.LeftPanel
        topic="Left Panel"
        customToggleButton={customToggleButton}
      >
        Content
      </CosCollapsiblePanelLayout.LeftPanel>
      <CosCollapsiblePanelLayout.RightPanel topic="Right Panel">
        Content
      </CosCollapsiblePanelLayout.RightPanel>
    </CosCollapsiblePanelLayout>
  )
}
