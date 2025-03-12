import { noop } from 'lodash'
import { CosDropdown } from '../../../../components/CosDropdown/CosDropdown'
import { CosTooltip } from '../../../../components/CosTooltip/CosTooltip'
import InformationCircle from '../../../../components/CosIcon/monochrome/information_circle.svg?react'

export const PanelDropdown = () => {
  return (
    <CosDropdown selectedItems={['Option']}>
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
    <CosTooltip clickContent={{ message: 'Message' }}>
      <InformationCircle className="icon-lg cursor-pointer" />
    </CosTooltip>
  )
}
