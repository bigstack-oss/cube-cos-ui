import { useState } from 'react'
import { TuningRow } from './tuningsUtils'

type UseTuningHostsModal = {
  isHostsModalOpen: boolean
  hostsForModal: string[] | undefined
  onShowHostsClick: (row: TuningRow) => void
  onHostsModalClose: () => void
}

export const useTuningHostsModal = (): UseTuningHostsModal => {
  const [hosts, setHosts] = useState<string[] | undefined>(undefined)

  const onShowHostsClick = (row: TuningRow): void => {
    setHosts(row.hosts)
  }

  const onHostsModalClose = (): void => {
    setHosts(undefined)
  }

  return {
    isHostsModalOpen: !!hosts,
    hostsForModal: hosts,
    onShowHostsClick,
    onHostsModalClose,
  }
}
