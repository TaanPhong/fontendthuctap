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

const SaveSupplier = ({ row, display, callAPI, setRows, rows }) => {
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
    //console.log(callAPI);
    const[errEmail, setErrEmail] = useState("")
    const[errNameSupplier, setErrNameSupplier] = useState("")
    const[errLocationWebsite, setErrLocationWebsite] = useState("")
    const[errNumberPhone, setErrNumberPhone] = useState("")
    const[errLocation, setErrLocation] = useState("")
    const formik = useFormik({
        initialValues: {
            nameSupplier: row ? row.nameSupplier: "",
            locationWebsite: row ? row.locationWebsite: "",
            email: row ? row.email : "",
            numberPhone: row ? row.numberPhone : "",
            location: row ? row.location : "",
            id: row ? row.id: null,
        },
        onSubmit: value => {
            var submit = true;
            if(!value.nameSupplier){
                setErrNameSupplier("Vui lòng nhâp nhà tên nhà cung cấp")
                submit = false;
            }
            if(!value.location){
                setErrLocation("Vui lòng nhập địa chỉ")
                submit = false
            }
            if(!value.email){
                setErrEmail("Vui lòng nhập email")
                submit = false
            }
            else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.email)){
                setErrEmail("Email không hợp lệ")
                submit = false;
            }
            if(!value.numberPhone){
                setErrNumberPhone("Vui lòng nhập số điện thoại")
                submit = false;
            }
            else if(value.numberPhone.length != 10){
                setErrNumberPhone("Số điện thoại là một chuỗi số gồm 10 chữ số")
                submit = false;
            }
            else if(!/^[0-9]+$/.test(value.numberPhone)){
                setErrNumberPhone("Số điện thoại chỉ nhận ký tự số")
                submit = false
            }
            if(!value.locationWebsite){
                setErrLocationWebsite("Vui lòng nhập địa chỉ website")
                submit = false
            }
            if (row && submit) {
                axios.put(callAPI, value)
                    .then(res => {
                        setRows(rows.map((item) => {
                            return item.id === res.data.id ? res.data : item
                        }))
                        alert("Thay đổi thành công")
                        setOpen(false);
                        value.email = "";
                        value.location = "";
                        value.locationWebsite = "";
                        value.nameSupplier = "";
                        value.numberPhone = "";
                        setErrEmail("")
                        setErrLocation("")
                        setErrLocationWebsite("")
                        setErrNameSupplier("")
                        setErrNumberPhone("")
                    }
                    )
                    .catch(error => alert("Quá trình cập nhật xảy ra lỗi!"))
            }
            else if(submit){
                axios.post(callAPI, value)
                    .then(res => {
                        setRows([...rows, res.data])
                        alert("Thêm thành công")
                        value.email = "";
                        value.location = "";
                        value.locationWebsite = "";
                        value.nameSupplier = "";
                        value.numberPhone = "";
                        //value.
                        setOpen(false);
                        setErrEmail("")
                        setErrLocation("")
                        setErrLocationWebsite("")
                        setErrNameSupplier("")
                        setErrNumberPhone("")
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
                            <h4>Nhập thông tin nhà cung cấp</h4>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='group-admin-input'>
                                    <label>Tên nhà cung cấp</label>
                                    <input type="text" placeholder='Nhập tên nhà cung cấp' name='nameSupplier' onFocus={() => setErrNameSupplier("")} onChange={formik.handleChange} value={formik.values.nameSupplier} />
                                    <span className='error-message'>{errNameSupplier}</span>
                                </div>
                                <div className='group-admin-input'>
                                    <label>Địa chỉ</label>
                                    <input type="text" placeholder='Nhập địa chỉ' name='location' onFocus={() => setErrLocation("")} onChange={formik.handleChange} value={formik.values.location} />
                                    <span className='error-message'>{errLocation}</span>
                                </div>
                                <div className='group-admin-input'>
                                    <label>Website</label>
                                    <input type="text" placeholder='Nhập địa chỉ website' name='locationWebsite' onFocus={() => setErrLocationWebsite("")} onChange={formik.handleChange} value={formik.values.locationWebsite} />
                                    <span className='error-message'>{errLocationWebsite}</span>
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

export default SaveSupplier