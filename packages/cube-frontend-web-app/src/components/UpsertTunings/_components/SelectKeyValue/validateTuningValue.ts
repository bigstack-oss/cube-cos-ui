import {
  ListTuningResponseDataTuningsInnerLimitationDefault,
  ListTuningSpecResponseDataInnerLimitation,
  TuningLimitationType,
} from '@cube-frontend/api'
import { z } from 'zod'

export const validateTuningValue = (
  limitation: ListTuningSpecResponseDataInnerLimitation | undefined,
  value: ListTuningResponseDataTuningsInnerLimitationDefault | undefined,
): boolean => {
  if (!limitation) {
    return false
  }
  const validateFn = validateFnMap[limitation.type]
  return validateFn(limitation, value)
}

type ValidateFn = (
  limitation: ListTuningSpecResponseDataInnerLimitation,
  value: ListTuningResponseDataTuningsInnerLimitationDefault | undefined,
) => boolean

const validateString: ValidateFn = (limitation, value) => {
  const { min, max, regex } = limitation
  let schema = z.string()

  if (min !== undefined) {
    schema = schema.min(min)
  }

  if (max !== undefined) {
    schema = schema.max(max)
  }

  if (regex) {
    schema = schema.regex(new RegExp(regex))
  }

  return schema.safeParse(value).success
}

const validateInt: ValidateFn = (limitation, value) => {
  const { min, max } = limitation
  let schema = z.number().int()

  const parsedValue = Number(value?.toString())

  if (min !== undefined) {
    schema = schema.min(min)
  }

  if (max !== undefined) {
    schema = schema.max(max)
  }

  return schema.safeParse(parsedValue).success
}

const validateFloat: ValidateFn = (limitation, value) => {
  const { min, max } = limitation
  let schema = z.number()

  if (min !== undefined) {
    schema = schema.min(min)
  }

  if (max !== undefined) {
    schema = schema.max(max)
  }

  return schema.safeParse(value).success
}

const validateBool: ValidateFn = (_, value) => {
  return z.boolean().safeParse(value).success
}

const validateFnMap: Record<TuningLimitationType, ValidateFn> = {
  string: validateString,
  int: validateInt,
  float: validateFloat,
  bool: validateBool,
}
