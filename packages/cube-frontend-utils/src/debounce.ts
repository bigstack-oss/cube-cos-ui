export const debounce = <Args extends Array<unknown>, Return>(
  fn: (...args: Args) => Return,
  delay = 500,
): ((...args: Args) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined

  return (...args: Args): void => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
