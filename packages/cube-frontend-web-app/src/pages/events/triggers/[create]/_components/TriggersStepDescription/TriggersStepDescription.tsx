import { useContext } from 'react'
import { CosTextArea } from '@cube-frontend/ui-library'
import { TriggersCreateContext } from '../context'

export const TriggersStepDescription = () => {
  const { description, handleDescriptionChange } = useContext(
    TriggersCreateContext,
  )

  return (
    <div className="flex flex-col gap-2 rounded-[5px] bg-white px-6 py-4">
      <CosTextArea
        label="Description"
        maxLength={1000}
        value={description}
        onChange={handleDescriptionChange}
      />
    </div>
  )
}
