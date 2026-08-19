/**
 * Provider modes, model availability, and the cloud-egress policy.
 *
 * Two independent "who owns this" ideas run through the Advisor UI: who owns
 * the *data* (tenant scoping) and who owns the *inference* (provider mode).
 * They do not imply each other — a partner-managed customer might use their own
 * key, and a direct customer might use the pooled one — so nothing here derives
 * a mode from a tier.
 */

/** Where inference runs and who pays for it (ADR 0007). */
export type ProviderMode = 'pooled' | 'own-key' | 'local-pack'

/** How the mode reads in the badge. Short, because it sits after a model name. */
export const modeLabel: Record<ProviderMode, string> = {
  pooled: 'Bigstack-hosted',
  'own-key': 'your key',
  'local-pack': 'local pack',
}

/** Whether a mode sends prompts off the cluster's own network. */
export const isCloudMode = (mode: ProviderMode): boolean =>
  mode !== 'local-pack'

export type Model = {
  id: string
  name: string
  /** Rough capability tier, shown in the picker so a choice is informed. */
  class: 'fast' | 'balanced' | 'deep'
  mode: ProviderMode
}

/** One tier's stance on cloud egress, ordered root-first in a policy chain. */
export type TierPolicy = {
  /** Display name of the tier that set it, e.g. "Acme Corp". */
  tenant: string
  /** Absent means "no opinion" — inherit whatever an ancestor said. */
  cloudAllowed?: boolean
}

export type CloudPolicy = {
  cloudAllowed: boolean
  /** Which tenant's policy decided this. Empty when nobody expressed one. */
  setBy: string
}

/**
 * Resolves cloud egress across a policy chain, most-restrictive-wins.
 *
 * ADR 0007: a partner cannot loosen `cloud allowed: no` for their customer. So
 * a single deny anywhere in the chain denies, whoever set it and whatever a
 * nearer tier says — and `setBy` names that tenant, because the UI has to tell
 * the viewer *which* tier disabled it rather than that it is merely disabled.
 *
 * Defaults to allowed only when no tier expressed an opinion at all.
 */
export const resolveCloudPolicy = (chain: TierPolicy[]): CloudPolicy => {
  const denier = chain.find((p) => p.cloudAllowed === false)
  if (denier) return { cloudAllowed: false, setBy: denier.tenant }
  const allower = chain.find((p) => p.cloudAllowed === true)
  if (allower) return { cloudAllowed: true, setBy: allower.tenant }
  return { cloudAllowed: true, setBy: '' }
}

/**
 * A model as the picker should render it.
 *
 * `pinned` carries the reason a model cannot be chosen. It is never a signal to
 * hide the model: the brief requires models the tenant may not use to be
 * "absent or pinned with a reason, not silently missing", and pinned-with-a-
 * reason is the honest one — a silently shorter list looks like the product
 * lacks the model rather than that a policy excluded it.
 */
export type ModelAvailability = {
  model: Model
  selectable: boolean
  pinnedReason?: string
}

/**
 * Applies the resolved policy to an allowlist.
 *
 * Every model the tenant is entitled to stays in the list; cloud models become
 * pinned when egress is disallowed, with a reason naming the tier that decided.
 */
export const applyCloudPolicy = (
  models: Model[],
  policy: CloudPolicy,
): ModelAvailability[] =>
  models.map((model) => {
    if (policy.cloudAllowed || !isCloudMode(model.mode)) {
      return { model, selectable: true }
    }
    const who = policy.setBy ? `${policy.setBy}'s` : 'your organisation’s'
    return {
      model,
      selectable: false,
      pinnedReason: `Disabled by ${who} data-egress policy`,
    }
  })

/**
 * The badge text: which brain is active, and who pays for it.
 *
 * The mode is never optional. The badge existed before ADR 0007 to answer
 * "which model", and the whole point of the new dimension is that "which
 * model" alone no longer tells an operator where their cluster's data went.
 */
export const badgeText = (model: Model): string =>
  `${model.name} · ${modeLabel[model.mode]}`
