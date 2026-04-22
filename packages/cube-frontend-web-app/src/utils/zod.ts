import { z } from 'zod'

export type ErrorRecord<T> = {
  /**
   * Error message.
   * TODO: Replace it with i18n key.
   */
  [key in keyof T]?: string
}

export const validateBySchema = <T>(
  schema: z.ZodType,
  data: T,
): ErrorRecord<T> => {
  const errorRecord: ErrorRecord<T> = {}

  const errors = schema.safeParse(data).error?.flatten()
  const fieldErrors = errors?.fieldErrors as
    | Record<string, string[] | undefined>
    | undefined

  for (const key in data) {
    const error = fieldErrors?.[key]?.[0]
    if (error) {
      errorRecord[key as keyof T] = error
    }
  }

  return errorRecord
}
