import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context';
import Modal from '@mui/material/Modal';
import { UilPlusCircle, UilEdit, UilUserExclamation } from '@iconscout/react-unicons'
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

const SavePermission = ({ display, row, setRows, rows, rowItem }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    const context = useContext(Context);
    const [errDateStart, setErrDateStart] = useState("");
    const [errDateEnd, setErrDateEnd] = useState("");
    const [errPermission, setErrPermission] = useState("");
    const formik = useFormik({
        initialValues: {
            userName: row.userName,
            dateStart: rowItem ? rowItem.dateStart : null,
            displayId: rowItem ? rowItem.displayId : "",
            decentralizationId: 1,
            dateEnd: rowItem ? rowItem.dateEnd : null,
        },
        onSubmit: value => {
            var submit = true;
            console.log("lll", value);
            //console.log("aaa", rowItem)
            if (!value.dateStart) {
                setErrDateStart("Vui lòng chọn ngày bắt đầu")
                submit = false;
            }
            if (!value.displayId) {
                setErrPermission("Vui lòng chọn quyền")
                submit = false;
            }
            if (value.dateStart && value.dateEnd) {
                let dateS = new Date(value.dateStart);
                let dateE = new Date(value.dateEnd);
                if (dateE <= dateS) {
                    setErrDateEnd("Vui lòng chọn ngày kết thúc lớn hơn ngày bắt đầu " + value.dateStart);
                    submit = false;
                }
            }
            if(!rowItem){
                const authorized = row.authorizedDetailDTOs.find((item) => {
                    if (item.displayId === value.displayId) {
                        if (item.dateEnd) {
                            let dateS = new Date(value.dateStart);
                            let dateE = new Date(item.dateEnd);
                            return dateS <= dateE;
                        }
                        else
                            return item
                    }
                })
                if (authorized) {
                    submit = false
                }
            }
            if (submit) {
                
                //console.log("Vào", rowItem);
                if(rowItem){
                    axios.put("http://localhost:8081/admin/permission/" + row.userName, value)
                    .then((res) => {
                        setRows(rows.map((item) => {
                            return item.userName === row.userName ? {
                                ...item,
                                "authorizedDetailDTOs": item.authorizedDetailDTOs.map((iteam) =>{
                                    return iteam.dateStart === res.data.dateStart 
                                            && iteam.displayId === res.data.displayId ? res.data: iteam
                                })
                            } : item
                        }))
                        handleClose();
                        alert("Hiệu chỉnh thành công");
                    })
                    .catch(err => {
                        alert("Quá trình thêm xảy ra lỗi")
                    })
                }
                else
                {
                    axios.post("http://localhost:8081/admin/permission", value)
                    .then((res) => {
                        setRows(rows.map((item) => {
                            return item.userName === row.userName ? {
                                ...item,
                                "authorizedDetailDTOs": [...item.authorizedDetailDTOs, res.data]
                            } : item
                        }))
                        handleClose();
                        alert("Thêm thành công");
                    })
                    .catch(err => {
                        alert("Quá trình thêm xảy ra lỗi")
                    })
                }
            }
        }
    })
    return (
        <>
            {
                display
                    ? <UilPlusCircle className="icon-infor-permission" onClick={handleOpen} />
                    : <UilEdit className="icon-infor-permission" onClick={handleOpen} />
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="containerLogin" style={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
                        <div className="group-admin-input-product">
                            <h4>Nhập thông tin quyền</h4>
                            <form onSubmit={formik.handleSubmit}>
                                {
                                    !rowItem ?
                                        <>
                                            <div className='group-admin-input'>
                                                <label>Quyền được cấp</label>
                                                <select name="displayId" className="select-admin-product" onFocus={() => setErrPermission("")} onChange={formik.handleChange} value={formik.values.displayId}>
                                                    <option value="">----</option>
                                                    {
                                                        context.listIDDisplay.map((item) => {
                                                            return (
                                                                <option value={item.heading}>{item.heading}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                                <span className='error-message'>{errPermission}</span>
                                            </div>
                                            <div className='group-admin-input'>
                                                <label>Nhập ngày bắt đầu</label>
                                                <input type="date" placeholder='Nhập tên sản phẩm' name='dateStart' onFocus={() => setErrDateStart("")} onChange={formik.handleChange} value={formik.values.dateStart} />
                                                <span className='error-message'>{errDateStart}</span>
                                            </div>
                                        </>
                                        : <></>
                                }
                                <div className='group-admin-input'>
                                    <label>Nhập ngày kết thúc (Tùy chọn)</label>
                                    <input type="date" placeholder='Nhập tên sản phẩm' name='dateEnd' onFocus={() => setErrDateEnd("")} onChange={formik.handleChange} value={formik.values.dateEnd} />
                                    <span className='error-message'>{errDateEnd}</span>
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

export default SavePermission