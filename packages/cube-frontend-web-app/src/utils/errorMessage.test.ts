import { AxiosError } from 'axios'
import { describe, expect, it } from 'vitest'
import { CosRequestError } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { parseErrorMessage } from './errorMessage'

const cosRequestError = (msg: string): CosRequestError => ({
  native: new AxiosError('Request failed with status code 409'),
  api: { code: 409, msg, status: 'status conflict' },
})

describe('parseErrorMessage', () => {
  it('reads the API message from a CosRequestError', () => {
    expect(parseErrorMessage(cosRequestError('storage nfs1 is in use'))).toBe(
      'storage nfs1 is in use',
    )
  })

  it('falls back to the HTTP message when the API message is empty', () => {
    expect(parseErrorMessage(cosRequestError(''))).toBe(
      'Request failed with status code 409',
    )
  })
})
