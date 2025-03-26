// TODO: extract roles enum to openAPI.
export const roles = [
  'Control-converged',
  'Control',
  'Compute',
  'Storage',
  'Edge-core',
  'Moderator',
]

export type Role = (typeof roles)[number]
