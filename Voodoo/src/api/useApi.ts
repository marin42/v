import type { Api } from './types'

// TODO: Move away from code
const API_KEY = 'mwNNiwFuJ30GqpuYwQHSW0XQx93E2rIS7NRSfxwLz4XI5Yoo5aSP8wvyibhVO8aYeaVLYsCJcFP9V0uzo95ph66qktQwE'

const ENDPOINT = 'http://mock-api.voodoo.io/monetization'

export function useApi(): Api {
  return {
    fetchData: async (start, end, dimensions, aggregates) => {
      const url = `${ENDPOINT}?start=${start}&end=${end}&dimensions=${dimensions}&aggregates=${aggregates}`
  
      const rawData = await fetch(url, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      const { data } = await rawData.json();
      return data
    } 
  }
}
