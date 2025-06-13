import {
  ListTuningSpecResponseDataInnerLimitation,
  TuningLimitationType,
} from '@cube-frontend/api'
import { z } from 'zod'
import { UpsertTuningsPayloadValue } from '../../upsertTuningsUtils'

export const validateTuningValue = (
  limitation: ListTuningSpecResponseDataInnerLimitation | undefined,
  value: UpsertTuningsPayloadValue,
): boolean => {
  if (!limitation) {
    return false
  }
  const validateFn = validateFnMap[limitation.type]
  return validateFn(limitation, value)
}

type ValidateFn = (
  limitation: ListTuningSpecResponseDataInnerLimitation,
  value: UpsertTuningsPayloadValue,
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

const intRegex = /^-?\d+$/

const validateInt: ValidateFn = (limitation, value) => {
  const stringifiedValue = value?.toString() ?? ''
  if (!intRegex.test(stringifiedValue)) return false

  const { min, max } = limitation
  let schema = z.number().int()

  if (min !== undefined) {
    schema = schema.min(min)
  }

  if (max !== undefined) {
    schema = schema.max(max)
  }

  const parsedValue = parseInt(stringifiedValue)
  return schema.safeParse(parsedValue).success
}

const uIntRegex = /^\d+$/

const validateUInt: ValidateFn = (limitation, value) => {
  const stringifiedValue = value?.toString() ?? ''
  if (!uIntRegex.test(stringifiedValue)) return false

  const { min, max } = limitation
  let schema = z.number()

  if (min !== undefined) {
    schema = schema.min(min)
  }

  if (max !== undefined) {
    schema = schema.max(max)
  }

  const parsedValue = parseInt(stringifiedValue)
  return schema.safeParse(parsedValue).success
}

const validateBool: ValidateFn = (_, value) => {
  return z.boolean().safeParse(value).success
}

const validateFnMap: Record<TuningLimitationType, ValidateFn> = {
  str: validateString,
  int: validateInt,
  uint: validateUInt,
  bool: validateBool,
}
