import { LogConsole } from '@cube-frontend/web-app/components/LogConsole'

type ReleaseNotePanelProps = {
  releaseNote?: string
}

export const ReleaseNotePanel = (props: ReleaseNotePanelProps) => {
  const { releaseNote = '' } = props

  return <LogConsole>{releaseNote || 'No data'}</LogConsole>
}
