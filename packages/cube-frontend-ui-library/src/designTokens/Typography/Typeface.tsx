import { PropsWithClassName } from '@cube-frontend/utils'
import classNames from 'classnames'

export type TypefaceProps = Required<PropsWithClassName> & {
  name: string
  fontHref: string
}

export const Typeface = (props: TypefaceProps) => {
  const { className, name, fontHref } = props

  return (
    <div className="flex items-center">
      <h1 className={classNames('w-60', className)}>{name}</h1>
      <a
        className="primary-body1 hover:underline"
        href={fontHref}
        target="_blank"
      >
        Download Link
      </a>
    </div>
  )
}
