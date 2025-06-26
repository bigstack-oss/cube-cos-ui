import { useContext } from 'react'
import { CosHyperlink, CosHyperlinkProps } from '../CosHyperlink/CosHyperlink'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { CosBackButtonContext } from './cosBackButtonContext'

type LinkProps = Pick<
  CosHyperlinkProps,
  'children' | 'href' | 'target' | 'onClick'
>

export const Link = (props: LinkProps) => {
  const { isLoading } = useContext(CosBackButtonContext)

  return isLoading ? (
    <CosSkeleton className="h-4 w-[60px]" />
  ) : (
    <CosHyperlink {...props} variant="text-only" />
  )
}
