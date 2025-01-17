import { PropsWithClassName } from '@cube-frontend/utils'

export const CubeLeft = (props: PropsWithClassName) => {
  const { className } = props

  return (
    <svg
      className={className}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.96908 21.6725C5.36405 21.366 5.00776 20.7837 5.02457 20.1571L4.95062 11.9881C4.96743 11.4568 5.52875 11.1333 5.98252 11.3955L8.60428 12.9006C8.83284 13.0335 8.96729 13.2854 8.95385 13.5544L8.87654 17.6747C8.84629 18.4818 9.03115 19.0402 9.43114 19.5272C9.6429 19.786 9.90171 20.0005 10.1874 20.1674L13.9722 22.425C14.1839 22.551 14.315 22.786 14.315 23.038V25.534C14.315 26.0754 13.747 26.4159 13.2831 26.1503L5.96908 21.6725Z"
        fill="currentColor"
      />
    </svg>
  )
}
