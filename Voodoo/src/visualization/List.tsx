import { DataGrid, GridColDef } from '@mui/x-data-grid';
import type { Data, Dimension } from '../api/types'

type MonetisationListProps = {
    rows: Data[];
    columns: Dimension[];
}

export const MonetisationList: React.FunctionComponent<MonetisationListProps> = ({ rows, columns }) => {
    // DataGrid crashes if no ID available
    const rowsWithId = rows.map((row, index) => ({ id: index, ...row }))

    return <div style={{ height: '500px' }}>
        <DataGrid
            rows={rowsWithId}
            columns={columns.map(field => ({ field, headerName: field, width: 200 }))}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
        />
    </div>
}