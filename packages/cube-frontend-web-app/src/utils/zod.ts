import { ZodEffects, ZodObject, ZodTypeAny } from 'zod'

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
  schema: ZodEffects<ZodObject<Shape<T>>> | ZodObject<Shape<T>>,
  data: T,
): ErrorRecord<T> => {
  const errorRecord: ErrorRecord<T> = {}

  let shape: Shape<T>
  if (schema instanceof ZodEffects) {
    shape = schema._def.schema.shape
  } else {
    shape = schema.shape
  }

  // Use `schema.safeParse` instead of `shape[key].safeParse` for `refine` to work.
  const errors = schema.safeParse(data).error?.flatten()

  for (const key in shape) {
    const error = errors?.fieldErrors[key]?.[0]
    if (error) {
      errorRecord[key] = error
    }
  }

  return errorRecord
}
