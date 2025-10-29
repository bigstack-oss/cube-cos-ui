import { useTranslation } from 'react-i18next'
import { CopyButton } from '@cube-frontend/web-app/components/CopyButton'

type ValidationLogProps = {
  log: string
}

export const ValidationLog = (props: ValidationLogProps) => {
  const { log } = props

  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
      <div className="flex justify-end rounded-t-[5px] border border-functional-border-divider bg-scene-background px-[19px] py-3">
        <CopyButton copyContent={log} />
      </div>
      <div className="primary-body3 overflow-x-auto whitespace-pre rounded-b-[5px] bg-dark-700 px-6 py-4 text-functional-border-darker">
        {log || t('nodes.ipmiControl.noResult')}
      </div>
    </div>
  )
}
