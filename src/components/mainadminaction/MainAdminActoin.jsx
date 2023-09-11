import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
const MainAdminAction = ({columns, rows, title}) => {
  return (
    <div className='datatableproduct'>
      <h3>{title}</h3>
      <DataGrid style={{
        background: '#fff',
        fontSize: '0.8rem'
      }}
        rows={rows}
        disableRowSelectionOnClick
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
      />
    </div>
  )
}

export default MainAdminAction