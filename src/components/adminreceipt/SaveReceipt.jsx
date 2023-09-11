import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../Context/Context';
import Modal from '@mui/material/Modal';
import { UilPlusCircle, UilEdit, UilTimes, UilSearch } from '@iconscout/react-unicons'
import './style.css'
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import axios from 'axios';
import SelectedProduct from './SelectedProduct';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1200,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    padding: "2rem",
    "border-radius": "8px",
};

const getData = (setData, api) => {
    axios.get(api)
        .then((res) => setData(res.data))
        .catch((error) => console.log(error))
}

const SaveReceipt = ({ row, display, callAPI, rows, update, setUpdate }) => {
    const [open, setOpen] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [selected, setSelected] = useState(false);
    const [productDetails, setProductDetails] = useState([])
    const [getDataUpdate, setGetDataUpdate] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    const [contentFind, setContentFind] = useState("");
    const ref = useRef();

    // context
    const context = useContext(Context);
    useEffect(() => {
        getData(setSuppliers, "http://localhost:8081/admin/supplier");
    }, [])



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
                <button className='btnedit' onClick={() => {
                    handleOpen()
                    if (row) {
                        setProductDetails(row.receiptDetailDTOs.map((item) => {
                            return context.products.find(product => product.id === item.productId)
                        }))
                        setGetDataUpdate(!getDataUpdate);
                    }
                }}>
                    <UilEdit />
                </button>
            )
    }

    const handleOnClickCancel = (product) => {
        if (row) {
            let checkDelete = null;
            const element = row.receiptDetailDTOs.find(item => item.productId === product.id);
            if (element && element.numberOf > product.numberOf) {
                checkDelete = element;
            }
            if (!checkDelete) {
                setProductDetails(productDetails.filter((item) => item.id !== product.id))
            }
            else {
                alert("Không thể loại bỏ sản phẩm " + product.name + " ra khỏi phiếu nhập!")
            }
        }
        else {
            setProductDetails(productDetails.filter((item) => item.id !== product.id))
        }
    }



    const formik = useFormik({
        initialValues: {
            id: row ? row.id : null,
            supplierId: row ? row.supplierId : 0,
            staffId: context.isLogin.staffDTO.id,
            arrObj: {}
        },
        onSubmit: value => {
            let submit = true;
            if (Object.entries(value.arrObj).length === 0) {
                submit = false;
                alert("Vui lòng nhập đủ thông tin!")
            }
            else {
                for (const key in value.arrObj) {
                    const val = value.arrObj[key];
                    if (!val.price || !val.numberOf) {
                        submit = false;
                        alert("Vui lòng nhập đủ thông tin!")
                        break;
                    }
                }
            }

            if (submit) {
                let receiptDetailDTOs = [];
                for (const key in value.arrObj) {
                    const val = value.arrObj[key];
                    const detail = {
                        "productId": Number.parseInt(key),
                        "price": Number.parseInt(val.price),
                        "numberOf": Number.parseInt(val.numberOf)
                    }
                    receiptDetailDTOs.push(detail);
                }
                const data = {
                    "id": value.id,
                    "supplierId": Number.parseInt(value.supplierId),
                    "staffId": value.staffId,
                    "receiptDetailDTOs": receiptDetailDTOs,
                }
                if (row) {

                    let checkUpdate = null;
                    receiptDetailDTOs.forEach(element => {
                        const element1 = context.products.find(item => item.id === element.productId);
                        const element2 = row.receiptDetailDTOs.find(item => item.productId === element.productId);
                        if (element2) {
                            if (element1.numberOf + element.numberOf - element2.numberOf < 0) {
                                checkUpdate = element1;
                                return;
                            }
                        }
                    })

                    if (!checkUpdate) {
                        axios.put(callAPI, data)
                            .then(res => {
                                setUpdate(!update);
                                alert("Hiệu chỉnh thành công")
                                setOpen(false);
                            }
                            )
                            .catch(error => alert("Quá trình thay đổi xảy ra lỗi!"))
                    }
                    else {
                        alert("Không thể sửa phiếu nhập này vì nếu sửa sản phẩm " + checkUpdate.nameProduct + " sẽ có số lượng tồn nhỏ hơn 0!");
                    }

                }
                else {
                    axios.post(callAPI, data)
                        .then(res => {
                            setUpdate(!update);
                            alert("Thêm thành công")
                            setOpen(false);
                        }
                        )
                        .catch(error => alert("Quá trình thêm xảy ra lỗi!"))
                }
            }
        }
    })
    useEffect(() => {
        if (productDetails.length > 0 && row) {
            row.receiptDetailDTOs.forEach(element => {
                formik.setFieldValue("arrObj[" + element.productId + "].price", element.price);
                formik.setFieldValue("arrObj[" + element.productId + "].numberOf", element.numberOf);
            });
        }
    }, [getDataUpdate, row])
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
                            <h4>Nhập thông tin sản phẩm</h4>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='group-admin-input' style={{ width: "50%" }}>
                                    <label>Chọn nhà cung cấp</label>
                                    <select name="supplierId" className="select-admin-product" onChange={formik.handleChange} value={formik.values.supplierId}>
                                        <option value={0}>----</option>
                                        {
                                            suppliers.map((item, index) => {
                                                return <option key={"type" + index} value={item.id}>{item.nameSupplier}</option>
                                            })
                                        }
                                    </select>
                                    <span className='errs=messenger'></span>
                                </div>
                                {
                                    <div className='input-receipt'>
                                        <h4>Chi tiết phiếu nhập</h4>
                                        {
                                            productDetails.map((productDetail, index) => {
                                                return (
                                                    <div key={index} className='item-receipt'>
                                                        <span>{productDetail.nameProduct}</span>
                                                        <input type="number" className='input-receipt-price' placeholder='Nhập đơn giá' min={1000}
                                                            {...formik.getFieldProps("arrObj[" + productDetail.id + "].price")} />
                                                        <input type="number" className='input-receipt-numberOf' placeholder='Nhập số lượng' min={1}
                                                            {...formik.getFieldProps("arrObj[" + productDetail.id + "].numberOf")}
                                                        />
                                                        <UilTimes style={{ cursor: "pointer", marginLeft: "45px", marginTop: "5px" }}
                                                            onClick={() => { handleOnClickCancel(productDetail) }} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                <div style={{ padding: "10px" }} >
                                    <div className='find-product'>
                                        <UilSearch className="search" onClick={() => setSelected(false)} />
                                        <input type="text" name='nameProduct' ref={ref} onChange={() => setContentFind(ref.current.value)} placeholder='Tìm kiếm sản phẩm' onFocus={() => setSelected(true)} />
                                    </div>
                                    {
                                        selected ? <SelectedProduct setProductDetails={setProductDetails} productDetails={productDetails} setSelected={setSelected} contentFind={contentFind} /> : <></>
                                    }
                                </div>
                                <div className='group-btn-confirm'>
                                    <button className='btn-xacnhan' type='submit'>Lưu</button>
                                    <button className='btn-thoat' type='button' onClick={handleClose}>Thoát</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default SaveReceipt