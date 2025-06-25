import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { CosTableRow } from '@cube-frontend/ui-library'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { GetTriggersResponseDataInner } from '@cube-frontend/api'

export type TemplateRow = GetTriggersResponseDataInner & CosTableRow

type UseTemplateTable = {
  isTemplateLoading: boolean
  templateRows: TemplateRow[]
  disabledRowsId: string[]
  selectedTemplate: GetTriggersResponseDataInner | undefined
  handleTemplateSelect: (selectedId: string) => void
}

export const useTemplateTable = (): UseTemplateTable => {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const urlTemplateName = searchParams.get('name')

  const { dataCenter } = useContext(DataCenterContext)

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
  const [selectedTemplate, setSelectedTemplate] =
    useState<GetTriggersResponseDataInner>()

  const { isLoading, data: templatesFromApi } = useCosGetRequest(
    triggersApi.getTriggers,
    () => {
      return {
        dataCenter: dataCenter!.name,
      }
    },
  )

  useEffect(() => {
    if (urlTemplateName && templatesFromApi) {
      const targetTemplate = templatesFromApi.find(
        (template) => template.name === urlTemplateName,
      )

      if (!targetTemplate) {
        console.warn('Not a valid template, please try again')
        navigate('/events/triggers')
      }

      setSelectedTemplate(targetTemplate)
    }
  }, [templatesFromApi, navigate, urlTemplateName])

  const templateRows: TemplateRow[] = useMemo(() => {
    if (isLoading || !templatesFromApi) return []

    return templatesFromApi.map((template) => ({
      ...template,
      /**
       * We use the template name as the row ID since it is unique.
       * This is a workaround for the fact that the API does not return an ID field.
       */
      id: template.name,
    }))
  }, [isLoading, templatesFromApi])

  const disabledRowsId = urlTemplateName
    ? templateRows
        .filter((template) => template.name !== selectedTemplate?.name)
        .map((template) => template.id)
    : []

  const handleTemplateSelect = (selectedId: string) => {
    const selectedTemplate = templateRows.find(
      (template) => template.id === selectedId,
    )

    setSelectedTemplate((prev) => {
      return selectedTemplate ?? prev
    })
  }

  return {
    isTemplateLoading: isLoading,
    templateRows,
    disabledRowsId,
    selectedTemplate,
    handleTemplateSelect,
  }
}
