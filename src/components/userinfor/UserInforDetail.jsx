import React, { useContext, useEffect, useRef } from 'react'
import { Context } from '../../Context/Context'
import axios from 'axios';
import { useFormik } from 'formik';
import "./style.css"
import ModifyPassword from '../login/ModifyPassword';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateFace from './UpdateFace';
const UserInforDetail = () => {
    const context = useContext(Context);
    const [errFirstName, setErrFirstName] = useState("");
    const [errLastName, setErrLastName] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errNumberPhone, setErrNumberPhone] = useState("");
    const [errLocation, setErrLocation] = useState("");
    
    const navigate = useNavigate()
    useEffect(()=>{
        if(!context.isLogin){
            context.setOpen(true);
            navigate("/")
        }
    }, [])
    const formik = useFormik(
        {
            initialValues: {
                firstName: context.isLogin ? context.isLogin.customerDTO.firstName: "",
                lastName: context.isLogin ? context.isLogin.customerDTO.lastName: "",
                email: context.isLogin ? context.isLogin.customerDTO.email : "",
                numberPhone: context.isLogin ? context.isLogin.customerDTO.numberPhone : "",
                location: context.isLogin ? context.isLogin.customerDTO.location : "",
                id: context.isLogin ? context.isLogin.customerDTO.id : 0,
                gender: context.isLogin ? context.isLogin.customerDTO.gender : "Nữ",
            },
            onSubmit: value => {
                var submit = true;
                if (!value.email) {
                    setErrEmail("VUi lòng nhập email")
                    submit = false;
                }
                else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.email)) {
                    setErrEmail("Sai định dạng email")
                    submit = false;
                }
                else if(value.email !== context.isLogin.customerDTO.email){
                    if(context.customerInfor.find(item => item.email === value.email))
                    {
                        setErrEmail("Email này đã được sử dụng.")
                        submit = false;
                    }
                }
                if (!value.firstName) {
                    setErrFirstName("Vui lòng nhập họ")
                    submit = false;
                }
                else if (!/^[\p{L}\s_-]+$/u.test(value.firstName)) {
                    setErrFirstName("Tên người chỉ chứa chứ")
                    submit = false;
                }
                if (!value.lastName) {
                    setErrLastName("Vui lòng nhập tên")
                    submit = false
                }
                else if (!/^[\p{L}\s_-]+$/u.test(value.lastName)) {
                    setErrLastName("Tên người chỉ chứ chữ cái")
                    submit = false;
                }
                if (!value.numberPhone) {
                    setErrNumberPhone("Vui lòng nhập số điện thoại")
                    submit = false
                }
                else if (!/^[0-9]+$/.test(value.numberPhone)) {
                    setErrNumberPhone("Sô điện thoại chỉ có số")
                    submit = false
                }
                else if (value.numberPhone.length !== 10) {
                    setErrNumberPhone("Số điện thoại phải là chuỗi số có 10 chữ số")
                    submit = false
                }
                else if(value.numberPhone !== context.isLogin.customerDTO.numberPhone){
                    if(context.customerInfor.find(item => item.numberPhone === value.numberPhone))
                    {
                        setErrNumberPhone("Số điện thoại này đã được sử dụng");
                        submit = false;
                    }
                }
                if (!value.location) {
                    setErrLocation("Vui lòng nhập địa chỉ")
                    submit = false
                }
                if (submit) {
                    axios.put("http://localhost:8081/user/infor", value)
                        .then(res => {
                            context.setIsLogin({ ...context.isLogin, "customerDTO": res.data })
                            alert("Thay đổi thành công")
                            setErrEmail("")
                            setErrFirstName("")
                            setErrLastName("")
                            setErrLocation("")
                            setErrNumberPhone("")
                        }
                        )
                        .catch(error => alert("Quá trình cập nhật xảy ra lỗi!"))
                }
            }
        }
    )
    


    function displayIsLogin() {
        return (
            <div className='userInforDetail'>
                <div className='containerUserDetail'>
                    <div className="avatarInfor">
                        <img src={context.avatar} alt="" />
                        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            <UpdateFace/>
                            <ModifyPassword />
                        </div>
                    </div>
                    <div className="headerUserInfor">
                        <h4>Tổng quan</h4>
                        <div className="content-infor">
                            <div>
                                <div className="feif">Tên đăng nhập</div>
                                <div className="deif">{context.isLogin.userName}</div>
                            </div>
                            <div>
                                <div className="feif">Email</div>
                                <div className="deif">{context.isLogin.customerDTO.email}</div>
                            </div>
                            <div>
                                <div className="feif">Họ và tên</div>
                                <div className="deif">{context.isLogin.customerDTO.firstName + " " + context.isLogin.customerDTO.lastName}</div>
                            </div>
                            <div>
                                <div className="feif">Số điện thoại</div>
                                <div className="deif">{context.isLogin.customerDTO.numberPhone}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="preson">
                    <h4>Cá nhân</h4>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="group-input">
                            <input type="text" placeholder='Họ' id='hoUserInfor' onFocus={() => setErrFirstName("")} name='firstName' onChange={formik.handleChange} value={formik.values.firstName} />
                            <span className='error-message'>{errFirstName}</span>
                        </div>
                        <div className="group-input">
                            <input type="text" placeholder='Tên' id='tenUserInfor' onFocus={() => setErrLastName("")} name='lastName' onChange={formik.handleChange} value={formik.values.lastName} />
                            <span className='error-message'>{errLastName}</span>
                        </div>
                        <div className="group-input">
                            <select name="gender" id="gender" onChange={formik.handleChange} value={formik.values.gender}>
                                <option value="Nữ">Nữ</option>
                                <option value="Nam">Nam</option>
                            </select>
                        </div>
                        <div className="group-input">
                            <input type="text" placeholder='Số điện thoại' id='stdUserInfor' onFocus={() => setErrNumberPhone("")} name='numberPhone' onChange={formik.handleChange} value={formik.values.numberPhone} />
                            <span className='error-message'>{errNumberPhone}</span>
                        </div>
                        <div className="group-input">
                            <input type="text" placeholder='Email' id='emailUserInfor' onFocus={() => setErrEmail("")} name='email' onChange={formik.handleChange} value={formik.values.email} />
                            <span className='error-message'>{errEmail}</span>
                        </div>
                        <div className="group-input">
                            <input type="text" placeholder='Địa chỉ' id='locationUserInfor' onFocus={() => setErrLocation("")} name='location' onChange={formik.handleChange} value={formik.values.location} />
                            <span className='error-message'>{errLocation}</span>
                        </div>
                        <button type='submit' className='btn-LuuThayDoi'>Lưu thay đổi</button>
                    </form>
                </div>
            </div>
        )
    }

    function displayNotLogin() {
        return (<></>)
    }
    return context.isLogin ? displayIsLogin() : displayNotLogin();
}

export default UserInforDetail