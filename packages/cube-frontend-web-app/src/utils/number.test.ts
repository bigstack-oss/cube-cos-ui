import { describe, expect, it, suite } from 'vitest'
import { toAbbreviation } from './number'

describe('Number Utils', () => {
  suite('toAbbreviation', () => {
    it('returns the number as is when it is 0', () => {
      expect(toAbbreviation(0)).toEqual(0)
    })

    it('returns a number, not NaN, when the value is at or below 0.001', () => {
      expect(toAbbreviation(0.001)).toEqual(0)
      expect(toAbbreviation(0.0005)).toEqual(0)
    })

    it('returns the number without a suffix when it is below 1,000', () => {
      expect(toAbbreviation(999)).toEqual(999)
    })

    it('uses a lowercase `k` for thousands', () => {
      expect(toAbbreviation(5040)).toEqual('5.04k')
    })

    it('uses uppercase suffixes from mega up', () => {
      expect(toAbbreviation(3e6)).toEqual('3M')
      expect(toAbbreviation(2.5e9)).toEqual('2.5G')
      expect(toAbbreviation(1.2e12)).toEqual('1.2T')
      expect(toAbbreviation(4e15)).toEqual('4P')
      expect(toAbbreviation(5e18)).toEqual('5E')
    })
  })
})
