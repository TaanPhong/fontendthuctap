import React from 'react'
import TopPicAdminProduct from '../adminproduct/TopPicAdminProduct';
import MainAdminAction from '../mainadminaction/MainAdminActoin';

import { UilEdit, UilTrashAlt } from '@iconscout/react-unicons'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import "./style.css"
import SavePriceProduct from './SavePriceProduct';
import TopPicAdminFull from '../toppicadminfull/TopPicAdminFull';


const AdminPriceProduct = () => {
  const [contentFind, setContentFind] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [loc, setLoc] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowss, setRowss] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:8081/admin/historyprice")
      .then((res) => {
          setRows(res.data.map((item, index) => {
            return { ...item, id: index + 1 }
          }))
        setRowss(
          res.data.map((item, index) => {
            return { ...item, id: index + 1 }
          })
        )
      })
      .catch((err) => console.log(err))
  }, [update])

  useEffect(() => {
    if (contentFind) {
      setRowss(rows.filter(item => item.nameProduct.toLowerCase().indexOf(contentFind.toLowerCase()) !== -1));
    }
    else {
      setRowss(rows);
    }
  }, [contentFind])

  useEffect(() => {
    if (loc) {
      setRowss(rows.filter(item => {
        if (dateEnd && dateStart) {
          const dateS = new Date(dateStart);
          const dateE = new Date(dateEnd);
          const dateN = new Date(item.dateEnd);
          return dateS <= dateN && dateN <= dateE;
        }
      }))
    }
    else {
      //console.log("lọc",loc);
      //console.log("tt", theOrders);
      setRowss(rows)

    }
  }, [loc])

  function check(dateEnd) {
    const dateE = new Date(dateEnd);
    const dateN = new Date();
    return dateE < dateN ? false : true;
  }

  const handleNotUpdate = () =>{
    alert("Đã có sản phẩm được mua với giá này  hoặc thời gian áp dụng đã kết thúc không thể sửa!")
  }

  const handleDelete = (row) =>{
    if(!row.update){
      alert("Đã có sản phẩm mua với giá này không thể xóa!")
    }
    else
    {
      if(window.confirm("Bạn thật sự muốn xóa dữ liệu giá sản phẩm này?"))
      {
        axios.delete("http://localhost:8081/admin/historyprice/" + row.staffId + "/" + row.productId + "/" + row.dateStart)
          .then(res => {
            console.log("update", update);
            setUpdate(!update)
            alert("Xóa thành công.")
          })
          .catch(err => alert("Hệ thống xảy ra lỗi"))
      }
    }
  }
  /// 
  const columns = [
    { field: 'id', headerName: 'STT', width: 50, },
    { field: 'nameProduct', headerName: 'Tên sản phẩm', width: 300, },
    { field: "dateStart", headerName: 'Ngày áp dụng', width: 150, },
    { field: 'dateEnd', headerName: 'Ngày kết thúc', width: 150, },
    {
      field: 'price',
      headerName: 'Giá',
      type: 'number',
      width: 150,

    },
    {
      field: "fullName",
      headerName: 'Họ tên nhân viên',
      width: 200,

    },
    {
      field: "action",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        return (
          <div className='action'>
            {params.row.update && check(params.row.dateEnd)
              ? <SavePriceProduct row={params.row} rows={rows} update={update} setUpdate={setUpdate} callAPI={"http://localhost:8081/admin/historyprice"} />
              : <button className='btnedit' onClick={handleNotUpdate}>
                <UilEdit />
              </button>
            }

            <button className='btndelete' onClick={() => {
              handleDelete(params.row)
            }}>
              <UilTrashAlt />
            </button>
          </div>
        )
      }
    }
  ];
  return (
    <div className='MainDash'>
      <h1>Giá Sản phẩm</h1>
      {/* <TopPicAdminProduct title={"Nhập vào tên sản phẩm"} model={<SavePriceProduct display={"Thêm"} setRows={setRows} rows={rows} callAPI={"http://localhost:8081/admin/historyprice"} />} /> */}
      <TopPicAdminFull tittle={"Nhập tên sản phẩm"} setContentFind={setContentFind}
        setDateStart={setDateStart} setDateEnd={setDateEnd} dateStart={dateStart} dateEnd={dateEnd} setLoc={setLoc} loc={loc}
        model={<SavePriceProduct display={"Thêm"} rows={rows} setUpdate={setUpdate} update={update} callAPI={"http://localhost:8081/admin/historyprice"} />} />
      <MainAdminAction columns={columns} rows={rowss} title="Danh sách giá sản phẩm" />
    </div>
  )
}

export default AdminPriceProduct