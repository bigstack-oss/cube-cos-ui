import { SvgComponent } from '../../../components/CosIcon/CosIcon'

const getFilename = (path: string) => {
  return path.split('/').pop()?.replace('.svg', '')
}

const getIcons = (modules: Record<string, unknown>) => {
  return Object.entries(modules)
    .map(([path, module]) => {
      const filename = getFilename(path)
      if (!filename) throw new Error('Invalid filename')

      const Component = (module as { default: SvgComponent }).default

      return { filename, Component }
    })
    .sort((a, b) => a.filename.localeCompare(b.filename))
}

const monochromeModule = import.meta.glob(
  '../../../components/CosIcon/monochrome/*.svg',
  { eager: true, query: 'react' },
)
const coloredModule = import.meta.glob(
  '../../../components/CosIcon/colored/*.svg',
  { eager: true, query: 'react' },
)

export const monochromeIcons = getIcons(monochromeModule)
export const coloredIcons = getIcons(coloredModule)

export const renderSizeRow = (title: string, icon: React.ReactNode) => (
  <div className="flex h-16 items-center">
    <h3 className="min-w-[180px] font-inter text-secondary-h5 text-functional-text">
      {title}
    </h3>
    {icon}
  </div>
)
