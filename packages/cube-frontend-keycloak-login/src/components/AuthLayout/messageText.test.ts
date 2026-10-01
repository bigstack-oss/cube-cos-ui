import { describe, expect, it } from 'vitest'
import { toFieldError, toPageMessageView, toPlainText } from './messageText'

describe('toPageMessageView', () => {
  it('shows errors and warnings as a nagging of the same type', () => {
    expect(
      toPageMessageView({ type: 'error', summary: 'Invalid code.' }),
    ).toEqual({ kind: 'nagging', type: 'error', text: 'Invalid code.' })
    expect(
      toPageMessageView({ type: 'warning', summary: 'Set up OTP.' }),
    ).toEqual({ kind: 'nagging', type: 'warning', text: 'Set up OTP.' })
  })

  it('shows info and success as information', () => {
    expect(toPageMessageView({ type: 'info', summary: 'Note.' })).toEqual({
      kind: 'information',
      text: 'Note.',
    })
    expect(toPageMessageView({ type: 'success', summary: 'Done.' })).toEqual({
      kind: 'information',
      text: 'Done.',
    })
  })

  it('shows nothing without a message or without text', () => {
    expect(toPageMessageView(undefined)).toBeUndefined()
    expect(toPageMessageView({ type: 'error', summary: ' ' })).toBeUndefined()
  })
})

describe('toPlainText', () => {
  it("turns Keycloak's <br> joins into spaces", () => {
    expect(
      toPlainText(
        'Invalid password: minimum length 8.<br>Must contain 1 digit.',
      ),
    ).toBe('Invalid password: minimum length 8. Must contain 1 digit.')
    expect(toPlainText('a<br/>b<BR />c')).toBe('a b c')
  })
})

describe('toFieldError', () => {
  it('keeps no error as no error', () => {
    expect(toFieldError(undefined)).toBeUndefined()
    expect(toFieldError('')).toBeUndefined()
    expect(toFieldError("Passwords don't match.")).toBe(
      "Passwords don't match.",
    )
  })
})
