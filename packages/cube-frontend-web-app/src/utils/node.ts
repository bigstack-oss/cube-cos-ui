// TODO: Define these constants in the API docs.
export enum NodeRoleEnum {
  controlConverged = 'control-converged',
  control = 'control',
  compute = 'compute',
  storage = 'storage',
  edgeCore = 'edge-core',
  moderator = 'moderator',
}

export const nodeRoles = Object.values(NodeRoleEnum)
