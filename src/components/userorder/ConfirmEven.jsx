import React, { useContext } from 'react'
import { Context } from '../../Context/Context';
import Modal from '@mui/material/Modal';
import { UilTimes } from '@iconscout/react-unicons'
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import axios from 'axios';
import { UilFileTimesAlt, UilDocumentInfo } from '@iconscout/react-unicons'
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  padding: "2rem",
  "border-radius": "8px",
};

const ConfirmEven = ({row, update, setUpdate}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const context = useContext(Context);
  const onClickCancel = () => {
    console.log("row", row);
    const data = {
      "theOrderId": row.id,
      "statusId": 6,
    }
    console.log("data", data);
    axios.post("http://localhost:8081/user/historystatus", data)
      .then((res) => {
        const response = res.data
        axios.put("http://localhost:8081/user/update/numberof/" + response.theOrderId)
          .then(resp => {
                context.setProducts(context.products.map((item)=>{
                    return resp.data.find((i)=> i.id === item.id) ? resp.data.find((i)=> i.id === item.id): item
                }))
          })
          .catch(error => console.log(error))
        alert("Hủy đơn thành công.")
        setUpdate(!update);
        handleClose();
      })
      .catch((error) => console.log(error))
  }
  return (
    <>
      <UilFileTimesAlt className='detailIcon' onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="containerLogin" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>
            <h4>Bạn thật sự muốn hủy đơn hàng này?</h4>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp2rzdNuGggdJXTkuWaJ7RPJEjJf5wh1Q66A&usqp=CAU" alt="" />
            <div className='group-btn-confirm'>
              <button className='btn-xacnhan' onClick={onClickCancel}>Xác nhận</button>
              <button className='btn-thoat' onClick={handleClose}>Thoát</button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ConfirmEven