import { EmailSenderTls } from '@cube-frontend/api'
import { TFunction } from 'i18next'
import { describe, expect, it } from 'vitest'
import { validateBySchema } from '@cube-frontend/web-app/utils/zod'
import {
  rowToEmailSenderPatchRequest,
  rowToEmailSenderPostRequest,
} from './emailSenderMappers'
import {
  createEmailSenderSchema,
  createNewRow,
  EmailSenderRow,
} from './emailSendersUtils'

const t = ((key: string) => key) as unknown as TFunction

const schema = createEmailSenderSchema(t)

const createRow = (overrides: Partial<EmailSenderRow>): EmailSenderRow => ({
  ...createNewRow(),
  host: 'relay.example.internal',
  port: '25',
  from: 'noreply@example.com',
  ...overrides,
})

describe('createEmailSenderSchema', () => {
  it.each([
    {
      name: 'saves an anonymous relay without credentials',
      row: createRow({ auth: false, tls: EmailSenderTls.None }),
      want: {},
    },
    {
      name: 'saves an authenticated relay with a username and no password',
      row: createRow({ auth: true, username: 'user' }),
      want: {},
    },
    {
      name: 'requires a username when authentication is on',
      row: createRow({ auth: true, username: '' }),
      want: { username: 'settings.emailSender.usernameCantBeEmpty' },
    },
    {
      name: 'rejects an unknown tls policy',
      row: createRow({ auth: false, tls: 'starttls' as EmailSenderTls }),
      want: { tls: expect.any(String) },
    },
  ])('$name', ({ row, want }) => {
    expect(validateBySchema(schema, row)).toEqual(want)
  })

  it('still reports the other fields when authentication is on', () => {
    const row = createRow({ auth: true, username: '', host: '', port: 'x' })
    expect(Object.keys(validateBySchema(schema, row)).sort()).toEqual([
      'host',
      'port',
      'username',
    ])
  })
})

describe('email sender request mappers', () => {
  it.each([
    { name: 'post', map: rowToEmailSenderPostRequest },
    { name: 'patch', map: rowToEmailSenderPatchRequest },
  ])(
    '$name leaves the credentials out when authentication is off',
    ({ map }) => {
      const row = createRow({
        auth: false,
        tls: EmailSenderTls.None,
        username: 'stale',
        password: 'stale',
      })

      expect(map(row)).toEqual({
        host: 'relay.example.internal',
        port: 25,
        from: 'noreply@example.com',
        auth: false,
        tls: EmailSenderTls.None,
      })
    },
  )

  it.each([
    { name: 'post', map: rowToEmailSenderPostRequest },
    { name: 'patch', map: rowToEmailSenderPatchRequest },
  ])('$name sends the credentials when authentication is on', ({ map }) => {
    const row = createRow({
      auth: true,
      tls: EmailSenderTls.Mandatory,
      username: 'user',
      password: 'secret',
    })

    expect(map(row)).toMatchObject({
      auth: true,
      tls: EmailSenderTls.Mandatory,
      username: 'user',
      password: 'secret',
    })
  })
})
