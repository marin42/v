import type { Api, Data, Aggregate, Dimension } from './types'

// TODO: Move away from code
const API_KEY = 'mwNNiwFuJ30GqpuYwQHSW0XQx93E2rIS7NRSfxwLz4XI5Yoo5aSP8wvyibhVO8aYeaVLYsCJcFP9V0uzo95ph66qktQwE'

export function useApi(): Api {
  const endpoint = 'http://mock-api.voodoo.io/monetization'

  const fetchData = async (start: string, end: string, dimensions: Dimension[], aggregates: Aggregate[]): Promise<Data[]> => {
    const url = `${endpoint}?start=${start}&end=${end}&dimensions=${dimensions}&aggregates=${aggregates}`

    const rawData = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const { data } = await rawData.json();
    return data
  }

  return { fetchData }
}
