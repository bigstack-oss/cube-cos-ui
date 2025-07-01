import { z } from 'zod'

export enum UpsertTriggersStep {
  SelectEvents = 'selectEvents',
  SetResponse = 'setResponse',
  AddDescription = 'addDescription',
}

export type UpsertTriggersPayload = {
  alertTypes: string[]
  severities: string[]
  categories: string[]
  eventIds: string[]
  emails: string[]
  slacks: string[]
  personalizedScripts: string[]
  name: string
  description?: string
}

// export enum UpsertTriggersRequestQueryKey {
//   AlertTypes = 'alertTypes',
//   Severities = 'severities',
//   Categories = 'categories',
//   EventIds = 'eventIds',
//   Emails = 'emails',
//   Slacks = 'slacks',
//   PersonalizedScripts = 'personalizedScripts',
//   Name = 'name',
//   Description = 'description',
// }

// const nullableStringArray = z
//   .string()
//   .array()
//   .nullable()
//   .transform((v) => v ?? [])

// const _upsertTriggersRequestQuerySchema = z.object({
//   [UpsertTriggersRequestQueryKey.AlertTypes]: nullableStringArray,
//   [UpsertTriggersRequestQueryKey.Severities]: nullableStringArray,
//   [UpsertTriggersRequestQueryKey.Categories]: nullableStringArray,
//   [UpsertTriggersRequestQueryKey.EventIds]: nullableStringArray,
//   [UpsertTriggersRequestQueryKey.Emails]: nullableStringArray,
//   [UpsertTriggersRequestQueryKey.Slacks]: nullableStringArray,
//   [UpsertTriggersRequestQueryKey.PersonalizedScripts]: nullableStringArray,
//   [UpsertTriggersRequestQueryKey.Name]: z.string(),
//   [UpsertTriggersRequestQueryKey.Description]: z.string().nullable(),
// })

// export type UpsertTriggersRequestQuery = z.output<
//   typeof _upsertTriggersRequestQuerySchema
// >
