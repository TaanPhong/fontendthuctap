import React from 'react'
import TopPicAdminOrder from './TopPicAdminOrder'
import "./style.css"
import TableOrderAdmin from './TableOrderAdmin'
import { useState } from 'react'
const AdminOrder = () => {
    const [contentFind, setContentFind] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [loc, setLoc] = useState(false);
    const [status, setStatus] = useState("");
    const combobox = ["Chờ duyệt", "Hoàn thành", "Đang giao", "Đang lấy hàng", "Đã hủy"];
    return (
        <div className='MainDash'>
            <h1>Đơn Hàng</h1>
            <TopPicAdminOrder tittle={"Nhập vào mã đơn hàng"} setContentFind={setContentFind} setStatus={setStatus} status={status} contextStatus={"Trạng thái"}
                setDateStart={setDateStart} combobox={combobox} setDateEnd={setDateEnd} dateStart={dateStart} dateEnd={dateEnd} setLoc={setLoc} loc={loc}/>
            <TableOrderAdmin contentFind={contentFind} dateStart={dateStart} dateEnd={dateEnd} loc={loc}/>
        </div>
    )
}

export default AdminOrder