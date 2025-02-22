import { PropsWithClassName } from '@cube-frontend/utils'
import classNames from 'classnames'
import { CosHyperlink } from '../../../components/CosHyperlink/CosHyperlink'

export type TypefaceProps = Required<PropsWithClassName> & {
  name: string
  fontHref: string
}

export const Typeface = (props: TypefaceProps) => {
  const { className, name, fontHref } = props

  return (
    <div className="flex items-center">
      <h1 className={classNames('w-60', className)}>{name}</h1>
      <CosHyperlink variant="text-inline" href={fontHref} target="_blank">
        Download Link
      </CosHyperlink>
    </div>
  )
}
