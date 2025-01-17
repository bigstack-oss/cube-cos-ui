import { PropsWithClassName } from '@cube-frontend/utils'

export const CubeRight = (props: PropsWithClassName) => {
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
        d="M24.95 19.8473L25.0474 12.2945C25.0878 11.7258 24.4895 11.3411 24.0088 11.6305L16.7486 15.7849C16.5368 15.9108 15.9116 16.3637 15.9116 17.1469V25.5408C15.9116 26.089 16.4931 26.4295 16.9536 26.1503C16.9536 26.1503 24.0357 21.9108 24.234 21.7099C24.4323 21.509 24.95 21.1957 24.95 19.8473Z"
        fill="currentColor"
      />
    </svg>
  )
}
