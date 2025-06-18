import { Typography } from '@cube-frontend/ui-theme'

export type FontConfigurationInfoProps = {
  typography: Typography
}

export const FontConfigurationInfo = (props: FontConfigurationInfoProps) => {
  const {
    typography: { fontFamily, fontSize, lineHeight, letterSpacing },
  } = props

  const renderInfo = (label: string, value: string | number | undefined) => {
    return <div>{`${label}: ${value || 'normal'};`}</div>
  }

  return (
    <div className="primary-body2 grid grid-cols-2 gap-x-4 text-xs text-gray-500">
      <div className="flex flex-col gap-y-2">
        {renderInfo('Font Family', fontFamily)}
        {renderInfo('Font Size', fontSize)}
      </div>
      <div className="flex flex-col gap-y-2">
        {renderInfo('Line Height', lineHeight)}
        {renderInfo('Letter Spacing', letterSpacing)}
      </div>
    </div>
  )
}
