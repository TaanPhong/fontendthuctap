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

const SavePriceProduct = ({ row, display, callAPI, rows, setUpdate, update }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [nhapDateStart, setNhapNgayBT] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };


    const displayTitle = () => {
        if (display)
            return (
                <div className="rightTopPicNotDate" onClick={
                    handleOpen
                }>
                    <UilPlusCircle className='add' />
                    <span>Thêm</span>
                </div>
            )
        else
            return (
                <button className='btnedit' onClick={() => {
                    handleOpen()
                    if (row) {
                        const dateS = new Date(row.dateStart);
                        const dateN = new Date();
                        if (dateS < dateN) {
                            setNhapNgayBT(false);
                        }
                    }
                }}>
                    <UilEdit />
                </button>
            )
    }
    const context = useContext(Context);
    const [errorProductId, setErrorProductId] = useState("")
    const [errorDateStart, setErrorDateStart] = useState("")
    const [errorDateEnd, setErrorDateEnd] = useState("")
    const [errorPrice, setErrorPrice] = useState("");

    const formik = useFormik({
        initialValues: {
            productId: row ? row.productId : "",
            dateStart: row ? row.dateStart : "",
            dateEnd: row ? row.dateEnd : "",
            price: row ? row.price : 0,
            staffId: row ? row.staffId : context.isLogin.staffDTO.id
        },
        onSubmit: value => {
            var submit = true;
            //console.log("row", row);
            if (!value.dateStart) {
                setErrorDateStart("Vui lòng chọn ngày bắt đầu")
                submit = false
            }

            if (!value.dateEnd) {
                setErrorDateEnd("Vui lòng chọn ngày kết thúc")
                submit = false
            }
            else {
                let dateS = new Date(value.dateStart)
                let dateE = new Date(value.dateEnd)
                if (dateE <= dateS) {
                    setErrorDateEnd("Ngày kết thúc phải lớn hơn ngày bắt đầu " + value.dateStart)
                    submit = false;
                }
            }
            if (!value.productId) {
                setErrorProductId("Vui lòng chọn sản phẩm")
                submit = false
            }
            if (!value.price) {
                setErrorPrice("Vui lòng nhập giá")
                submit = false
            }
            let dateEnd = "";
            let dateStart = "";
            if (!row) {
                if (value.dateStart && value.productId) {
                    if (rows.find(item => {
                        if (item.productId === Number.parseInt(value.productId)) {
                            let date1 = new Date(item.dateEnd);
                            let date3 = new Date(item.dateStart);
                            let date2 = new Date(value.dateStart);
                            dateEnd = item.dateEnd;
                            return date2 <= date1 && date2 >= date3;
                        }

                    })) {
                        setErrorDateStart("Ngày bắt đầu phải lớn hơn ngày " + dateEnd);
                        submit = false;
                    }
                    else if (rows.find(item => {
                        if (item.productId === Number.parseInt(value.productId)) {
                            let date1 = new Date(item.dateEnd);
                            let date3 = new Date(item.dateStart);
                            let date2 = new Date(value.dateEnd);
                            dateStart = item.dateStart;
                            return date2 <= date1 && date2 >= date3;
                        }

                    })) {
                        setErrorDateEnd("Ngày kết thúc phải nhỏ hơn ngày " + dateStart);
                        submit = false;
                    }
                    else if (rows.find(item => {
                        if (item.productId === Number.parseInt(value.productId)) {
                            let date1 = new Date(value.dateEnd);
                            let date3 = new Date(value.dateStart);
                            let date2 = new Date(item.dateEnd);
                            dateEnd = item.dateEnd;
                            dateStart = item.dateStart;
                            return date2 <= date1 && date2 >= date3;
                        }

                    })) {
                        setErrorDateStart("Từ ngày " + dateStart + " đến ngày " + dateEnd + " đã áp dụng một giá khác.");
                        submit = false;
                    }
                }
            }
            else {
                if (value.dateStart !== row.dateStart) {
                    if (rows.find(item => {
                        if (item.productId === Number.parseInt(value.productId) && item.dateStart !== row.dateStart) {
                            let date1 = new Date(item.dateEnd);
                            let date3 = new Date(item.dateStart);
                            let date2 = new Date(value.dateStart);
                            dateEnd = item.dateEnd;
                            return date2 <= date1 && date2 >= date3;
                        }

                    })) {
                        setErrorDateStart("Ngày bắt đầu phải lớn hơn ngày " + dateEnd);
                        submit = false;
                    }
                    else if (rows.find(item => {
                        if (item.productId === Number.parseInt(value.productId) && item.dateStart !== row.dateStart) {
                            let date1 = new Date(item.dateEnd);
                            let date3 = new Date(item.dateStart);
                            let date2 = new Date(value.dateEnd);
                            dateStart = item.dateStart;
                            return date2 <= date1 && date2 >= date3;
                        }

                    })) {
                        setErrorDateStart("Ngày kết thúc phải nhỏ hơn ngày " + dateStart);
                        submit = false;
                    }
                    else if (rows.find(item => {
                        if (item.productId === Number.parseInt(value.productId) && item.dateStart !== row.dateStart) {
                            let date1 = new Date(value.dateEnd);
                            let date3 = new Date(value.dateStart);
                            let date2 = new Date(item.dateEnd);
                            dateEnd = item.dateEnd;
                            dateStart = item.dateStart;
                            return date2 <= date1 && date2 >= date3;
                        }

                    })) {
                        setErrorDateStart("Từ ngày " + dateStart + " đến ngày " + dateEnd + " đã áp dụng một giá khác.");
                        submit = false;
                    }
                }
            }
            if (submit) {
                //console.log("Value", value);
                if (row) {
                    axios.delete("http://localhost:8081/admin/historyprice/" + row.staffId + "/" + row.productId + "/" + row.dateStart)
                        .then(res => {
                            axios.post(callAPI, value)
                                .then(res => {
                                    setUpdate(!update)
                                    alert("Cập nhật thành công")
                                    setOpen(false);
                                }
                                )
                                .catch(error => alert("Quá trình cập nhật xảy ra lỗi!"))
                        })
                        .catch(err => alert("Hệ thống xảy ra lỗi"))
                }
                else {
                    axios.post(callAPI, value)
                        .then(res => {
                            setUpdate(!update)
                            alert("Thêm thành công")
                            setOpen(false);
                        }
                        )
                        .catch(error => alert("Quá trình cập nhật xảy ra lỗi!"))
                }

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
                            <h4>Nhập thông tin giá sản phẩm</h4>
                            <form onSubmit={formik.handleSubmit}>
                                {
                                    row ? <>
                                        {
                                            nhapDateStart ? <div className='group-admin-input'>
                                                <label>Nhập ngày bắt đầu áp dụng</label>
                                                <input type="date" placeholder='Nhập tên sản phẩm' name='dateStart' onFocus={() => setErrorDateStart("")} onChange={formik.handleChange} value={formik.values.dateStart} />
                                                <span className='error-message'>{errorDateStart}</span>
                                            </div>
                                                : <></>
                                        }
                                    </> :
                                        <>
                                            <div className='group-admin-input'>
                                                <label>Nhập loại sản phẩm</label>
                                                <select name="productId" className="select-admin-product" onFocus={() => setErrorProductId("")} onChange={formik.handleChange} value={formik.values.productId}>
                                                    <option value={0}>----</option>
                                                    {
                                                        context.products.map((item, index) => {
                                                            return <option key={index} value={item.id}>{item.nameProduct}</option>
                                                        })
                                                    }
                                                </select>
                                                <span className='error-message'>{errorProductId}</span>
                                            </div>
                                            <div className='group-admin-input'>
                                                <label>Nhập ngày bắt đầu áp dụng</label>
                                                <input type="date" placeholder='Nhập tên sản phẩm' name='dateStart' onFocus={() => setErrorDateStart("")} onChange={formik.handleChange} value={formik.values.dateStart} />
                                                <span className='error-message'>{errorDateStart}</span>
                                            </div>
                                        </>
                                }
                                <div className='group-admin-input'>
                                    <label>Nhập ngày kết thúc áp dụng</label>
                                    <input type="date" placeholder='Nhập tên sản phẩm' name='dateEnd' onFocus={() => setErrorDateEnd("")} onChange={formik.handleChange} value={formik.values.dateEnd} />
                                    <span className='error-message'>{errorDateEnd}</span>
                                </div>
                                <div className='group-admin-input'>
                                    <label>Giá sản phẩm</label>
                                    <input type="number" placeholder='Nhập giá sản phẩm' name='price' onFocus={() => setErrorPrice("")} onChange={formik.handleChange} value={formik.values.price} />
                                    <span className='error-message'>{errorPrice}</span>
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

export default SavePriceProduct