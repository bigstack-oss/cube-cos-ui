import React from 'react'
import { twMerge } from 'tailwind-merge'

export type StorageFormSectionProps = {
  title?: string
  children: React.ReactNode
  className?: string
}

export const StorageFormSection = (props: StorageFormSectionProps) => {
  const { title, children, className } = props

  return (
    <div className={twMerge('flex flex-col gap-y-4', className)}>
      {title && <h5 className="secondary-h5 text-functional-text">{title}</h5>}
      <div className="flex flex-col gap-y-4">{children}</div>
    </div>
  )
}
