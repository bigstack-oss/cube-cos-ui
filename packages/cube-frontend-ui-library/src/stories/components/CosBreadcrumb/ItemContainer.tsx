import { PropsWithChildren } from 'react'

export const ItemContainer = (props: PropsWithChildren) => (
  <a className="underline decoration-functional-hover-primary underline-offset-4">
    {props.children}
  </a>
)
