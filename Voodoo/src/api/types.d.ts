export type Dimension =
  | 'date'
  | 'country'
  | 'format'
  | 'os'
  | 'game'
  | 'placement'

export type Aggregate =
  | 'views'
  | 'conversions'
  | 'revenue'

export type Data = {
  date?: string;
  country?: string;
  format?: string;
  os?: string;
  game?: string;
  placement?: string;
  views?: number;
  conversions?: number;
  revenue?: number;
}

export type Api = {
  fetchData(start: string, end: string, dimensions: Dimension[], aggregates: Aggregate[]): Promise<Data[]>;
}