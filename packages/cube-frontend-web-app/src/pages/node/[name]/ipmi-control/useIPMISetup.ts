import { useMemo, useState } from 'react'
import { z } from 'zod'

type UseIPMISetup = {
  setup: IPMISetup
  fieldsValidity: Record<keyof IPMISetup, boolean>
  allFieldsValid: boolean
  onSetupChange: <Key extends keyof IPMISetup>(
    key: Key,
    value: IPMISetup[Key],
  ) => void
}

export type IPMISetup = {
  port: string
  ip: string
  username: string
  password: string
}

const schema = z.object({
  port: z.string().regex(/^[0-9]{1,}$/),
  ip: z.string().ip(),
  username: z.string().min(1),
  password: z.string().min(1),
})

export const useIPMISetup = (): UseIPMISetup => {
  const [setup, setSetup] = useState<IPMISetup>(() => ({
    port: '623',
    ip: '',
    username: '',
    password: '',
  }))

  const fieldsValidity = useMemo<Record<keyof IPMISetup, boolean>>(() => {
    const errors = schema.safeParse(setup).error?.format() ?? {}
    return {
      port: !('port' in errors),
      ip: !('ip' in errors),
      username: !('username' in errors),
      password: !('password' in errors),
    }
  }, [setup])

  const allFieldsValid = useMemo<boolean>(() => {
    return Object.values(fieldsValidity).every((isValid) => isValid)
  }, [fieldsValidity])

  const onSetupChange = <Key extends keyof IPMISetup>(
    key: Key,
    value: IPMISetup[Key],
  ): void => {
    setSetup((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return {
    setup,
    fieldsValidity,
    allFieldsValid,
    onSetupChange,
  }
}
