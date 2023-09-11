import React, { useContext, useState } from 'react'
import { Context } from '../../Context/Context';
import Modal from '@mui/material/Modal';
import { UilFileCheckAlt } from '@iconscout/react-unicons'
import './style.css'
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import axios from 'axios';
import Img from '../Img/Img';
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

const DetailNote = ({ row, display, callAPI }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const displayTitle = () => {
        if (!display || display === "Đặt lại") {
            return <span className='span-note' onClick={handleOpen}>Chi tiết</span>;
        }
        else {
            return < UilFileCheckAlt className="detailIcon" onClick={handleOpen} />;
        }
    }
    
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
                        {row.theOrderDetailDTOs ? <><h4>Mã đơn hàng {row.id}</h4>
                            <p>(*Lưu ý giá sản phẩm đã được áp dụng khuyến mãi nếu có)</p></>
                            : <>
                                <h4>Mã phiếu nhập {row.id}</h4>
                            </>
                        }
                        {
                            <div className='list-item-order-detail'>
                                <div className="detail-note" >
                                    <span className='detail-note-span' style={{ fontWeight: "bold" }}>Hình ảnh</span>
                                    <span className='detail-note-span' style={{ fontWeight: "bold" }}>Tên sản phẩm</span>
                                    <span className='detail-note-span' style={{ fontWeight: "bold" }}>Số lượng</span>
                                    <span className='detail-note-span' style={{ fontWeight: "bold" }}>Đơn giá</span>
                                    <span className='detail-note-span' style={{ fontWeight: "bold" }}>Thành tiền</span>
                                </div>
                                {row.theOrderDetailDTOs ? row.theOrderDetailDTOs.map((item) => {
                                    return <div className='detail-note'>
                                        <Img id={item.url} />
                                        <span className='detail-note-span'>{item.nameProduct}</span>
                                        <span className='detail-note-span'>{item.numberOf}</span>
                                        <span className='detail-note-span'>{item.price}</span>
                                        <span className='detail-note-span'>{item.price * item.numberOf}</span>
                                    </div>
                                })
                                    : row.receiptDetailDTOs.map((item) => {
                                        return <div className='detail-note'>
                                            <Img id={item.url} />
                                            <span className='detail-note-span'>{item.nameProduct}</span>
                                            <span className='detail-note-span'>{item.numberOf}</span>
                                            <span className='detail-note-span'>{item.price}</span>
                                            <span className='detail-note-span'>{item.price * item.numberOf}</span>
                                        </div>
                                    })
                                }
                            </div>
                        }
                        <div className='group-btn-confirm'>

                            {display ? <button type='button' className='btn-xacnhan' onClick={() => {
                                callAPI(row);
                                setOpen(false);
                            }}>{display}</button> : <></>}
                            <button className='btn-thoat' onClick={handleClose}>Thoát</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default DetailNote