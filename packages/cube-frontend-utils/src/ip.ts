const ipV4Regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/

export const isIPv4 = (value: string): boolean => {
  return ipV4Regex.test(value)
}
