import {
  NodesApiGetNodesRequest,
  TuningsApiListTuningSpecsRequest,
} from '@cube-frontend/api'
import { nodesApi, tuningsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { EditTuningsDefaultData } from '@cube-frontend/web-app/stores/editTuningsStore'
import { ReactNode, useContext } from 'react'
import { EditValue } from './_components/EditValue/EditValue'
import { PublishTuning } from './_components/Publish/PublishTuning'
import { SelectHosts } from './_components/SelectHosts/SelectHosts'
import { UpsertTuningsSteps } from './_components/UpsertTuningsSteps'
import { useEditTuningsPayload } from './_components/useEditTuningsPayload'
import { useStepParam } from './_components/useStepParam'
import {
  NonNullableUpsertTuningsPayload,
  UpsertTuningsStep,
} from './upsertTuningsUtils'

type EditTuningsProps = {
  defaultData: EditTuningsDefaultData
  errorMessage?: string | undefined
  onPublishClick: (payload: NonNullableUpsertTuningsPayload) => Promise<void>
}

export const EditTunings = (props: EditTuningsProps) => {
  const { defaultData, errorMessage, onPublishClick } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { data: specs } = useCosGetRequest(
    tuningsApi.listTuningSpecs,
    (): TuningsApiListTuningSpecsRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const { data: listNodesResponse } = useCosGetRequest(
    nodesApi.getNodes,
    (): NodesApiGetNodesRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const nodes = listNodesResponse?.nodes

  const {
    isInitializing,
    payload,
    selectedSpec,
    onValueChange,
    onHostsChange,
  } = useEditTuningsPayload(specs, nodes, defaultData)

  const { step, goToSelectHosts, goToPublish } = useStepParam()

  const renderContentFnMap: Record<UpsertTuningsStep, () => ReactNode> = {
    keyValue: () => (
      <EditValue
        isLoading={isInitializing}
        payload={payload}
        selectedSpec={selectedSpec}
        onValueChange={onValueChange}
        onNextClick={goToSelectHosts}
      />
    ),
    selectHosts: () => (
      <SelectHosts
        isLoading={!nodes}
        payload={payload!}
        hosts={nodes}
        onChange={onHostsChange}
        onNextClick={goToPublish}
      />
    ),
    publish: () => (
      <PublishTuning
        payload={payload!}
        errorMessage={errorMessage}
        onPublishClick={onPublishClick}
      />
    ),
  }

  const renderContent = renderContentFnMap[step]

  return (
    <div>
      <UpsertTuningsSteps step={step} />
      {renderContent()}
    </div>
  )
}
