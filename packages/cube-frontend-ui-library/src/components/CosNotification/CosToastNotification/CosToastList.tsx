import { CosToastWrapper } from './CosToast'
import { CosToastType } from './utils'

type CosToastListProps = {
  toasts: CosToastType[]
  removeToast: (id: string) => void
}

export const CosToastList = (props: CosToastListProps) => {
  const { toasts, removeToast } = props

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-5">
      {toasts.map((toast) => (
        <CosToastWrapper
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          link={toast.link}
          onToastClose={removeToast}
          time={toast.time}
        />
      ))}
    </div>
  )
}
