import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export const bodyTrCellBorderRadiusClass = twMerge(
  '[&:last-of-type>td:first-of-type]:rounded-bl-[5px]',
  '[&:last-of-type>td:last-of-type]:rounded-br-[5px]',
)

export const cosTableStyles = {
  table: cva('w-full border-separate border-spacing-0'),
  th: cva(
    [
      'secondary-body3 px-4 py-2 text-left text-functional-text-light',
      'border-y border-functional-border-divider bg-scene-background',
      'first-of-type:border-l last-of-type:border-r',
    ],
    {
      variants: {
        isTableEmpty: {
          true: 'first-of-type:rounded-l-[5px] last-of-type:rounded-r-[5px]',
          false: 'first-of-type:rounded-tl-[5px] last-of-type:rounded-tr-[5px]',
        },
      },
    },
  ),
  td: cva(
    [
      'primary-body4 px-4 py-2.5 text-functional-text',
      'border-b border-b-functional-border-divider bg-grey-0',
      'first-of-type:border-l last-of-type:border-r',
    ],
    {
      variants: {
        emphasize: {
          true: 'font-semibold',
        },
        fitContent: {
          /**
           * Workaround:
           * `w-0` is used to prevent the table cell from expanding.
           * `w-fit` doesn't work when target element is a table cell.
           **/
          true: 'w-0',
        },
      },
    },
  ),
  bodyTr: cva(bodyTrCellBorderRadiusClass, {
    variants: {
      isHoverable: {
        true: '[&>td]:hover:bg-functional-hover-grey',
      },
    },
    defaultVariants: {
      isHoverable: true,
    },
  }),
}
