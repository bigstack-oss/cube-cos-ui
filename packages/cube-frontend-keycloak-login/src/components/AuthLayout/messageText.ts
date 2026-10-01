import { KeycloakMessage } from '../../keycloakLoginContext'

/**
 * Keycloak joins several messages for one field with `<br>` (a password
 * policy can fail more than one rule at once). The pages render text, not
 * HTML, so turn those breaks back into plain spacing.
 */
export const toPlainText = (text: string): string =>
  text
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/** The field error to show, or `undefined` when Keycloak reported none. */
export const toFieldError = (text: string | undefined): string | undefined => {
  const plainText = text === undefined ? '' : toPlainText(text)
  return plainText || undefined
}

export type PageMessageView =
  | { kind: 'information'; text: string }
  | { kind: 'nagging'; type: 'error' | 'warning'; text: string }

/**
 * Info and success messages read as information; errors and warnings need the
 * user to act, so they are shown as a nagging.
 */
export const toPageMessageView = (
  message: KeycloakMessage | undefined,
): PageMessageView | undefined => {
  const text = message ? toPlainText(message.summary) : ''
  if (!message || !text) {
    return undefined
  }

  switch (message.type) {
    case 'error':
    case 'warning':
      return { kind: 'nagging', type: message.type, text }
    case 'success':
    case 'info':
    default:
      return { kind: 'information', text }
  }
}
