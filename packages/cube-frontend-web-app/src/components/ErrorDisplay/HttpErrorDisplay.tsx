import { ErrorDisplay } from './ErrorDisplay'

type HttpErrorDisplayProps = {
  statusCode: number
}

// TODO: i18n.
const messages: Partial<Record<number, string>> = {
  403: 'Forbidden. You don’t have permission to access this page or resource.',
  404: "Page Not Found. The page you're looking for doesn't exist or has been moved.",
}

export const HttpErrorDisplay = (props: HttpErrorDisplayProps) => {
  const { statusCode } = props

  // TODO: i18n.
  const message = messages[statusCode] ?? 'Error occurred. Try again later.'

  return <ErrorDisplay title={statusCode.toString()} message={message} />
}
