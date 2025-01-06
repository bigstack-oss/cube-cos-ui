import { IconProps, computeIconClassName } from './iconUtils'

export const Home01 = (props: IconProps) => {
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
          d="M6 9.43522V14L3.2 14C2.53726 14 2 13.4891 2 12.8588V6.27737C2 6.0311 2.12534 5.80007 2.33638 5.65735L7.53638 2.14078C7.81395 1.95307 8.18605 1.95307 8.46362 2.14078L13.6636 5.65735C13.8747 5.80007 14 6.0311 14 6.27737V12.8588C14 13.4891 13.4627 14 12.8 14L10 14V9.43522C10 9.01504 9.64183 8.67442 9.2 8.67442H6.8C6.35817 8.67442 6 9.01504 6 9.43522Z"
          stroke="currentcolor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
