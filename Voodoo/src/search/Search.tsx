import { InputLabel, Select, MenuItem, Checkbox, Divider, Stack, Container } from '@mui/material'
import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { Dimension, Aggregate } from '../api/types'
import type { Search } from './types'

import './style.css'

type SearchProps = {
  search: Search
}

const DIMENSIONS: Dimension[] = ['date', 'os', 'country', 'format', 'game', 'placement'];
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

  return <Stack
    divider={<Divider flexItem />}
    spacing={2}
  >

    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Start Date"
        endText="End Date"
        value={[search.startDate, search.endDate]}
        onChange={(dates: [Date | null, Date | null]) => {
          const [startDate, endDate] = dates
          if (startDate) search.setStartDate(`${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`)
          if (endDate) search.setEndDate(`${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`)
        }}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </>
        )}
      />
    </LocalizationProvider>


    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      <Container>
        {
          DIMENSIONS.map(dimension => {
            const isDimensionSelected = search.selectedDimensions.includes(dimension)
            const availableValues = search.dimensionsValues[dimension];
            const currentSelectedValues = search.selectedDimensionsValues[dimension];

            return <InputLabel variant="standard">
              <Checkbox checked={isDimensionSelected} onChange={() => toggleDimension(dimension)} />
              {dimension}
              {
                isDimensionSelected ?
                  <Select
                    className={'select'}
                    variant={'standard'}
                    multiple
                    displayEmpty
                    renderValue={() => currentSelectedValues.length === 0 ? "ALL" : currentSelectedValues.join(', ')}
                    value={currentSelectedValues}
                    onChange={event => {
                      const value = event.target.value;
                      search.setSelectedDimensionsValues({
                        ...search.selectedDimensionsValues,
                        [dimension]: typeof value === 'string' ? value.split(',') : value
                      })
                    }}>
                    {
                      availableValues.map(item =>
                        <MenuItem value={item}>{item}</MenuItem>
                      )
                    }
                  </Select>
                  : null
              }

            </InputLabel>
          })}
      </Container>

      <Container>
        {AGGREGATES.map(aggregate => {
          const isAggregateSelected = search.selectedAggregates.includes(aggregate);
          return <InputLabel variant="standard">
            <Checkbox checked={isAggregateSelected} onChange={() => toggleAggregate(aggregate)}></Checkbox>
            {aggregate}
          </InputLabel>
        })}

      </Container>
    </Stack>
  </Stack>
}