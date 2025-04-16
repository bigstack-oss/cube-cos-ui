export const maxHostsDisplayCount = 10

export const joinHostNames = (
  hostNames: string[] | undefined,
): string | undefined => {
  return hostNames?.map((host) => host).join(',')
}
