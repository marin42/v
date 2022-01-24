import { Data, Dimension, Aggregate } from '../api/types'

export type DimensionsValues = {
  os: string[];
  country: string[];
  format: string[];
  game: string[];
  placement: string[];    
}

export type Search = {
  startDate: string;
  endDate: string;

  result: Data[];

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
