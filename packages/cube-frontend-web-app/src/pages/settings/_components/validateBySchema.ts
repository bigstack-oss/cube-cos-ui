import { ZodObject, ZodTypeAny } from 'zod'

type Shape<T> = {
  [key in keyof T]: ZodTypeAny
}

export type ErrorRecord<T> = {
  /**
   * Error message.
   * TODO: Replace it with i18n key.
   */
  [key in keyof T]?: string
}

export const validateBySchema = <T>(
  schema: ZodObject<Shape<T>>,
  data: T,
): ErrorRecord<T> => {
  const errorRecord: ErrorRecord<T> = {}
  const shape = schema.shape

  for (const key in shape) {
    const value = data[key]
    const rule = shape[key]
    const error = rule.safeParse(value).error?.issues[0]?.message
    if (error) {
      errorRecord[key as keyof T] = error
    }
  }

  return errorRecord
}
