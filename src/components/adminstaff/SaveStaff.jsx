import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context';
import Modal from '@mui/material/Modal';
import { UilPlusCircle, UilEdit } from '@iconscout/react-unicons'
import './style.css'
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import axios from 'axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    padding: "2rem",
    "border-radius": "8px",
};


const SaveStaff = ({ row, display, callAPI, rows, setUpdate, update }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => setOpen(true);
    const displayTitle = () => {
        if (display)
            return (
                <div className="rightTopPicNotDate" onClick={handleOpen}>
                    <UilPlusCircle className='add' />
                    <span>Thêm</span>
                </div>
            )
        else
            return (
                <button className='btnedit' onClick={handleOpen}>
                    <UilEdit />
                </button>
            )
    }

    const context = useContext(Context);
    const [staffInfor, setStaffInfor] = useState([]);
    const [errEmail, setErrEmail] = useState("")
    const [errUserName, setErrUserName] = useState("")
    const [errPassword, setErrPassword] = useState("")
    const [errPasswordConfirm, setErrPasswordConfirm] = useState("")
    const [errFullName, setErrFullName] = useState("")
    const [errNumberPhone, setErrNumberPhone] = useState("")
    const [errLocation, setErrLocation] = useState("")
    const [errCitizenID, setErrCitizenID] = useState("")

    useEffect(() => {
        axios.get("http://localhost:8081/admin/infor/staff")
            .then(res => {
                setStaffInfor(res.data);
            })
            .catch(err => alert("Hệ thống bị lỗi!"))
    }, [])

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: "",
            passwordConfirm: "",
            fullName: row ? row.firstName + " " + row.lastName : "",
            email: row ? row.email : "",
            numberPhone: row ? row.numberPhone : "",
            location: row ? row.location : "",
            dayOfBirth: row ? row.dayOfBirth : "",
            citizenID: row ? row.citizenID : "",

        },
        onSubmit: value => {
            var submit = true
            if (!value.email) {
                setErrEmail("Vui lòng nhập email")
                submit = false;
            }
            else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.email)) {
                setErrEmail("Email không hợp lệ")
                submit = false
            }
            else if (staffInfor.find(item => item.email === value.email)) {
                if (row) {
                    if (row.email !== value.email) {
                        setErrEmail("Email này đã được sử dụng.")
                        submit = false
                    }
                }
                else {
                    setErrEmail("Email này đã được sử dụng.")
                    submit = false
                }

            }
            if (!value.fullName) {
                setErrFullName("Vui lòng nhập họ và tên")
                submit = false
            }
            else if (!/^[\p{L}\s_-]+$/u.test(value.fullName)) {
                setErrFullName("Tên người chỉ chứa chữ cái")
                submit = false
            }
            if (!value.citizenID) {
                setErrCitizenID("Vui lòng nhập căn cước công dân")
                submit = false
            }
            else if (value.citizenID.length !== 12) {
                setErrCitizenID("Căn cước công dân là một chuỗi số gồm 12 só")
                submit = false
            }
            else if (!/^[0-9]+$/.test(value.citizenID)) {
                setErrCitizenID("Căn cước công dân chỉ chứa số")
                submit = false
            }
            else if (staffInfor.find(item => item.citizenID === value.citizenID)) {
                if (row) {
                    if (row.citizenID !== value.citizenID) {
                        setErrCitizenID("Căn cước công dân này đã bị trùng.")
                        submit = false
                    }
                }
                else {
                    setErrCitizenID("Căn cước công dân này đã bị trùng.")
                    submit = false
                }

            }
            if (!value.numberPhone) {
                setErrNumberPhone("Vui lòng nhập số điên thoại")
                submit = false
            }
            else if (value.numberPhone.length !== 10) {
                setErrNumberPhone("Số điện thoại là một chuỗi số gồm 10 chữ số")
                submit = false
            }
            else if (!/^[0-9]+$/.test(value.numberPhone)) {
                setErrNumberPhone("SỐ điện thoại chỉ chứa số")
                submit = false;
            }
            else if (staffInfor.find(item => item.numberPhone === value.numberPhone)) {
                if (row) {
                    if (row.numberPhone !== value.numberPhone) {
                        setErrNumberPhone("SỐ điện thoại này đã được sử dụng.")
                        submit = false;
                    }
                }
                else {
                    setErrNumberPhone("SỐ điện thoại này đã được sử dụng.")
                    submit = false;
                }
            }
            if (!value.location) {
                setErrLocation("Vui lòng nhập địa chỉ")
                submit = false
            }
            if (!row) {
                if (!value.userName) {
                    setErrUserName("Vui lòng nhập tên đăng nhập")
                    submit = false
                }
                else if (context.forget.find(item => item.userName === value.userName)) {
                    setErrUserName("Tên tài khoản đã có người sử dụng.")
                    submit = false
                }
                if (!value.password) {
                    setErrPassword("Vui lòng nhập password")
                    submit = false;
                }
                if (value.password !== value.passwordConfirm) {
                    setErrPasswordConfirm("Nhập lại mật khẩu")
                    submit = false
                }
            }
            const index = value.fullName.lastIndexOf(" ");
            const firstName = value.fullName.slice(0, index);
            const lastName = value.fullName.slice(index + 1);
            const data = {
                "userName": value.userName,
                "password": value.password,
                "staffDTO": {
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": value.email,
                    "numberPhone": value.numberPhone,
                    "location": value.location,
                    "dayOfBirth": value.dayOfBirth,
                    "citizenID": value.citizenID,
                    "status": row ? row.status === "Còn làm" ? 1: 0 : 1,
                    "id": row ? row.id : null
                }
            }
            console.log("data", data);
            if (row && submit) {
                axios.put(callAPI, data.staffDTO)
                    .then(res => {
                        setUpdate(!update);
                        alert("Thay đổi thành công")
                        setOpen(false);
                        setErrCitizenID("")
                        setErrEmail("")
                        setErrFullName("")
                        setErrLocation("")
                        setErrNumberPhone("")
                        setErrPassword("")
                        setErrPasswordConfirm("")
                        setErrUserName("")
                    }
                    )
                    .catch(error => alert("Quá trình cập nhật xảy ra lỗi!"))
            }
            else if (submit) {
                axios.post(callAPI, data)
                    .then(res => {
                        setUpdate(!update);
                        alert("Thêm thành công")
                        value.citizenID = ""
                        value.email = ""
                        value.fullName = ""
                        value.numberPhone = ""
                        value.userName = ""
                        value.password = ""
                        value.passwordConfirm = ""
                        value.location = ""
                        setOpen(false);
                        setErrCitizenID("")
                        setErrEmail("")
                        setErrFullName("")
                        setErrLocation("")
                        setErrNumberPhone("")
                        setErrPassword("")
                        setErrPasswordConfirm("")
                        setErrUserName("")
                    }
                    )
                    .catch(error => alert("Quá trình thêm xảy ra lỗi!"))
            }


        }
    })
    return (
        <>
            {displayTitle()}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="containerLogin" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>
                        <div className="group-admin-input-product">
                            <h4>Nhập thông tin nhân viên</h4>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='group-admin-input'>
                                    <label>Họ và tên</label>
                                    <input type="text" placeholder='Nhận họ và tên' name='fullName' onFocus={() => setErrFullName("")} onChange={formik.handleChange} value={formik.values.fullName} />
                                    <span className='error-message'>{errFullName}</span>
                                </div>
                                <div className='group-admin-input'>
                                    <label>Căn cước công dân</label>
                                    <input type="text" placeholder='Nhập căn cước công dân' name='citizenID' onFocus={() => setErrCitizenID("")} onChange={formik.handleChange} value={formik.values.citizenID} />
                                    <span className='error-message'>{errCitizenID}</span>
                                </div>
                                <div className='group-admin-input'>
                                    <label>Ngày sinh</label>
                                    <input type="date" placeholder='Nhập ngày sinh' name='dayOfBirth' onChange={formik.handleChange} value={formik.values.dayOfBirth} />
                                    <span className='error-message'></span>
                                </div>
                                <div className='group-admin-input'>
                                    <label>Địa chỉ</label>
                                    <input type="text" placeholder='Nhập địa chỉ' name='location' onFocus={() => setErrLocation("")} onChange={formik.handleChange} value={formik.values.location} />
                                    <span className='error-message'>{errLocation}</span>
                                </div>
                                <div className='group-admin-input'>
                                    <label>Số điện thoại</label>
                                    <input type="text" placeholder='Nhập số điện thoại' name='numberPhone' onFocus={() => setErrNumberPhone("")} onChange={formik.handleChange} value={formik.values.numberPhone} />
                                    <span className='error-message'>{errNumberPhone}</span>
                                </div>
                                <div className='group-admin-input'>
                                    <label>Email</label>
                                    <input type="text" placeholder='Nhập email' name='email' onFocus={() => setErrEmail("")} onChange={formik.handleChange} value={formik.values.email} />
                                    <span className='error-message'>{errEmail}</span>
                                </div>
                                {
                                    display ? <>
                                        <div className='group-admin-input'>
                                            <label>User name</label>
                                            <input type="text" placeholder='Nhập tên tài khoản' name='userName' onFocus={() => setErrUserName("")} onChange={formik.handleChange} value={formik.values.userName} />
                                            <span className='error-message'>{errUserName}</span>
                                        </div>
                                        <div className='group-admin-input'>
                                            <label>Mật khẩu</label>
                                            <input type="password" placeholder='Nhập mật khẩu' name='password' onFocus={() => setErrPassword("")} onChange={formik.handleChange} value={formik.values.password} />
                                            <span className='error-message'>{errPassword}</span>
                                        </div>
                                        <div className='group-admin-input'>
                                            <label>Nhập lại mật khẩu</label>
                                            <input type="password" placeholder='Nhập lại mật khẩu' name='passwordConfirm' onFocus={() => setErrPasswordConfirm("")} onChange={formik.handleChange} value={formik.values.passwordConfirm} />
                                            <span className='error-message'>{errPasswordConfirm}</span>
                                        </div>
                                    </> : <></>
                                }
                                <div className='group-btn-confirm'>
                                    <button className='btn-xacnhan' type='submit'>Lưu</button>
                                    <button className='btn-thoat' onClick={handleClose}>Thoát</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default SaveStaff