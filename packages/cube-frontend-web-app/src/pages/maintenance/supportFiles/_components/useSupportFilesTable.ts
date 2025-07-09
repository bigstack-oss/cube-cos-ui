import { useContext, useState } from 'react'
import { SupportFileRow } from '../MaintenanceSupportFilesPage'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { supportFilesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { SupportFilesApiGetSupportFilesRequest } from '@cube-frontend/api'
import { SupportFileListQuery } from './utils'

export const useSupportFilesTable = (query: SupportFileListQuery) => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    data: supportFilesData,
    isLoading,
    getResource: refetchSupportFiles,
  } = useCosGetRequest(supportFilesApi.getSupportFiles, () => {
    return {
      dataCenter: dataCenter!.name,
      pageNum: query.currentPage,
      pageSize: query.itemsPerPage,
      keyword: query.keyword,
      roles: query.roles,
      start: query.startDate?.format(),
      stop: query.endDate?.format(),
    } satisfies SupportFilesApiGetSupportFilesRequest
  })

  const rows: SupportFileRow[] =
    supportFilesData?.supportFileSet.map((supportFileSet) => ({
      ...supportFileSet,
      id: supportFileSet.name,
    })) || []

  const [downloadTarget, setDownloadTarget] = useState<SupportFileRow>()

  const downloadModal = {
    target: downloadTarget,
    isOpen: downloadTarget !== undefined,
    open: setDownloadTarget,
    close: () => setDownloadTarget(undefined),
  }

  const [deleting, setDeleting] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<SupportFileRow | null>(null)

  const closeDeleteModal = () => {
    setDeleteTarget(null)
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return

    setDeleting(true)

    try {
      await supportFilesApi.deleteSupportFiles({
        dataCenter: dataCenter!.name,
        supportFileSet: deleteTarget.name,
      })
    } catch (error) {
      console.error('Delete support files error: ', error)
    } finally {
      refetchSupportFiles()
      setDeleting(false)
      closeDeleteModal()
    }
  }

  const deleteModal = {
    target: deleteTarget,
    deleting,
    open: setDeleteTarget,
    close: closeDeleteModal,
    confirm: confirmDelete,
  }

  return {
    rows,
    isLoading,
    supportFilesData,
    deleteModal,
    downloadModal,
  }
}
