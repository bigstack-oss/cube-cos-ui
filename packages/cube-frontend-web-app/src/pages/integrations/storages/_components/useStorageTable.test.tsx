// @vitest-environment jsdom
import { DataCenter } from '@cube-frontend/api'
import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { AxiosError, AxiosHeaders } from 'axios'
import { PropsWithChildren } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { integrationsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { parseErrorMessage } from '@cube-frontend/web-app/utils/errorMessage'
import { useStorageTable } from './useStorageTable'

const showErrorToast = vi.fn()

vi.mock('@cube-frontend/web-app/api/cosApi', () => ({
  integrationsApi: {
    listIntegrationStorages: vi.fn(),
    setStorageAsDefault: vi.fn(),
    verifyStorageIntegration: vi.fn(),
    deleteIntegrationStorage: vi.fn(),
  },
}))
vi.mock('@cube-frontend/web-app/hooks/usePolling', () => ({
  usePolling: () => undefined,
}))
vi.mock(
  '@cube-frontend/web-app/hooks/useShowErrorToast/useShowErrorToast',
  () => ({ useShowErrorToast: () => showErrorToast }),
)

const MANILA_MSG =
  'storage nfs1 is still used by Manila, delete these first: shares s1 (error)'

const apiError = (code: number, msg: string): AxiosError => {
  const config = { headers: new AxiosHeaders() }
  return new AxiosError(
    `Request failed with status code ${code}`,
    'ERR_BAD_REQUEST',
    config,
    undefined,
    {
      status: code,
      statusText: '',
      headers: {},
      config,
      data: { code, msg, status: 'status conflict' },
    },
  )
}

const renderStorageTable = () => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <DataCenterContext.Provider
      value={{
        dataCenter: { name: 'dc1', utcTimeZone: '+00:00' } as DataCenter,
        fetchDataCenters: undefined,
        isLoading: false,
      }}
    >
      {children}
    </DataCenterContext.Provider>
  )
  return renderHook(() => useStorageTable(), { wrapper })
}

describe('useStorageTable delete', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
    vi.restoreAllMocks()
  })

  it('shows the reason the API refused the delete with', async () => {
    vi.mocked(integrationsApi.listIntegrationStorages).mockResolvedValue({
      data: { code: 200, msg: '', status: 'ok', data: [] },
    } as never)
    vi.mocked(integrationsApi.deleteIntegrationStorage).mockRejectedValue(
      apiError(409, MANILA_MSG),
    )

    const { result } = renderStorageTable()
    await waitFor(() => expect(result.current.showLoading).toBe(false))

    act(() => result.current.rowActions.delete.openConfirmModal('nfs1'))
    await act(() => result.current.rowActions.delete.confirm())

    expect(showErrorToast).toHaveBeenCalledTimes(1)
    expect(parseErrorMessage(showErrorToast.mock.calls[0][0])).toBe(MANILA_MSG)
    expect(result.current.rowActions.delete.isConfirmModalOpen).toBe(false)
  })

  it('does not report a failed refresh after an accepted delete', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    vi.mocked(integrationsApi.listIntegrationStorages)
      .mockResolvedValueOnce({
        data: { code: 200, msg: '', status: 'ok', data: [] },
      } as never)
      .mockRejectedValueOnce(apiError(500, 'internal error'))
    vi.mocked(integrationsApi.deleteIntegrationStorage).mockResolvedValue({
      data: { code: 202, msg: '', status: 'accepted' },
    } as never)

    const { result } = renderStorageTable()
    await waitFor(() => expect(result.current.showLoading).toBe(false))

    act(() => result.current.rowActions.delete.openConfirmModal('nfs1'))
    await act(() => result.current.rowActions.delete.confirm())

    expect(integrationsApi.listIntegrationStorages).toHaveBeenCalledTimes(2)
    expect(showErrorToast).not.toHaveBeenCalled()
  })
})

describe('useStorageTable set default and verify', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it.each([
    ['setDefault', integrationsApi.setStorageAsDefault],
    ['verify', integrationsApi.verifyStorageIntegration],
  ] as const)(
    'shows the reason the API refused %s with',
    async (action, api) => {
      vi.mocked(integrationsApi.listIntegrationStorages).mockResolvedValue({
        data: { code: 200, msg: '', status: 'ok', data: [] },
      } as never)
      vi.mocked(api).mockRejectedValue(
        apiError(400, 'storage nfs1 is not ready'),
      )

      const { result } = renderStorageTable()
      await waitFor(() => expect(result.current.showLoading).toBe(false))

      await act(async () => {
        await result.current.rowActions[action]('nfs1')
      })

      expect(showErrorToast).toHaveBeenCalledTimes(1)
      expect(parseErrorMessage(showErrorToast.mock.calls[0][0])).toBe(
        'storage nfs1 is not ready',
      )
    },
  )
})
