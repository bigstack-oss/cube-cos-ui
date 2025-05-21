import { describe, expect, it, suite } from 'vitest'
import { validateTuningValue } from './validateTuningValue'
import { ListTuningSpecResponseDataInnerLimitation } from '@cube-frontend/api'

describe('Validate Tuning Value', () => {
  suite('int', () => {
    const limitation: ListTuningSpecResponseDataInnerLimitation = {
      type: 'int',
      default: 0,
    }

    it('returns true for valid int strings', () => {
      ;['-1', '0', '1', '99', '123', '987654'].forEach((str) => {
        expect(validateTuningValue(limitation, str)).toEqual(true)
      })
    })

    it('returns false for invalid int strings', () => {
      ;['', ' ', '  ', 'a', 'e', '1a', '1e', '1e2', '14 a', 'a b c'].forEach(
        (str) => {
          expect(validateTuningValue(limitation, str)).toEqual(false)
        },
      )
    })
  })

  suite('uint', () => {
    const limitation: ListTuningSpecResponseDataInnerLimitation = {
      type: 'uint',
      default: 0,
    }

    it('returns true for valid uint strings', () => {
      ;['0', '1', '99', '123', '987654'].forEach((str) => {
        expect(validateTuningValue(limitation, str)).toEqual(true)
      })
    })

    it('returns false for invalid uint strings', () => {
      ;[
        '-1',
        '',
        ' ',
        '  ',
        'a',
        'e',
        '1a',
        '1e',
        '1e2',
        '14 a',
        'a b c',
      ].forEach((str) => {
        expect(validateTuningValue(limitation, str)).toEqual(false)
      })
    })
  })

  suite('bool', () => {
    const limitation: ListTuningSpecResponseDataInnerLimitation = {
      type: 'bool',
      default: true,
    }

    it('returns true for valid boolean values', () => {
      ;[true, false].forEach((boolean) => {
        expect(validateTuningValue(limitation, boolean)).toEqual(true)
      })
    })

    it('returns false for invalid boolean values', () => {
      ;['true', 'false', '0', '1', '-1', '', ' ', 'a', '14 a'].forEach(
        (invalidValue) => {
          expect(validateTuningValue(limitation, invalidValue)).toEqual(false)
        },
      )
    })
  })
})
