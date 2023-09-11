import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context';
import Modal from '@mui/material/Modal';
import { UilTrashAlt, UilUserExclamation } from '@iconscout/react-unicons'
import './style.css'
import Box from '@mui/material/Box';
import axios from 'axios';
import SavePermission from './SavePermission';
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
const InForPermission = ({ row, setRows, rows }) => {
    //console.log("useName",userName);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = (item) => {
        const confirm = window.confirm("Bạn thật sự muốn xóa quyền này!");
        if (confirm) {
            axios.delete("http://localhost:8081/admin/permission/" + item.userName + "/" + item.dateStart + "/" + item.displayId + "/" + item.decentralizationId);
            alert("Xóa thành công")
            setRows(rows.map((iteam) => {
                return iteam.userName === item.userName ? {
                    ...iteam,
                    "authorizedDetailDTOs": iteam.authorizedDetailDTOs.filter((authorized) =>
                        authorized.dateStart !== item.dateStart || authorized.userName !== item.userName
                        || authorized.displayId !== item.displayId || authorized.decentralizationId !== item.decentralizationId)
                } : iteam
            }))
        }
    }
    return (
        <>
            <button className='btndelete' onClick={handleOpen}>
                <UilUserExclamation />
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="containerLogin" style={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
                        <h4>Danh sách quyền</h4>
                        <div style={{ display: "flex", justifyContent: "flex-end", width: "80%", marginBottom: "10px" }}>
                            {row.status === "Còn làm" && row.id !== 1 ? <SavePermission display={"Thêm"} row={row} setRows={setRows} rows={rows} /> : <></>}
                        </div>
                        {
                            <>
                                <div className='infor-permission'>
                                    <div>Ngày bắt đầu</div>
                                    <div>Ngày kết thúc</div>
                                    <div>Quyền</div>
                                    <div>Thao tác</div>
                                </div>
                                {
                                    row.authorizedDetailDTOs.map((item) => {
                                        return (
                                            <div className='infor-permission'>
                                                <div>{item.dateStart}</div>
                                                <div>{item.dateEnd ? item.dateEnd : "Không giới hạn"}</div>
                                                <div>{item.displayId}</div>
                                                {
                                                    row.status === "Còn làm"  && row.id !== 1 ? <div className='group-icon-infor-permission'>
                                                        <SavePermission row={row} setRows={setRows} rows={rows} rowItem={item} />
                                                        <UilTrashAlt className="icon-infor-permission" onClick={() => handleDelete(item)} />
                                                    </div>
                                                        : <div></div>
                                                }

                                            </div>
                                        )
                                    })
                                }
                            </>
                        }
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default InForPermission