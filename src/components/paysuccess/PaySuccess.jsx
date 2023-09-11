import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../cartdetail/style.css"
import { useContext } from 'react'
import { Context } from '../../Context/Context'
import { useEffect } from 'react'

const PaySuccess = () => {
    const context = useContext(Context);
    const navigate = useNavigate();
    useEffect(() => {
        if (!context.isLogin) {
            context.setOpen(true);
            navigate("/")
        }
    }, [])
    function displayIsLogin() {
        return (
            <div className="containerCart">
                <div className='notProduct'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp2rzdNuGggdJXTkuWaJ7RPJEjJf5wh1Q66A&usqp=CAU" alt="not product" />
                    <p>Đặt hàng thành công hay thường xuyên kiểm tra trạng thái của đơn hàng của mình.</p>
                    <Link to="/" className='bnt-backhome'>Quay lại trang chủ</Link>
                </div>
            </div>
        )
    }
    function displayNotLogin() {
        return (<></>)
    }
    return context.isLogin ? displayIsLogin() : displayNotLogin();
}

export default PaySuccess