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

const SaveTypeProduct = ({ rows, row, setUpdate, update, display, callAPI }) => {
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
  const [errorNameType, setErrorNameType] = useState("");

  const formik = useFormik({
    initialValues: {
      id: row ? row.id: null,
      nameType: row ? row.nameType: "",
    },
    onSubmit: value => {
      var submit = true;
      if(!value.nameType){
        setErrorNameType("Vui lòng nhập tên loại sản phẩm.");
        submit = false;
      }
      if(rows.find(item => item.nameType === value.nameType)){
        setErrorNameType("Tên nhãn hiệu đã tồn tại, tên loại sản phẩm là duy nhất.");
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
              <h4>Nhập thông tin tên loại sản phẩm</h4>
              <form onSubmit={formik.handleSubmit}>
                <div className='group-admin-input'>
                  <label>Tên loại sản phẩm</label>
                  <input type="text" placeholder='Nhập giá sản phẩm' name='nameType' onFocus={() => setErrorNameType("")} onChange={formik.handleChange} value={formik.values.nameType} />
                  <span className='error-message'>{errorNameType}</span>
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

export default SaveTypeProduct