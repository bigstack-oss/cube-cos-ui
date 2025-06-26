import { useContext } from 'react'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { CosBackButtonContext } from './cosBackButtonContext'

type TitleProps = {
  children: string
}

export const Title = (props: TitleProps) => {
  const { children } = props

  const { isLoading } = useContext(CosBackButtonContext)

  return isLoading ? (
    <CosSkeleton className="h-6 w-[92px]" />
  ) : (
    <div className="primary-h3 text-functional-title">{children}</div>
  )
}
