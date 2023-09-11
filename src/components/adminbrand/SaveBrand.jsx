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

const SaveBrand = ({ rows, row, setUpdate, update, display, callAPI }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
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
        }}>
          <UilEdit />
        </button>
      )
  }
  const context = useContext(Context);
  const [errorNameBrand, setErrorNameBrand] = useState("");

  const formik = useFormik({
    initialValues: {
      id: row ? row.id: null,
      nameBrand: row ? row.nameBrand: "",
    },
    onSubmit: value => {
      var submit = true;
      if(!value.nameBrand){
        setErrorNameBrand("Vui lòng nhập tên nhãn hàng.");
        submit = false;
      }
      if(rows.find(item => item.nameBrand === value.nameBrand)){
        setErrorNameBrand("Tên nhãn hiệu đã tồn tại, tên nhãn hiệu là duy nhất.");
        submit = false;
      }
      if (submit) {
        //console.log("Value", value);
        if (row) {
          axios.put(callAPI, value)
            .then(res => {
              setUpdate(!update)
              alert("Sửa thành công.")
              setOpen(false);
            })
            .catch(err => alert("Hệ thống xảy ra lỗi"))
        }
        else
        {
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
              <h4>Nhập thông tin nhãn hàng</h4>
              <form onSubmit={formik.handleSubmit}>
                <div className='group-admin-input'>
                  <label>Tên nhãn hiệu</label>
                  <input type="text" placeholder='Nhập tên nhãn hàng' name='nameBrand' onFocus={() => setErrorNameBrand("")} onChange={formik.handleChange} value={formik.values.nameBrand} />
                  <span className='error-message'>{errorNameBrand}</span>
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

export default SaveBrand