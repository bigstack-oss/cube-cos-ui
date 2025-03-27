import {
  NodesApiGetNodesRequest,
  TuningsApiListTuningSpecsRequest,
} from '@cube-frontend/api'
import {
  CosBackButton,
  CosStepProcess,
  CosStepProcessItem,
} from '@cube-frontend/ui-library'
import { nodesApi, tuningsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { noop } from 'lodash'
import { useContext } from 'react'
import { Link, Navigate } from 'react-router'
import { PublishTuning } from './_components/PublishTuning'
import { SelectHosts } from './_components/SelectHosts/SelectHosts'
import { SelectKeyValue } from './_components/SelectKeyValue/SelectKeyValue'
import { useCreateTuningsPayload } from './useCreateTuningsPayload'
import { CreateTuningsStep, useStepParam } from './useStepParam'

const stepItems = [
  {
    label: 'Key-Value',
    step: CreateTuningsStep.SelectKeyValue,
  },
  {
    label: 'Select Hosts',
    step: CreateTuningsStep.SelectHosts,
  },
  {
    label: 'Publish',
    step: CreateTuningsStep.Publish,
  },
]

export const CreateTuningsPage = () => {
  const { name: dataCenter } = useContext(DataCenterContext)

  const { isLoading: isLoadingSpecs, data: specs } = useCosGetRequest(
    tuningsApi.listTuningSpecs,
    (): TuningsApiListTuningSpecsRequest => ({
      dataCenter,
    }),
  )

  const { isLoading: isLoadingNodes, data: listNodesResponse } =
    useCosGetRequest(
      nodesApi.getNodes,
      (): NodesApiGetNodesRequest => ({
        dataCenter,
      }),
    )

  const { payload, selectedSpec, onSpecSelect, onValueChange, onHostsChange } =
    useCreateTuningsPayload(specs)

  const { step, goToSelectHosts, goToPublish } = useStepParam()

  const renderContent = () => {
    if (step === CreateTuningsStep.SelectKeyValue) {
      return (
        <SelectKeyValue
          isLoading={isLoadingSpecs}
          specs={specs}
          selectedSpec={selectedSpec}
          value={payload.value}
          onSpecSelect={onSpecSelect}
          onValueChange={onValueChange}
          onNextClick={goToSelectHosts}
        />
      )
    }

    if (!payload.selectedSpecName) {
      // This happens when users skip the first step by directly entering
      // the URL in the browser.
      return <Navigate to="/events/tunings/create" replace={true} />
    }

    if (step === CreateTuningsStep.SelectHosts) {
      return (
        <SelectHosts
          isLoading={isLoadingNodes}
          payload={payload}
          hosts={listNodesResponse?.nodes}
          onChange={onHostsChange}
          onNextClick={goToPublish}
        />
      )
    }

    if (step === CreateTuningsStep.Publish) {
      return <PublishTuning payload={payload} />
    }

    throw new Error(`Unhandled step ${step}`)
  }

  return (
    <div className="mx-2 my-1">
      <Link className="inline-block" to="/events/tunings">
        <CosBackButton onClick={noop}>Create Tunings</CosBackButton>
      </Link>
      <CosStepProcess className="mt-3">
        {stepItems.map((stepItem, index) => (
          <CosStepProcessItem
            key={stepItem.step}
            label={stepItem.label}
            serialNumber={index + 1}
            isActive={step === stepItem.step}
          />
        ))}
      </CosStepProcess>
      {renderContent()}
    </div>
  )
}
