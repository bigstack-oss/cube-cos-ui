import { LogConsole } from '@cube-frontend/web-app/components/LogConsole'

type ValidationLogProps = {
  log: string
}

export const ValidationLog = (props: ValidationLogProps) => {
  const { log } = props
  return <LogConsole>{log || 'No result'}</LogConsole>
}
