import { CosToastWrapper } from './CosToast'
import { useToast } from './useToast'

export const CosToastNotification = () => {
  const { toasts, removeToast } = useToast()

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
          isLoading={toast.isLoading}
          onToastClose={removeToast}
          time={toast.time}
        />
      ))}
    </div>
  )
}
