type FlattenObjectKeysInternal<
  T extends Record<string | number, unknown>,
  Separator extends string = '.',
  ExcludedKeys extends string | number = '',
  Key = keyof T,
> = Key extends string | number
  ? Key extends ExcludedKeys
    ? never
    : T[Key] extends Record<string | number, unknown>
      ? `${Key}${Separator}${FlattenObjectKeysInternal<T[Key], Separator, ExcludedKeys>}`
      : `${Key}`
  : never

export type FlattenedObjectKeys<
  T extends Record<string | number, unknown>,
  Separator extends string = '.',
  ExcludedKeys extends string | number = '',
> = FlattenObjectKeysInternal<T, Separator, ExcludedKeys>

export type ValueOfSet<T> = T extends Set<infer Value> ? Value : never

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
