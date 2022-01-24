import { DataGrid } from '@mui/x-data-grid';
import type { Data, Dimension, Aggregate } from '../api/types'

type MonetisationListProps = {
  rows: Data[];
  columns: (Dimension | Aggregate)[];
}

export const MonetisationList: React.FunctionComponent<MonetisationListProps> = ({ rows, columns }) => {
  // DataGrid crashes if no ID for each row
  const rowsWithId = rows.map((row, index) => ({ id: index, ...row }))

  return <DataGrid
      autoHeight
      rows={rowsWithId}
      columns={columns.map(field => ({ field, headerName: field, width: 150 }))}
      pageSize={8}
      rowsPerPageOptions={[8]}
      disableSelectionOnClick
    />
}