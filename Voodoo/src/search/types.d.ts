import { Data, Dimension, Aggregate } from '../api/types'

export type DimensionsValues = Record<Dimension, string[]>

export type Search = {
  result: Data[];
  
  startDate: string;
  endDate: string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;

  selectedAggregates: Aggregate[];
  setSelectedAggregates: (value: Aggregate[]) => void;
  
  selectedDimensions: Dimension[];
  setSelectedDimensions: (value: Dimension[]) => void;

  dimensionsValues: DimensionsValues;
  selectedDimensionsValues: DimensionsValues;
  setSelectedDimensionsValues: (value: DimensionsValues) => void;
}
