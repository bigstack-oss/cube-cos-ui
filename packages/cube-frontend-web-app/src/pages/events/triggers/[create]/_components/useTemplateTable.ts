import { useContext, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { CosTableRow } from '@cube-frontend/ui-library'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'

export type TemplateRow = {
  name: string
  description: string
} & CosTableRow

type UseTemplateTable = {
  dataCenter: string
  isTemplateLoading: boolean
  templateRows: TemplateRow[]
  disabledRowsId: string[]
  selectedTemplateName: string | null
  handleTemplateSelect: (selectedId: string) => void
}

export const useTemplateTable = (): UseTemplateTable => {
  const [searchParams, _] = useSearchParams()

  const urlTemplateName = searchParams.get('name')

  const { name: dataCenter } = useContext(DataCenterContext)

  /**
   * When editing a trigger, the URL will include a name corresponding to the default `selectedTemplateName`.
   * In this case, the template table will automatically select the matching template name,
   * while other template rows will be disabled.
   *
   * In Phase 2, a `Create a new trigger from template` feature will be implemented.
   * At that time, there will be no query string in the URL, meaning no default `selectedTemplateName`.
   * As a result, all rows in the table will be selectable, adn no rows will be pre-selected.
   *
   */
  const [selectedTemplateName, setSelectedTemplateName] = useState<
    string | null
  >(urlTemplateName)

  const { isLoading, data } = useCosGetRequest(triggersApi.getTriggers, () => {
    if (!dataCenter) return
    return {
      dataCenter,
    }
  })

  const templateRows: TemplateRow[] = useMemo(() => {
    if (!data) return []
    return data.map((template) => ({
      name: template.name,
      description: template.description,
      id: template.name,
    }))
  }, [data])

  const disabledRowsId = urlTemplateName
    ? templateRows
        .filter((template) => template.name !== selectedTemplateName)
        .map((template) => template.id)
    : []

  const handleTemplateSelect = (selectedId: string) => {
    const selectedTemplate = templateRows.find(
      (template) => template.id === selectedId,
    )
    setSelectedTemplateName((prev) => {
      return selectedTemplate ? selectedTemplate.name : prev
    })
  }

  return {
    dataCenter,
    isTemplateLoading: isLoading,
    templateRows,
    disabledRowsId,
    selectedTemplateName,
    handleTemplateSelect,
  }
}
