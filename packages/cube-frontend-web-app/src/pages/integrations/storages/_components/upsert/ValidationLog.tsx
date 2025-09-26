import { CosLogConsole } from '@cube-frontend/ui-library'

type ValidationLogProps = {
  log: string
}

export const ValidationLog = (props: ValidationLogProps) => {
  const { log } = props
  return <CosLogConsole>{log || 'No result'}</CosLogConsole>
}
