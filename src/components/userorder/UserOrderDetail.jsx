import React, { useRef, useState } from 'react'
import { UilFilter } from '@iconscout/react-unicons'
import "./style.css"
import TableUserOrderDetail from './TableUserOrderDetail'
import { useContext } from 'react'
import { Context } from '../../Context/Context'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const UserOrderDetail = () => {
    const ref = useRef()
    const refDateStart = useRef();
    const refDateEnd = useRef();
    const [orderId, setOrderId] = useState(0)
    const [loc, setLoc] = useState(false);
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const context = useContext(Context)
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
    const navigate = useNavigate();
    useEffect(()=>{
        if(!context.isLogin){
            context.setOpen(true);
            navigate("/")
        }
    }, [])

    function displayIsLogin() {
        return (
            <div className="userOrderDetail">
                <div className="content-userOrder">
                    <h4>Lịch sử đơn hàng</h4>
                    <div className='fe'>
                        <p>Hiển thị thông tin các sản phẩm bạn đã mua tại Tiệm tỏa hương</p>
                    </div>
                    <hr />
                    <div className="headUserOrder">
                        <input type="number" placeholder='Mã đơn hàng' ref={ref} onChange={() => {
                            setOrderId(Number.parseInt(ref.current.value))
                            console.log("ref", ref.current.value);
                        }} />
                        <input type="date" ref={refDateStart} onChange={() => setDateStart(refDateStart.current.value)} />
                        <input type="date" ref={refDateEnd} onChange={() => setDateEnd(refDateEnd.current.value)} />
                        <button onClick={() => {
                            handleClick(dateStart, dateEnd, setLoc, loc);
                        }}><UilFilter />Lọc</button>
                    </div>
                    <div className='tableUserOrder'>
                        <TableUserOrderDetail orderId={orderId} dateStart={dateStart} dateEnd={dateEnd} loc={loc} />
                    </div>
                </div>

            </div>
        )
    }

    function displayNotLogin(){
        return (<></>)
    }
    return context.isLogin ? displayIsLogin() : displayNotLogin();
}

export default UserOrderDetail