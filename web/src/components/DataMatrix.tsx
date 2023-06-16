// import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DataMatrix({ columns, rows } : { columns: Array<any>, rows: Array<any>}) {
    return (
        <div>
            <DataGrid
                sx={{ color: 'white' }}
                rows={rows}
                columns={columns}
                hideFooter={true}
                rowSelection={false}
                rowHeight={20}
                disableColumnFilter={true}
                disableColumnMenu={true}
                autoHeight={true}
            />
        </div>
    );
}

export default DataMatrix