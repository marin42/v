import type { Api, Data, Aggregate, Dimension } from './types'

export function useFakeApi(): Api {
  const endpoint = 'http://mock-api.voodoo.io/monetization'

  const fetchData = async (start: string, end: string, dimensions: Dimension[], aggregates: Aggregate[]): Promise<Data[]> => {
    return [
      {
        os: 'IOS',
        country: 'FR',
        date: '2020-01-02',
        views: 422424224,
        conversions: 1000,
        game: 'GameA',
        placement: 'PlacementA',
        revenue: 1002,
        format: 'FormatA'
      },
      {
        os: 'IOS',
        country: 'FR',
        date: '2020-01-02',
        views: 422424224,
        conversions: 4224242,
        game: 'Game42',
        placement: 'PlacementZ',
        revenue: 42424224,
        format: 'FormatC'
      },
      {
        os: 'ANDROID',
        country: 'FR',
        date: '2020-01-03',
        views: 422424224,
        conversions: 4224242,
        game: 'GameA',
        placement: 'PlacementA',
        revenue: 42424224,
        format: 'FormatA'
      },
      {
        os: 'WINDOWS PHONE',
        country: 'FR',
        date: '2020-01-03',
        views: 422424224,
        conversions: 4224242,
        game: 'GameA',
        placement: 'PlacementA',
        revenue: 42424224,
        format: 'FormatA'
      },
      {
        os: 'WINDOWS PHONE',
        country: 'FR',
        date: '2020-01-03',
        views: 422424224,
        conversions: 4224242,
        game: 'GameA',
        placement: 'PlacementA',
        revenue: 42424224,
        format: 'FormatB'
      }
    ]
  }

  return { fetchData }
}
