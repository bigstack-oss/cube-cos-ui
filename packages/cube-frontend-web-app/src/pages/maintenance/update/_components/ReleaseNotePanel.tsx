import { CosLogConsole } from '@cube-frontend/ui-library'

type ReleaseNotePanelProps = {
  releaseNote?: string
}

export const ReleaseNotePanel = (props: ReleaseNotePanelProps) => {
  const { releaseNote = '' } = props

  return <CosLogConsole>{releaseNote || 'No data'}</CosLogConsole>
}
