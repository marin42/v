import { useState, useEffect } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Checkbox } from '@mui/material'
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';

import { Api, Dimension, Aggregate } from '../api/types'
import type { Search } from './types'

import './style.css'

type SearchProps = {
  search: Search
}

const DIMENSIONS = ['os', 'country', 'format', 'game', 'placement'] as const;
const AGGREGATES: Aggregate[] = ['views', 'revenue', 'conversions'];

export const SearchView: React.FunctionComponent<SearchProps> = ({ search }) => {
  function toggleDimension(dimension: Dimension) {
    const newValue = search.selectedDimensions.includes(dimension) ?
      // Prevent user from unchecking all Dimensions
      search.selectedDimensions.length <= 1 ? search.selectedDimensions : search.selectedDimensions.filter(x => x !== dimension)
      : [...search.selectedDimensions, dimension]

    search.setSelectedDimensions(newValue)
  }

  function toggleAggregate(aggregate: Aggregate) {
    const newValue = search.selectedAggregates.includes(aggregate) ?
      // Prevent user from unchecking all Aggregates
      search.selectedAggregates.length <= 1 ? search.selectedAggregates : search.selectedAggregates.filter(x => x !== aggregate)
      : [...search.selectedAggregates, aggregate]
    search.setSelectedAggregates(newValue)
  }

  return <div className={'search'}>
    <div className={'date'}>
      <label className={'date-input'}> Start Date
        <input type="date" onChange={event => {
          search.setStartDate(event.target.value)
        }} />
      </label>
      <label> End Date
        <input type="date" onChange={event => {
          search.setEndDate(event.target.value)
        }} />
      </label>

    </div>
    <div className={'dimensions'}>
      {
        DIMENSIONS.map(dimension => {
          const isDimensionSelected = search.selectedDimensions.includes(dimension)
          const availableValues = search.dimensionsValues[dimension];
          const currentSelectedValues = search.selectedDimensionsValues[dimension];

          return <><InputLabel variant="standard">
            <Checkbox checked={isDimensionSelected} onChange={() => toggleDimension(dimension)}></Checkbox>
            {dimension}
          </InputLabel>

            {
              isDimensionSelected ?
                <Select
                  className={'select'}
                  variant={'standard'}
                  multiple
                  displayEmpty={true}
                  renderValue={() => currentSelectedValues.length === 0 ? "ALL" : currentSelectedValues.join(', ')}
                  value={search.selectedDimensionsValues[dimension]} onChange={event => {
                    const value = event.target.value;
                    console.log({ value })
                    search.setSelectedDimensionsValues({
                      ...search.selectedDimensionsValues,
                      [dimension]: typeof value === 'string' ? value.split(',') : value
                    })
                  }}>
                  {
                    search.dimensionsValues[dimension].map(item =>
                      <MenuItem value={item}>{item}</MenuItem>
                    )
                  }
                </Select>
                : null
            }</>
        })}
    </div>

    <div className={'aggregates'}>
      {AGGREGATES.map(aggregate => {
        const isAggregateSelected = search.selectedAggregates.includes(aggregate);
        return <InputLabel variant="standard">
          <Checkbox checked={isAggregateSelected} onChange={() => toggleAggregate(aggregate)}></Checkbox>
          {aggregate}
        </InputLabel>
      })}

    </div>
  </div>
}