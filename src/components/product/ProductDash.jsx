import React from 'react'
import ToppicNotDate from '../toppicnotdate/ToppicNotDate'
import DataTable from '../Table/DataTable'

const ProductDash = ({tieude}) => {
  return (
    <div className='MainDash'>
          <h1>{tieude}</h1>
          <ToppicNotDate namelist = {tieude}/>
          <DataTable />
        </div>
  )
}

export default ProductDash