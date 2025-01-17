import { PropsWithClassName } from '@cube-frontend/utils'

export const CubeTop = (props: PropsWithClassName) => {
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
        d="M6.05312 8.78375L14.5268 3.83939C14.7352 3.7202 14.994 3.7202 15.2024 3.83939L23.5349 8.47728C24.0021 8.74629 24.0088 9.43074 23.545 9.70656L15.0511 14.6373C14.836 14.7667 14.5671 14.7667 14.352 14.6373L6.03968 10.013C5.57583 9.73721 5.58255 9.04936 6.05312 8.78375Z"
        fill="currentColor"
      />
    </svg>
  )
}
