import { ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { INTERNAL_StorySection } from './InternalStorySection'
import { twMerge } from 'tailwind-merge'

const storyLayout = cva('flex min-h-screen flex-col p-12', {
  variants: {
    useSceneBgColor: {
      true: 'bg-scene-background',
    },
  },
})

export type StoryLayoutProps = {
  title: string
  desc?: string
  useSceneBgColor?: boolean
  children: ReactNode
}

export const StoryLayout = (props: StoryLayoutProps) => {
  const { title, desc, useSceneBgColor = false, children } = props

  return (
    <section className={twMerge(storyLayout({ useSceneBgColor }))}>
      <div className="mb-24 flex flex-col gap-y-4">
        <h2 className="secondary-h2 text-6xl text-neutral-900">{title}</h2>
        {desc && <p className="primary-body1 text-dark-300">{desc}</p>}
      </div>
      <div className="flex flex-col gap-y-24">{children}</div>
    </section>
  )
}

StoryLayout.Section = INTERNAL_StorySection
