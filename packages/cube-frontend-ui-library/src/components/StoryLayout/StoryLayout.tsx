import { ReactNode } from 'react'
import { INTERNAL_StorySection } from './InternalStorySection'

export type StoryLayoutProps = {
  title: string
  desc?: string
  children: ReactNode
}

export const StoryLayout = (props: StoryLayoutProps) => {
  const { title, desc, children } = props

  return (
    <section className="flex flex-col p-8">
      <div className="mb-24 flex flex-col gap-y-4">
        <h2 className="secondary-h2 text-6xl text-neutral-900">{title}</h2>
        {desc && <p className="primary-body1 text-dark-300">{desc}</p>}
      </div>
      <div className="flex flex-col gap-y-24">{children}</div>
    </section>
  )
}

StoryLayout.Section = INTERNAL_StorySection
