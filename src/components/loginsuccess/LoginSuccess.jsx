import React, { useContext, useEffect } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/Context'
import axios from 'axios'
const LoginSuccess = () => {
    const context = useContext(Context);
    const handleClick = (event) => {
        context.setIsLogin(null);
        context.setCartItem([])
        context.setSelected(0);
        context.setOpen(false);
        context.setAvatar("");
    }
    useEffect(() => {
        if (context.isLogin) {
            axios.get("http://localhost:8081/login/avatar", {
                params: {
                    userName: context.isLogin.userName,
                },
                responseType: 'blob',
            })
                .then((res) => {
                    context.setAvatar(URL.createObjectURL(res.data));
                })
                .catch(err => alert("Xảy ra lỗi!"))
        }
    }, [])
    return (
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={context.avatar} className='avatar' alt="" />
            </button>
            <ul class="dropdown-menu">
                <li><Link to="/user/infor" class="dropdown-item">Quản lý tài khoản</Link></li>
                <li><Link to="/user/order" class="dropdown-item">Lịch sử đơn hàng</Link></li>
                <li><Link to="/" class="dropdown-item" onClick={handleClick}>Đăng xuất</Link></li>
            </ul>
        </div>
    )
}

export default LoginSuccess