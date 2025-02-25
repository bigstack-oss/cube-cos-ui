import { formatEventTime } from '../pages/home/overview/_components/EventPanel'

describe('date', () => {
  it('should format date correctly', () => {
    const date = '2022-01-01T00:00:00Z'
    expect(formatEventTime(date)).toEqual('2022/01/01 08:00')
  })
})
