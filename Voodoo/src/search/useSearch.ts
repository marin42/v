import { useState, useEffect } from 'react'

import { Api, Data, Aggregate, Dimension } from '../api/types'
import { Search, DimensionsValues } from './types'

const DEFAULT_DIMENSIONS: DimensionsValues = {
  os: [],
  country: [],
  format: [],
  game: [],
  placement: [],
  date: [],
}

const DEFAULT_AGGREGATES: Aggregate[] = ['views'];

function unique(arr: any[]) {
  return arr.filter((item, index) => item !== undefined && arr.indexOf(item) === index);
}

export function useSearch(api: Api): Search {
  const [startDate, setStartDate] = useState<string>('2020-01-01');
  const [endDate, setEndDate] = useState<string>('2021-01-01');

  const [dimensionsValues, setDimensionsValues] = useState<DimensionsValues>(DEFAULT_DIMENSIONS);
  const [selectedDimensions, setSelectedDimensions] = useState<Dimension[]>(['os', 'game'])
  const [selectedAggregates, setSelectedAggregates] = useState<Aggregate[]>(DEFAULT_AGGREGATES)
  const [selectedDimensionsValues, setSelectedDimensionsValues] = useState<DimensionsValues>(DEFAULT_DIMENSIONS);


  // Fetch Data From API
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    api.fetchData(startDate, endDate, selectedDimensions, selectedAggregates).then(setData)
  }, [startDate, endDate, selectedDimensions, selectedAggregates])


  // Load Available Dimensions Values
  useEffect(() => {
    setDimensionsValues({
      date: unique(data.map(_ => _.date)),
      os: unique(data.map(_ => _.os)),
      country: unique(data.map(_ => _.country)),
      format: unique(data.map(_ => _.format)),
      game: unique(data.map(_ => _.game)),
      placement: unique(data.map(_ => _.placement)),
    })
  }, [data])


  // Filter Rows depending on Selected Dimensions Values
  const result = data
    .filter(line => {
      const dimensionValueKeys = Object.keys(selectedDimensionsValues)
      return dimensionValueKeys.every(dimension => {
        const selectedDimensionValues = (selectedDimensionsValues as any)[dimension];
        const lineDimension = (line as any)[dimension]
        // If empty, always return, else check if value was selected
        return selectedDimensionValues.length === 0 || selectedDimensionValues.includes(lineDimension)
      })
    });

  return {
    result,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    dimensionsValues,
    selectedDimensions,
    setSelectedDimensions,
    selectedDimensionsValues,
    setSelectedDimensionsValues,
    selectedAggregates,
    setSelectedAggregates
  }
}