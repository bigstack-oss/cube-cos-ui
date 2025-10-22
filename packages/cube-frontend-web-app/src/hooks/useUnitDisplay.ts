import { useTranslation } from 'react-i18next'
import { toUnitAbbreviation } from '../utils/unit'

export const useUnitDisplay = () => {
  const { t } = useTranslation()

  const toUnitDisplay = (unit: string, unitSuffix = '') => {
    const unitAbbreviation = toUnitAbbreviation(unit)

    const unitDisplay = t(`common.unit.${unitAbbreviation}`, unitAbbreviation)

    return `${unitDisplay}${unitSuffix}`
  }

  return { toUnitDisplay }
}
