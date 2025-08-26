import { noop } from 'lodash'
import { CosButton } from '../../../../components/CosButton/CosButton'
import { CosDropdown } from '../../../../components/CosDropdown/CosDropdown'
import { CosTooltip } from '../../../../components/CosTooltip/CosTooltip'
import InformationCircle from '../../../../components/CosIcon/monochrome/information_circle.svg?react'

export const PanelButton = () => (
  <CosButton size="sm" type="primary">
    Call to Action
  </CosButton>
)

export const PanelDropdown = () => {
  return (
    <CosDropdown type="radio" selectedItems={['Option']}>
      <CosDropdown.Trigger placeholder="Select a Country">
        Option
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        <CosDropdown.Item item="Option" onClick={noop}>
          Option
        </CosDropdown.Item>
      </CosDropdown.Menu>
    </CosDropdown>
  )
}

export const PanelIcon = () => {
  return (
    <CosTooltip hoverContent={{ message: 'Message' }}>
      <InformationCircle className="icon-lg cursor-pointer" />
    </CosTooltip>
  )
}
