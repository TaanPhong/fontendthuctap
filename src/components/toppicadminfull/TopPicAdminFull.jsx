import { UilSearchAlt, UilFilter } from '@iconscout/react-unicons'
import { useRef } from 'react'
import Combobox from "../Combobox/Combobox"

const TopPicAdminFull = ({ tittle, setContentFind, combobox, status, setStatus, contentStatus,
  setDateStart, setDateEnd, dateStart, dateEnd, loc, setLoc, model }) => {
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
          <input style={{width: combobox ? "10rem" : "13rem",}}
            type="text" placeholder={tittle} ref={ref} onChange={() => setContentFind(ref.current.value)} />
          <UilSearchAlt className="iconTopPic" />
        </div>
      </div>

      <div className="rightTopPic">
        {
          combobox ? <div>
            <Combobox combobox={combobox} setStatus={setStatus} status={status} contextStatus={contentStatus}/>
          </div>
            : <></>
        }
        <div className='group-admin-date'>
          <label className='label-date'>Từ ngày: </label>
          <input type="date" className='admin-input-date' ref={refDateStart} onChange={() => setDateStart(refDateStart.current.value)} />
        </div>
        <div className='group-admin-date'>
          <label className='label-date'>Đến ngày: </label>
          <input type="date" className='admin-input-date' ref={refDateEnd} onChange={() => setDateEnd(refDateEnd.current.value)} />
        </div>
        <button className='filter-admin' onClick={() => handleClick(dateStart, dateEnd, setLoc, loc)}>
          <UilFilter />
          <span>Lọc</span>
        </button>

      </div>
      {model}
    </div>
  )
}

export default TopPicAdminFull