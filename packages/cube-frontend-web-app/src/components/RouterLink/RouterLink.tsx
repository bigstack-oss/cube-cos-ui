import { cloneElement, MouseEvent, ReactElement } from 'react'
import { useNavigate } from 'react-router'

export type RouterLinkProps = {
  href: string
  children: ReactElement<{
    href: string
    onClick?: (e: MouseEvent) => void
  }>
}

/**
 * UI library components are environment-agnostic, so clicking an `<a>` tag
 * will cause a page refresh due to its default behavior.
 * Wrap them with this component to enable navigation via React Router.
 */
export const RouterLink = (props: RouterLinkProps) => {
  const { href, children } = props

  const navigate = useNavigate()

  return cloneElement(children, {
    href,
    onClick: (e) => {
      e.preventDefault()
      navigate(href)
    },
  })
}
