import React, { useContext, useState } from 'react'
import { Context } from '../../Context/Context';
import Modal from '@mui/material/Modal';
import { UilTimes } from '@iconscout/react-unicons'
import './login.css'
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import axios from 'axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    padding: "2rem",
    "border-radius": "8px",
};


const ModifyPassword = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    const [errPassword, setErrPassword] = useState("");
    const [errNewPassword, setErrNewPassword] = useState("");
    const [errConfirm, setErrConfirm] = useState("");
    const context = useContext(Context);
    const formik = useFormik(
        {
            initialValues: {
                userName: context.isLogin.userName,
                password: "",
                newPassword: "",
                confirmPassword: "",
            },
            onSubmit: value =>{
                var submit = true;
                if(!value.password){
                    setErrPassword("Vui lòng nhập mật khẩu")
                    submit = false;
                }
                else if(value.password !== context.isLogin.password){
                    setErrPassword("Mật khẩu không chính xác")
                    submit = false;
                }
                if(!value.newPassword){
                    setErrNewPassword("Vui lòng nhập mật khẩu mới")
                    submit = false;
                }
                else if(value.newPassword.length < 6){
                    setErrNewPassword("Mật khẩu yêu cầu tối thiểu 6 ký tự")
                    submit = false;
                }
                if(value.newPassword !== value.confirmPassword){
                    setErrConfirm("Nhập lại mật khẩu")
                    submit = false;
                }
                if(submit)
                {
                    const data = {
                        "userName": value.userName,
                        "password": value.confirmPassword
                    }
                    axios.put("http://localhost:8081/modify/password", data)
                    .then(res =>
                            {
                                context.setIsLogin(res.data)
                                alert("Thay đổi thành công")
                                setOpen(false);
                            }
                        )
                    .catch(error => alert("Quá trình cập nhật xảy ra lỗi!"))
                }
                    
            }
        }
    )
    return (
        <>
            <button className='modifyPassword' onClick={handleOpen}>
                Đổi mật khẩu
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="containerLogin">
                        <div className="leftLogin">
                            <div className="navLogin">
                                <h3>Đổi mật khẩu</h3>
                            </div>
                            <div className="fe">
                                <p>Bạn vui lòng hoàn tất các thông tin xác thực bên dưới để chúng tôi đặt lại mật khẩu cho tài khoản của bạn</p>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="inputLogin">
                                    <input type="password" placeholder='Nhập mật khẩu cũ' name='password' onChange={formik.handleChange} value={formik.values.password} onFocus={() => setErrPassword("")}/>
                                    <span className='error-message'>{errPassword}</span>
                                </div>
                                <div className="inputLogin">
                                    <input type="password" placeholder='Nhập mật khẩu mới' name='newPassword' onChange={formik.handleChange} value={formik.values.newPassword} onFocus={() => setErrNewPassword("")}/>
                                    <span className='error-message'>{errNewPassword}</span>
                                </div>
                                <div className="inputLogin">
                                    <input type="password" placeholder='Nhập lại mật khẩu mới' name='confirmPassword' onChange={formik.handleChange} value={formik.values.confirmPassword} onFocus={() => setErrConfirm("")}/>
                                    <span className='error-message'>{errConfirm}</span>
                                </div>
                                <button type='submit' className='btn-Login'>Đặt lại mật khẩu</button>
                            </form>
                        </div>
                        <div className="rightLogin">
                            <div style={{
                                alignSelf: 'flex-end', cursor: 'pointer',
                            }} onClick={handleClose}>
                                <UilTimes />
                            </div>
                            <img src="https://cdn.divineshop.vn/static/c92dc142033ca6a66cda62bc0aec491b.svg" alt="" />
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default ModifyPassword