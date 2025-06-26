import { useContext } from 'react'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { CosBackButtonContext } from './cosBackButtonContext'

type DetailsProps = {
  children: string
}

export const Details = (props: DetailsProps) => {
  const { children } = props

  const { isLoading } = useContext(CosBackButtonContext)

  return isLoading ? (
    <CosSkeleton className="h-[22px] w-[49px]" />
  ) : (
    <span className="primary-body1 text-functional-text-light">{children}</span>
  )
}
