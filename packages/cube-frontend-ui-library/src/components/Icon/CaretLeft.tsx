import { IconProps, computeIconClassName } from './iconUtils'

export const CaretLeft = (props: IconProps) => {
  return (
    <svg
      className={computeIconClassName(props)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M10.25 12.5L5.75 8L10.25 3.5"
          stroke="currentcolor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
