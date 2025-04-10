import { useContext } from 'react'
import { CosToastContext } from './context'

export const useToast = () => useContext(CosToastContext)
