import { IconProps, computeIconClassName } from './iconUtils'

export const X = (props: IconProps) => {
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
          id="Icon"
          d="M12.5 3.5L3.5 12.5M12.5 12.5L3.5 3.5"
          stroke="currentcolor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  )
}
