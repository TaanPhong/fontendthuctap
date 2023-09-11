import React from 'react'
import { UilSearchAlt, UilFilter } from '@iconscout/react-unicons'
import Combobox from "../Combobox/Combobox"
import "./style.css"
import { useRef } from 'react'
const TopPicAdminCustomer = ({setContext}) => {
  const ref = useRef()
    return (
        <div className='topPic'>
          <div className="leftTopPic">
            <div className="findBy">
              <input type="text" placeholder='Nhập tên khách hàng' ref={ref} onChange={()=> setContext(ref.current.value)}/>
              <UilSearchAlt className="iconTopPic" />
            </div>
          </div>
        </div>
      )
}

export default TopPicAdminCustomer