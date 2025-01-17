import { PropsWithClassName } from '@cube-frontend/utils'

export const Dot120 = (props: PropsWithClassName) => {
  const { className } = props

  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.138 6.905c.59.003 1.065.482 1.062 1.071v.048a1.067 1.067 0 1 1-2.133.01v-.068a1.067 1.067 0 0 1 1.071-1.061Zm11.723 0a1.067 1.067 0 0 1 1.072 1.061v.068a1.067 1.067 0 1 1-2.133-.01v-.048a1.067 1.067 0 0 1 1.061-1.071ZM3.082 11.37a1.067 1.067 0 0 1 1.508.008l.033.033a1.067 1.067 0 1 1-1.548 1.468 1.067 1.067 0 0 1 .007-1.509Zm9.838 0a1.067 1.067 0 0 1-.04 1.556 1.067 1.067 0 0 1-1.501-1.515l.033-.033a1.067 1.067 0 0 1 1.508-.008Zm-6.014 2.492a1.067 1.067 0 0 1 1.07-1.062h.047a1.067 1.067 0 0 1 .01 2.133h-.067a1.067 1.067 0 0 1-1.061-1.072Z"
        fill="currentColor"
      />
    </svg>
  )
}
