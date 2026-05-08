import { ReactNode } from 'react'
import { INFO_TABLE_COLUMN_SYMBOL, InfoTableRow } from './infoTableUtils'

export type InfoTableColumnProps<
  Row extends InfoTableRow,
  Property extends keyof Row | never,
> = {
  label?: ReactNode
  property?: Property
  children?:
    | ReactNode
    | ((
        propertyValue: Property extends keyof Row ? Row[Property] : undefined,
        row: Row,
        rowIndex: number,
      ) => ReactNode)
}

export const CreateInfoTableColumn = <Row extends InfoTableRow>() => {
  type ColumnProps<Property extends keyof Row | never> = InfoTableColumnProps<
    Row,
    Property
  >

  const InfoTableColumn = <Property extends keyof Row | never = never>(
    _props: ColumnProps<Property>,
  ) => {
    return undefined
  }

  InfoTableColumn[INFO_TABLE_COLUMN_SYMBOL] = true

  return InfoTableColumn
}
