import React, { useState } from 'react'
import { UilSearchAlt, UilFilter } from '@iconscout/react-unicons'
import Combobox from "../Combobox/Combobox"
import { useRef } from 'react'

const TopPicAdminOrder = ({tittle, combobox, setContentFind, setDateStart, setDateEnd, dateStart, dateEnd, loc, setLoc, status, setStatus, contextStatus}) => {
  const ref = useRef();
  const refDateStart = useRef();
  const refDateEnd = useRef();
  const handleClick = (dateStart, dateEnd, setLoc, loc) => {

    if (!dateEnd || !dateStart) {
        setLoc(false)
    }   
    else {
        const dateS = new Date(dateStart);
        const dateE = new Date(dateEnd);
        if (dateE < dateS) {
            alert("Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu!");
        }
        else
            setLoc(!loc);
    }

}
  return (
    <div className='topPic'>
      <div className="leftTopPic">
        <div className="findBy">
          <input type="text" placeholder={tittle} ref={ref} onChange={() => setContentFind(ref.current.value)}/>
          <UilSearchAlt className="iconTopPic" />
        </div>
      </div>
      <div>
        <Combobox combobox={combobox} setStatus={setStatus} status={status} contextStatus={contextStatus}/>
      </div>
      <div className="rightTopPic">
        <div className='group-admin-date'>
          <label className='label-date'>Từ ngày: </label>
          <input type="date" className='admin-input-date' ref={refDateStart}  onChange={() => setDateStart(refDateStart.current.value)}/>
        </div>
        <div className='group-admin-date'>
          <label className='label-date'>Đến ngày: </label>
          <input type="date" className='admin-input-date' ref={refDateEnd} onChange={() => setDateEnd(refDateEnd.current.value)}/>
        </div>
        <button className='filter-admin' onClick={() => handleClick(dateStart, dateEnd, setLoc, loc)}>
          <UilFilter />
          <span>Lọc</span>
        </button>
      </div>
    </div>
  )
}

export default TopPicAdminOrder