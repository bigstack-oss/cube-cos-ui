import {
  GetHealthsResponseDataOverallStatusCurrentEnum,
  ListFixpacksResponseDataFixpacksInner,
  ListFixpacksResponseDataFixpacksInnerStatusCurrentEnum as StatusEnum,
} from '@cube-frontend/api'
import { beforeEach, describe, expect, it, suite } from 'vitest'
import { CephHealthStatus } from '../_components/useCephHealthStatus'
import {
  computeFixpacksActionState,
  FixpackActionState,
  InstallActionState,
  RollbackActionState,
} from './computeFixpacksActionState'

const createFixpack = (
  status: Pick<
    ListFixpacksResponseDataFixpacksInner['status'],
    'current' | 'isRollbackable'
  >,
): ListFixpacksResponseDataFixpacksInner => {
  return {
    status,
  } as unknown as ListFixpacksResponseDataFixpacksInner
}

describe('Compute fixpacks action state', () => {
  suite('when Ceph is healthy', () => {
    suite('when no fixpacks are installed', () => {
      let oldestFixpackState: FixpackActionState
      let otherFixpackStates: FixpackActionState[]

      beforeEach(() => {
        const states = computeFixpacksActionState(
          [
            createFixpack({
              current: StatusEnum.Available,
              isRollbackable: true,
            }),
            createFixpack({
              current: StatusEnum.Available,
              isRollbackable: false,
            }),
            createFixpack({
              current: StatusEnum.Available,
              isRollbackable: true,
            }),
            createFixpack({
              current: StatusEnum.Available,
              isRollbackable: false,
            }),
          ],
          GetHealthsResponseDataOverallStatusCurrentEnum.Ok,
        )
        oldestFixpackState = states.pop()!
        otherFixpackStates = states
      })

      it('oldest fixpack: install✅|rollback❌|remove✅', () => {
        expect(oldestFixpackState).toEqual<FixpackActionState>({
          install: 'available',
          rollback: undefined,
          remove: 'available',
        })
      })

      it('other fixpacks: install❌|rollback❌|remove✅', () => {
        otherFixpackStates.forEach((state) => {
          expect(state).toEqual<FixpackActionState>({
            install: 'blockedByOlderFixpack',
            rollback: undefined,
            remove: 'available',
          })
        })
      })
    })

    suite.each([StatusEnum.Installing, StatusEnum.InstallFailed])(
      'when the oldest fixpack is installing',
      (oldestFixpackStatus) => {
        let oldestFixpackState: FixpackActionState
        let otherFixpackStates: FixpackActionState[]

        beforeEach(() => {
          const states = computeFixpacksActionState(
            [
              createFixpack({
                current: StatusEnum.Available,
                isRollbackable: true,
              }),
              createFixpack({
                current: StatusEnum.Available,
                isRollbackable: false,
              }),
              createFixpack({
                current: StatusEnum.Available,
                isRollbackable: true,
              }),
              createFixpack({
                current: oldestFixpackStatus,
                isRollbackable: false,
              }),
            ],
            GetHealthsResponseDataOverallStatusCurrentEnum.Ok,
          )
          oldestFixpackState = states.pop()!
          otherFixpackStates = states
        })

        it('oldest fixpack: install🚧|rollback❌|remove❌', () => {
          expect(oldestFixpackState).toEqual<FixpackActionState>({
            install: 'inProgress',
            rollback: undefined,
            remove: 'blockedByInstalling',
          })
        })

        it('other fixpacks: install❌|rollback❌|remove✅', () => {
          otherFixpackStates.forEach((state) => {
            expect(state).toEqual<FixpackActionState>({
              install: 'blockedByOlderFixpack',
              rollback: undefined,
              remove: 'available',
            })
          })
        })
      },
    )

    suite('when the oldest fixpack is installed', () => {
      let oldestFixpackState: FixpackActionState
      let secondOldestFixpackState: FixpackActionState
      let otherFixpackStates: FixpackActionState[]

      suite('when the oldest fixpack is rollbackable', () => {
        beforeEach(() => {
          const states = computeFixpacksActionState(
            [
              createFixpack({
                current: StatusEnum.Available,
                isRollbackable: true,
              }),
              createFixpack({
                current: StatusEnum.Available,
                isRollbackable: false,
              }),
              createFixpack({
                current: StatusEnum.Available,
                isRollbackable: true,
              }),
              createFixpack({
                current: StatusEnum.Installed,
                isRollbackable: true,
              }),
            ],
            GetHealthsResponseDataOverallStatusCurrentEnum.Ok,
          )
          oldestFixpackState = states.pop()!
          secondOldestFixpackState = states.pop()!
          otherFixpackStates = states
        })

        it('oldest fixpack: install❌|rollback✅|remove❌', () => {
          expect(oldestFixpackState).toEqual<FixpackActionState>({
            install: undefined,
            rollback: 'available',
            remove: 'blockedByAlreadyInstalled',
          })
        })

        it('second oldest fixpack: install✅|rollback❌|remove✅', () => {
          expect(secondOldestFixpackState).toEqual<FixpackActionState>({
            install: 'available',
            rollback: undefined,
            remove: 'available',
          })
        })

        it('other fixpacks: install❌|rollback❌|remove✅', () => {
          otherFixpackStates.forEach((state) => {
            expect(state).toEqual<FixpackActionState>({
              install: 'blockedByOlderFixpack',
              rollback: undefined,
              remove: 'available',
            })
          })
        })
      })

      suite('when the oldest fixpack is unrollbackable', () => {
        beforeEach(() => {
          const states = computeFixpacksActionState(
            [
              createFixpack({
                current: StatusEnum.Available,
                isRollbackable: true,
              }),
              createFixpack({
                current: StatusEnum.Available,
                isRollbackable: false,
              }),
              createFixpack({
                current: StatusEnum.Available,
                isRollbackable: true,
              }),
              createFixpack({
                current: StatusEnum.Installed,
                isRollbackable: false,
              }),
            ],
            GetHealthsResponseDataOverallStatusCurrentEnum.Ok,
          )
          oldestFixpackState = states.pop()!
          secondOldestFixpackState = states.pop()!
          otherFixpackStates = states
        })

        it('oldest fixpack: install❌|rollback❌|remove❌', () => {
          expect(oldestFixpackState).toEqual<FixpackActionState>({
            install: undefined,
            rollback: undefined,
            remove: undefined,
          })
        })

        it('second oldest fixpack: install✅|rollback❌|remove✅', () => {
          expect(secondOldestFixpackState).toEqual<FixpackActionState>({
            install: 'available',
            rollback: undefined,
            remove: 'available',
          })
        })

        it('other fixpacks: install❌|rollback❌|remove✅', () => {
          otherFixpackStates.forEach((state) => {
            expect(state).toEqual<FixpackActionState>({
              install: 'blockedByOlderFixpack',
              rollback: undefined,
              remove: 'available',
            })
          })
        })
      })
    })

    suite.each([StatusEnum.RollingBack, StatusEnum.RollbackFailed])(
      'when the oldest fixpack is rolling back',
      (oldestFixpackStatus) => {
        let oldestFixpackState: FixpackActionState
        let otherFixpackStates: FixpackActionState[]

        beforeEach(() => {
          const states = computeFixpacksActionState(
            [
              createFixpack({
                current: StatusEnum.Available,
                isRollbackable: true,
              }),
              createFixpack({
                current: StatusEnum.Available,
                isRollbackable: false,
              }),
              createFixpack({
                current: StatusEnum.Available,
                isRollbackable: true,
              }),
              createFixpack({
                current: oldestFixpackStatus,
                isRollbackable: true,
              }),
            ],
            GetHealthsResponseDataOverallStatusCurrentEnum.Ok,
          )
          oldestFixpackState = states.pop()!
          otherFixpackStates = states
        })

        it('oldest fixpack: install❌|rollback🚧|remove❌', () => {
          expect(oldestFixpackState).toEqual<FixpackActionState>({
            install: undefined,
            rollback: 'inProgress',
            remove: 'blockedByRollingBack',
          })
        })

        it('other fixpacks: install❌|rollback❌|remove✅', () => {
          otherFixpackStates.forEach((state) => {
            expect(state).toEqual<FixpackActionState>({
              install: 'blockedByOlderFixpack',
              rollback: undefined,
              remove: 'available',
            })
          })
        })
      },
    )

    suite('when a rollbackable fixpack in the middle is installing', () => {
      let newerFixpackStates: FixpackActionState[]
      let targetFixpackState: FixpackActionState
      let olderFixpackStates: FixpackActionState[]

      const targetFixpackIndex = 1

      beforeEach(() => {
        const states = computeFixpacksActionState(
          [
            createFixpack({
              current: StatusEnum.Available,
              isRollbackable: false,
            }),
            // ===== Target fixpack =====
            createFixpack({
              current: StatusEnum.Installing,
              isRollbackable: true,
            }),
            // ==========================
            createFixpack({
              current: StatusEnum.Installed,
              isRollbackable: false,
            }),
            createFixpack({
              current: StatusEnum.Installed,
              isRollbackable: true,
            }),
          ],
          GetHealthsResponseDataOverallStatusCurrentEnum.Ok,
        )
        newerFixpackStates = states.slice(0, targetFixpackIndex)
        targetFixpackState = states[targetFixpackIndex]
        olderFixpackStates = states.slice(targetFixpackIndex + 1)
      })

      it('newer fixpacks: install❌|rollback❌|remove✅', () => {
        newerFixpackStates.forEach((state) => {
          expect(state).toEqual<FixpackActionState>({
            install: 'blockedByOlderFixpack',
            rollback: undefined,
            remove: 'available',
          })
        })
      })

      it('target fixpack: install🚧|rollback❌|remove❌', () => {
        expect(targetFixpackState).toEqual<FixpackActionState>({
          install: 'inProgress',
          rollback: undefined,
          remove: 'blockedByInstalling',
        })
      })

      it('older fixpacks: install❌|rollback❌|remove❌', () => {
        expect(olderFixpackStates[0]).toEqual<FixpackActionState>({
          install: undefined,
          rollback: undefined,
          remove: undefined,
        })

        expect(olderFixpackStates[1]).toEqual<FixpackActionState>({
          install: undefined,
          rollback: 'blockedByNewerFixpack',
          remove: 'blockedByAlreadyInstalled',
        })
      })
    })

    suite('when a rollbackable fixpack in the middle is installed', () => {
      let newerFixpackStates: FixpackActionState[]
      let targetFixpackState: FixpackActionState
      let olderFixpackStates: FixpackActionState[]

      const targetFixpackIndex = 1

      beforeEach(() => {
        const states = computeFixpacksActionState(
          [
            createFixpack({
              current: StatusEnum.Available,
              isRollbackable: false,
            }),
            // ===== Target fixpack =====
            createFixpack({
              current: StatusEnum.Installed,
              isRollbackable: true,
            }),
            // ==========================
            createFixpack({
              current: StatusEnum.Installed,
              isRollbackable: false,
            }),
            createFixpack({
              current: StatusEnum.Installed,
              isRollbackable: true,
            }),
          ],
          GetHealthsResponseDataOverallStatusCurrentEnum.Ok,
        )
        newerFixpackStates = states.slice(0, targetFixpackIndex)
        targetFixpackState = states[targetFixpackIndex]
        olderFixpackStates = states.slice(targetFixpackIndex + 1)
      })

      it('newer fixpacks: install✅|rollback❌|remove✅', () => {
        newerFixpackStates.forEach((state) => {
          expect(state).toEqual<FixpackActionState>({
            install: 'available',
            rollback: undefined,
            remove: 'available',
          })
        })
      })

      it('target fixpack: install❌|rollback✅|remove❌', () => {
        expect(targetFixpackState).toEqual<FixpackActionState>({
          install: undefined,
          rollback: 'available',
          remove: 'blockedByAlreadyInstalled',
        })
      })

      it('older fixpacks: install❌|rollback❌|remove❌', () => {
        expect(olderFixpackStates[0]).toEqual<FixpackActionState>({
          install: undefined,
          rollback: undefined,
          remove: undefined,
        })

        expect(olderFixpackStates[1]).toEqual<FixpackActionState>({
          install: undefined,
          rollback: 'blockedByNewerFixpack',
          remove: 'blockedByAlreadyInstalled',
        })
      })
    })

    suite('when a rollbackable fixpack in the middle is rolling back', () => {
      let newerFixpackStates: FixpackActionState[]
      let targetFixpackState: FixpackActionState
      let olderFixpackStates: FixpackActionState[]

      const targetFixpackIndex = 1

      beforeEach(() => {
        const states = computeFixpacksActionState(
          [
            createFixpack({
              current: StatusEnum.Available,
              isRollbackable: false,
            }),
            // ===== Target fixpack =====
            createFixpack({
              current: StatusEnum.RollingBack,
              isRollbackable: true,
            }),
            // ==========================
            createFixpack({
              current: StatusEnum.Installed,
              isRollbackable: false,
            }),
            createFixpack({
              current: StatusEnum.Installed,
              isRollbackable: true,
            }),
          ],
          GetHealthsResponseDataOverallStatusCurrentEnum.Ok,
        )
        newerFixpackStates = states.slice(0, targetFixpackIndex)
        targetFixpackState = states[targetFixpackIndex]
        olderFixpackStates = states.slice(targetFixpackIndex + 1)
      })

      it('newer fixpacks: install❌|rollback❌|remove✅', () => {
        newerFixpackStates.forEach((state) => {
          expect(state).toEqual<FixpackActionState>({
            install: 'blockedByOlderFixpack',
            rollback: undefined,
            remove: 'available',
          })
        })
      })

      it('target fixpack: install❌|rollback🚧|remove❌', () => {
        expect(targetFixpackState).toEqual<FixpackActionState>({
          install: undefined,
          rollback: 'inProgress',
          remove: 'blockedByRollingBack',
        })
      })

      it('older fixpacks: install❌|rollback❌|remove❌', () => {
        expect(olderFixpackStates[0]).toEqual<FixpackActionState>({
          install: undefined,
          rollback: undefined,
          remove: undefined,
        })

        expect(olderFixpackStates[1]).toEqual<FixpackActionState>({
          install: undefined,
          rollback: 'blockedByNewerFixpack',
          remove: 'blockedByAlreadyInstalled',
        })
      })
    })

    suite('when a unrollbackable fixpack in the middle is installed', () => {
      let newerFixpackStates: FixpackActionState[]
      let targetFixpackState: FixpackActionState
      let olderFixpackStates: FixpackActionState[]

      const targetFixpackIndex = 1

      beforeEach(() => {
        const states = computeFixpacksActionState(
          [
            createFixpack({
              current: StatusEnum.Available,
              isRollbackable: false,
            }),
            // ===== Target fixpack =====
            createFixpack({
              current: StatusEnum.Installed,
              isRollbackable: false,
            }),
            // ==========================
            createFixpack({
              current: StatusEnum.Installed,
              isRollbackable: false,
            }),
            createFixpack({
              current: StatusEnum.Installed,
              isRollbackable: true,
            }),
          ],
          GetHealthsResponseDataOverallStatusCurrentEnum.Ok,
        )
        newerFixpackStates = states.slice(0, targetFixpackIndex)
        targetFixpackState = states[targetFixpackIndex]
        olderFixpackStates = states.slice(targetFixpackIndex + 1)
      })

      it('newer fixpacks: install✅|rollback❌|remove✅', () => {
        newerFixpackStates.forEach((state) => {
          expect(state).toEqual<FixpackActionState>({
            install: 'available',
            rollback: undefined,
            remove: 'available',
          })
        })
      })

      it('target fixpack: install❌|rollback❌|remove❌', () => {
        expect(targetFixpackState).toEqual<FixpackActionState>({
          install: undefined,
          rollback: undefined,
          remove: undefined,
        })
      })

      it('older fixpacks: install❌|rollback❌|remove❌', () => {
        expect(olderFixpackStates[0]).toEqual<FixpackActionState>({
          install: undefined,
          rollback: undefined,
          remove: undefined,
        })

        expect(olderFixpackStates[1]).toEqual<FixpackActionState>({
          install: undefined,
          rollback: 'blockedByNewerFixpack',
          remove: 'blockedByAlreadyInstalled',
        })
      })
    })
  })

  suite('when checking Ceph health status', () => {
    const cephHealthStatus: CephHealthStatus = 'checking'

    it('blocks installation', () => {
      const state = computeFixpacksActionState(
        [
          createFixpack({
            current: StatusEnum.Available,
            isRollbackable: true,
          }),
        ],
        cephHealthStatus,
      )[0]

      expect(state.install).toEqual<InstallActionState>(
        'blockedByCheckingCephHealth',
      )
    })

    it('blocks rollback', () => {
      const state = computeFixpacksActionState(
        [
          createFixpack({
            current: StatusEnum.Installed,
            isRollbackable: true,
          }),
        ],
        cephHealthStatus,
      )[0]

      expect(state.rollback).toEqual<RollbackActionState>(
        'blockedByCheckingCephHealth',
      )
    })
  })

  suite('when Ceph is unhealthy', () => {
    const cephHealthStatus: CephHealthStatus =
      GetHealthsResponseDataOverallStatusCurrentEnum.Ng

    it('blocks installation', () => {
      const state = computeFixpacksActionState(
        [
          createFixpack({
            current: StatusEnum.Available,
            isRollbackable: true,
          }),
        ],
        cephHealthStatus,
      )[0]

      expect(state.install).toEqual<InstallActionState>(
        'blockedByUnhealthyCeph',
      )
    })

    it('blocks rollback', () => {
      const state = computeFixpacksActionState(
        [
          createFixpack({
            current: StatusEnum.Installed,
            isRollbackable: true,
          }),
        ],
        cephHealthStatus,
      )[0]

      expect(state.rollback).toEqual<RollbackActionState>(
        'blockedByUnhealthyCeph',
      )
    })
  })
})
