import {
  GetHealthsResponseDataOverallStatusCurrentEnum,
  ListFirmwaresResponseDataFirmwaresInner,
  ListFirmwaresResponseDataFirmwaresInnerStatusCurrentEnum as StatusEnum,
} from '@cube-frontend/api'
import { beforeEach, describe, expect, it, suite } from 'vitest'
import { CephHealthStatus } from '../_components/useCephHealthStatus'
import {
  computeFirmwaresActionState,
  FirmwareActionState,
  UpdateActionState,
  updatedStatuses,
  updatingStatuses,
} from './computeFirmwaresActionState'

const createFirmware = (
  status: StatusEnum,
): ListFirmwaresResponseDataFirmwaresInner => {
  return {
    status: {
      current: status,
    },
  } as unknown as ListFirmwaresResponseDataFirmwaresInner
}

const updatedStatusArray = Array.from(updatedStatuses.values())
const updatingStatusArray = Array.from(updatingStatuses.values())

describe('Compute firmwares action state', () => {
  suite('when Ceph is healthy', () => {
    suite('when no firmwares are updated', () => {
      let oldestFirmwareState: FirmwareActionState
      let otherFirmwareStates: FirmwareActionState[]

      beforeEach(() => {
        const states = computeFirmwaresActionState(
          [
            createFirmware(StatusEnum.Available),
            createFirmware(StatusEnum.Available),
            createFirmware(StatusEnum.Available),
          ],
          GetHealthsResponseDataOverallStatusCurrentEnum.Ok,
        )
        oldestFirmwareState = states.pop()!
        otherFirmwareStates = states
      })

      it('oldest firmware: update✅|remove✅', () => {
        expect(oldestFirmwareState).toEqual<FirmwareActionState>({
          update: 'available',
          delete: 'available',
        })
      })

      it('other firmwares: update❌|remove✅', () => {
        otherFirmwareStates.forEach((state) => {
          expect(state).toEqual<FirmwareActionState>({
            update: 'blockedByOlderFirmware',
            delete: 'available',
          })
        })
      })
    })

    suite.each(updatingStatusArray)(
      'when the oldest firmware is updating',
      (oldestFirmwareStatus) => {
        let oldestFirmwareState: FirmwareActionState
        let otherFirmwareStates: FirmwareActionState[]

        beforeEach(() => {
          const states = computeFirmwaresActionState(
            [
              createFirmware(StatusEnum.Available),
              createFirmware(StatusEnum.Available),
              createFirmware(StatusEnum.Available),
              createFirmware(oldestFirmwareStatus),
            ],
            GetHealthsResponseDataOverallStatusCurrentEnum.Ok,
          )
          oldestFirmwareState = states.pop()!
          otherFirmwareStates = states
        })

        it('oldest firmware: update🚧|remove❌', () => {
          expect(oldestFirmwareState).toEqual<FirmwareActionState>({
            update: 'inProgress',
            delete: 'blockedByUpdating',
          })
        })

        it('other firmwares: update❌|remove✅', () => {
          otherFirmwareStates.forEach((state) => {
            expect(state).toEqual<FirmwareActionState>({
              update: 'blockedByOlderFirmware',
              delete: 'available',
            })
          })
        })
      },
    )

    suite.each(updatedStatusArray)(
      'when the oldest firmware is updated',
      (oldestFirmwareStatus) => {
        let oldestFirmwareState: FirmwareActionState
        let secondOldestFirmwareState: FirmwareActionState
        let otherFirmwareStates: FirmwareActionState[]

        beforeEach(() => {
          const states = computeFirmwaresActionState(
            [
              createFirmware(StatusEnum.Available),
              createFirmware(StatusEnum.Available),
              createFirmware(StatusEnum.Available),
              createFirmware(oldestFirmwareStatus),
            ],
            GetHealthsResponseDataOverallStatusCurrentEnum.Ok,
          )
          oldestFirmwareState = states.pop()!
          secondOldestFirmwareState = states.pop()!
          otherFirmwareStates = states
        })

        it('oldest firmware: update❌|remove❌', () => {
          expect(oldestFirmwareState).toEqual<FirmwareActionState>({
            update: 'hidden',
            delete: 'hidden',
          })
        })

        it('second oldest firmware: update✅|remove✅', () => {
          expect(secondOldestFirmwareState).toEqual<FirmwareActionState>({
            update: 'available',
            delete: 'available',
          })
        })

        it('other firmwares: update❌|remove✅', () => {
          otherFirmwareStates.forEach((state) => {
            expect(state).toEqual<FirmwareActionState>({
              update: 'blockedByOlderFirmware',
              delete: 'available',
            })
          })
        })
      },
    )

    suite.each(updatingStatusArray)(
      'when a firmware in the middle is updating',
      (targetFirmwareStatus) => {
        let newerFirmwareStates: FirmwareActionState[]
        let targetFirmwareState: FirmwareActionState
        let olderFirmwareStates: FirmwareActionState[]

        const targetFirmwareIndex = 1

        beforeEach(() => {
          const states = computeFirmwaresActionState(
            [
              createFirmware(StatusEnum.Available),
              // ===== Target firmware =====
              createFirmware(targetFirmwareStatus),
              // ==========================
              createFirmware(StatusEnum.Succeeded),
              createFirmware(StatusEnum.Succeeded),
            ],
            GetHealthsResponseDataOverallStatusCurrentEnum.Ok,
          )
          newerFirmwareStates = states.slice(0, targetFirmwareIndex)
          targetFirmwareState = states[targetFirmwareIndex]
          olderFirmwareStates = states.slice(targetFirmwareIndex + 1)
        })

        it('newer firmwares: update❌|remove✅', () => {
          newerFirmwareStates.forEach((state) => {
            expect(state).toEqual<FirmwareActionState>({
              update: 'blockedByOlderFirmware',
              delete: 'available',
            })
          })
        })

        it('target firmware: update🚧|remove❌', () => {
          expect(targetFirmwareState).toEqual<FirmwareActionState>({
            update: 'inProgress',
            delete: 'blockedByUpdating',
          })
        })

        it('older firmwares: update❌|remove❌', () => {
          const previousFirmwareState = olderFirmwareStates[0]
          const othersFirmwareStates = olderFirmwareStates.slice(1)

          expect(previousFirmwareState).toEqual<FirmwareActionState>({
            update: 'hidden',
            delete: 'hidden',
          })

          othersFirmwareStates.forEach((state) => {
            expect(state).toEqual<FirmwareActionState>({
              update: 'hidden',
              delete: 'hidden',
            })
          })
        })
      },
    )

    suite.each(updatedStatusArray)(
      'when a firmware in the middle is updated',
      (targetFirmwareStatus) => {
        let newerFirmwareStates: FirmwareActionState[]
        let targetFirmwareState: FirmwareActionState
        let olderFirmwareStates: FirmwareActionState[]

        const targetFirmwareIndex = 1

        beforeEach(() => {
          const states = computeFirmwaresActionState(
            [
              createFirmware(StatusEnum.Available),
              // ===== Target firmware =====
              createFirmware(targetFirmwareStatus),
              // ==========================
              createFirmware(StatusEnum.Succeeded),
              createFirmware(StatusEnum.Succeeded),
              createFirmware(StatusEnum.Succeeded),
            ],
            GetHealthsResponseDataOverallStatusCurrentEnum.Ok,
          )
          newerFirmwareStates = states.slice(0, targetFirmwareIndex)
          targetFirmwareState = states[targetFirmwareIndex]
          olderFirmwareStates = states.slice(targetFirmwareIndex + 1)
        })

        it('newer firmwares: update✅|remove✅', () => {
          newerFirmwareStates.forEach((state) => {
            expect(state).toEqual<FirmwareActionState>({
              update: 'available',
              delete: 'available',
            })
          })
        })

        it('target firmware: update❌|remove❌', () => {
          expect(targetFirmwareState).toEqual<FirmwareActionState>({
            update: 'hidden',
            delete: 'hidden',
          })
        })

        it('older firmwares: update❌|remove❌', () => {
          olderFirmwareStates.forEach((state) => {
            expect(state).toEqual<FirmwareActionState>({
              update: 'hidden',
              delete: 'hidden',
            })
          })
        })
      },
    )
  })

  suite('when checking Ceph health status', () => {
    const cephHealthStatus: CephHealthStatus = 'checking'

    it('blocks update', () => {
      const state = computeFirmwaresActionState(
        [createFirmware(StatusEnum.Available)],
        cephHealthStatus,
      )[0]

      expect(state.update).toEqual<UpdateActionState>(
        'blockedByCheckingCephHealth',
      )
    })
  })

  suite('when Ceph is unhealthy', () => {
    const cephHealthStatus: CephHealthStatus =
      GetHealthsResponseDataOverallStatusCurrentEnum.Ng

    it('blocks update', () => {
      const state = computeFirmwaresActionState(
        [createFirmware(StatusEnum.Available)],
        cephHealthStatus,
      )[0]

      expect(state.update).toEqual<UpdateActionState>('blockedByUnhealthyCeph')
    })
  })
})
