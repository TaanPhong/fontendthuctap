import React from 'react'
import { UilUserExclamation } from '@iconscout/react-unicons'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import "./style.css"
import TopPicAdminProduct from '../adminproduct/TopPicAdminProduct'
import MainAdminAction from '../mainadminaction/MainAdminActoin'
import InForPermission from './InForPermission';

const Adminpermission = () => {
  const [rows, setRows] = useState([]);
  const [content, setContent] = useState("");
  const [rowss, setRowss] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8081/admin/permission")
      .then((res) => {
        setRows(
          res.data.map((item) => {
            return {
              id: item.staffDTO.id,
              fullName: item.staffDTO.fullName,
              status: item.staffDTO.status ? "Còn làm" : "Đã nghỉ",
              numberPhone: item.staffDTO.numberPhone,
              userName: item.useName,
              authorizedDetailDTOs: item.authorizedDetailDTOs,
              location: item.staffDTO.location,
            }
          })
        )
        setRowss(
          res.data.map((item) => {
            return {
              id: item.staffDTO.id,
              fullName: item.staffDTO.fullName,
              status: item.staffDTO.status ? "Còn làm" : "Đã nghỉ",
              numberPhone: item.staffDTO.numberPhone,
              userName: item.userName,
              authorizedDetailDTOs: item.authorizedDetailDTOs,
              location: item.staffDTO.location,
            }
          })
        )
      })
      .catch((err) => console.log(err))
  }, [])
  useEffect(() => {
    if (content) {
      setRowss(rows.filter(item => item.fullName.toLowerCase().indexOf(content.toLowerCase()) !== -1));
    }
    else {
      setRowss(rows)
    }
  }, [content])
  // update 

  /// column
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, },
    { field: 'fullName', headerName: 'Họ và tên', width: 200, },
    { field: 'numberPhone', headerName: 'Số điện thoại', width: 150, },
    { field: 'location', headerName: 'Địa chỉ', width: 300, },
    { field: 'userName', headerName: 'Tên tài khoản', width: 150, },
    { field: 'status', headerName: 'Trạng thái', width: 150, backGround: "red" },
    {
      field: "action",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        //console.log(params.row);
        return (
          <div className='action'>
            <InForPermission row={params.row} setRows={setRowss} rows={rowss}/>
          </div>
        )
      }
    }
  ];
  return (
    <div className='MainDash'>
      <h1>Phân quyền</h1>
      <TopPicAdminProduct title={"Nhập tên nhân viên"} setContent={setContent} />
      <MainAdminAction columns={columns} rows={rowss} title="Danh sách nhân viên" />
    </div>
  )
}

export default Adminpermission