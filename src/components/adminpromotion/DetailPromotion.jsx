import React, { useContext, useState } from 'react'
import { Context } from '../../Context/Context';
import Modal from '@mui/material/Modal';
import { UilFileCheckAlt } from '@iconscout/react-unicons'
import Box from '@mui/material/Box';
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

const DetailPromotion = ({ row }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };


    const context = useContext(Context);
    return (
        <>
            <span className='span-note' onClick={handleOpen}>Chi tiết</span>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="containerLogin" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>
                        <h4>Mã chương trình khuyến mãi {row.id}</h4>
                        <div className='list-item-order-detail'>
                            <div className="detail-note" >
                                <span className='detail-note-span' style={{ fontWeight: "bold" }}>Hình ảnh</span>
                                <span className='detail-note-span' style={{ fontWeight: "bold" }}>Tên sản phẩm</span>
                                <span className='detail-note-span' style={{ fontWeight: "bold" }}>Ngày bắt đầu</span>
                                <span className='detail-note-span' style={{ fontWeight: "bold" }}>Ngày kết thúc</span>
                                <span className='detail-note-span' style={{ fontWeight: "bold" }}>Phần trăm</span>
                            </div>
                            {
                                row.promotionDetailDTOs.map((item) => {
                                    return <div className='detail-note'>
                                        <Img id={item.url} />
                                        <span className='detail-note-span'>{item.nameProduct}</span>
                                        <span className='detail-note-span'>{item.dateStart}</span>
                                        <span className='detail-note-span'>{item.dateEnd}</span>
                                        <span className='detail-note-span'>{item.present}%</span>
                                    </div>
                                })
                            }

                            <div className='group-btn-confirm' style={{marginTop: "20px"}}>
                                <button className='btn-thoat' onClick={handleClose}>Thoát</button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default DetailPromotion