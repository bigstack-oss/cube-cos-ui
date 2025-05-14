import { twMerge } from 'tailwind-merge'

export type CosDetailsTableRowProps = {
  title: string
  children: string
}

const tdBorderRadiusClass = twMerge(
  '[&:first-of-type>*]:border-t',
  '[&:last-of-type>*:first-child]:rounded-bl-[5px]',
  '[&:last-of-type>*:last-child]:rounded-br-[5px]',
)

const cellClass = twMerge(
  'primary-body4 whitespace-nowrap px-4 py-2.5 text-left',
  'border-b border-b-functional-border-divider bg-grey-0',
  'first:border-l last:border-r',
)

export const CosDetailsTableRow = (props: CosDetailsTableRowProps) => {
  const { title, children } = props

  return (
    <tr className={tdBorderRadiusClass}>
      <th className={twMerge(cellClass, 'font-semibold text-functional-text')}>
        {title}
      </th>
      <td className={twMerge(cellClass, 'text-functional-text-light')}>
        {children}
      </td>
    </tr>
  )
}
