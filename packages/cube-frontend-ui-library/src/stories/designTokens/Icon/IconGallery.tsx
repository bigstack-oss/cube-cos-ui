import { useState } from 'react'
import {
  StoryLayout,
  StoryLayoutProps,
} from '../../../internal/components/StoryLayout/StoryLayout'
import { IconGalleryItem } from './IconGalleryItem'
import { IconSize, SvgComponent } from '../../../components/CosIcon/CosIcon'
import { CosInput } from '../../../components/CosInput/CosInput'

export type IconGalleryItemProps = Omit<StoryLayoutProps, 'children'> & {
  size?: IconSize
  className?: string
  icons: {
    filename: string
    Component: SvgComponent
  }[]
  onIconClick?: () => void
}

const isIgnoreCaseMatch = (filename: string, search: string) => {
  return filename.toLowerCase().includes(search.toLowerCase())
}

export const IconGallery = (props: IconGalleryItemProps) => {
  const { title, desc, size, className, icons, onIconClick } = props

  const [search, setSearch] = useState('')

  return (
    <StoryLayout title={title} desc={desc}>
      <div className="flex flex-col gap-y-8">
        <CosInput
          placeholder='Search for an icon (e.g. "home")'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap">
          {icons
            .filter((icon) => isIgnoreCaseMatch(icon.filename, search))
            .map((icon, index) => (
              <IconGalleryItem
                key={index}
                name={icon.filename}
                size={size}
                className={className}
                Component={icon.Component}
                onIconClick={onIconClick}
              />
            ))}
        </div>
      </div>
    </StoryLayout>
  )
}
