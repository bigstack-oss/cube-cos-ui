import {
  NodesApiGetNodesRequest,
  TuningsApiListTuningSpecsRequest,
} from '@cube-frontend/api'
import { nodesApi, tuningsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router'
import { PublishTuning } from './_components/Publish/PublishTuning'
import { SelectHosts } from './_components/SelectHosts/SelectHosts'
import { SelectKeyValue } from './_components/SelectKeyValue/SelectKeyValue'
import { useSpecFilter } from './_components/SelectKeyValue/useSpecFilter'
import { UpsertTuningsSteps } from './_components/UpsertTuningsSteps'
import { useCreateTuningsPayload } from './_components/useCreateTuningsPayload'
import { useStepParam } from './_components/useStepParam'
import {
  NonNullableUpsertTuningsPayload,
  UpsertTuningsStep,
} from './upsertTuningsUtils'

type CreateTuningsProps = {
  errorMessage?: string | undefined
  onPublishClick: (payload: NonNullableUpsertTuningsPayload) => Promise<void>
}

export const CreateTunings = (props: CreateTuningsProps) => {
  const { errorMessage, onPublishClick } = props

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

  const { payload, selectedSpec, onSpecSelect, onValueChange, onHostsChange } =
    useCreateTuningsPayload(specs)

  const { step, goToSelectHosts, goToPublish } = useStepParam()

  const specFilter = useSpecFilter()

  const renderContentFnMap: Record<UpsertTuningsStep, () => ReactNode> = {
    keyValue: () => (
      <SelectKeyValue
        isLoading={!specs}
        specs={specs}
        selectedSpec={selectedSpec}
        specFilter={specFilter}
        value={payload.value}
        onSpecSelect={onSpecSelect}
        onValueChange={onValueChange}
        onNextClick={goToSelectHosts}
      />
    ),
    selectHosts: () => (
      <SelectHosts
        isLoading={!nodes}
        payload={payload}
        hosts={nodes}
        onChange={onHostsChange}
        onNextClick={goToPublish}
      />
    ),
    publish: () => (
      <PublishTuning
        payload={payload}
        selectedSpec={selectedSpec!}
        errorMessage={errorMessage}
        onPublishClick={onPublishClick}
      />
    ),
  }

  const renderContent = renderContentFnMap[step]

  if (step !== UpsertTuningsStep.KeyValue && !payload.selectedSpecName) {
    // This happens when users skip the first step by directly entering
    // the URL in the browser.
    return <Navigate to={CosRoutesEnum.EVENTS_TUNINGS_PAGE} replace={true} />
  }

  return (
    <div>
      <UpsertTuningsSteps step={step} />
      {renderContent()}
    </div>
  )
}
