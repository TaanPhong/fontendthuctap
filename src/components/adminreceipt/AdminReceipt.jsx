import React from 'react'
import { UilEdit, UilTrashAlt } from '@iconscout/react-unicons'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import "./style.css"
import MainAdminAction from '../mainadminaction/MainAdminActoin';
import TopPicAdminProduct from '../adminproduct/TopPicAdminProduct';
import SaveReceipt from './SaveReceipt';
import { useContext } from 'react';
import { Context } from '../../Context/Context';
import TopPicAdminFull from '../toppicadminfull/TopPicAdminFull';
import DetailNote from '../detailnote/DetailNote';


const AdminReceipt = () => {
  const [contentFind, setContentFind] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [loc, setLoc] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowss, setRowss] = useState([]);
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:8081/admin/receipt")
      .then((res) => {
        setRows(
          res.data.map((item) => {
            return item
          })
        )
        setRowss(
          res.data.map((item) => {
            return item
          })
        )
      })
      .catch((err) => console.log(err))
  }, [update])
  useEffect(() => {
    if (contentFind) {
      setRowss(rows.filter(item => item.supplierName.toLowerCase().indexOf(contentFind.toLowerCase()) !== -1));
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
          const dateN = new Date(item.dateFound);
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

  const context = useContext(Context);
  const handleDelete = (row) => {
    let checkDelete = null;
    context.products.forEach(element => {
      row.receiptDetailDTOs.forEach((element2) => {
        if (element.id === element2.productId) {
          if (element.numberOf - element2.numberOf < 0) {
            checkDelete = element;
            return;
          }
        }
      })
      if (!checkDelete) {
        return;
      }
    });
    if (!checkDelete) {
      if (window.confirm("Bạn thật sự muốn xóa phiếu nhập này?")) {
        axios.delete("http://localhost:8081/admin/receipt/" + row.id)
          .then(res => {
            alert("Xóa thành công")
            setUpdate(!update)
          })
          .catch(err => alert("Hệ thống xảy ra lỗi!"))
      }
    }
    else {
      alert("Không thể xóa phiếu nhập này vì nếu xóa sản phẩm " + checkDelete.nameProduct + " sẽ có số lượng tồn nhỏ hơn 0!");
    }
  }
  const columns = [
    { field: 'id', headerName: 'Mã Phiếu nhập', width: 130, },
    { field: 'dateFound', headerName: 'Ngày giờ nhập', width: 200, },
    { field: "supplierName", headerName: 'Tên nhà cung cấp', width: 300, },
    { field: 'fullName', headerName: 'Nhân viên nhập', width: 150, },
    {
      field: 'totalMoney',
      headerName: 'Tổng giá trị nhập',
      type: 'number',
      width: 150,

    },
    {
      field: "action",
      headerName: "",
      width: 250,
      renderCell: (params) => {
        return (
          <div className='action'>
            <SaveReceipt callAPI={"http://localhost:8081/admin/receipt/" + params.row.id} rows={rows} row={params.row} setUpdate={setUpdate} update={update} />
            <button className='btndelete' onClick={() => handleDelete(params.row)}>
              <UilTrashAlt />
            </button>
            <div className="detailNoteReceipt">
              <DetailNote row={params.row} display="" />
            </div>
          </div>
        )
      }
    }
  ];
  return (
    <div className='MainDash'>
      <h1>Nhập hàng</h1>
      {/* <TopPicAdminProduct title={"Nhập vào mã phiếu nhập"}  /> */}
      <TopPicAdminFull tittle={"Nhập tên nhà cung cấp"} setContentFind={setContentFind}
        setDateStart={setDateStart} setDateEnd={setDateEnd} dateStart={dateStart} dateEnd={dateEnd} setLoc={setLoc} loc={loc}
        model={<SaveReceipt display={"Thêm"} callAPI={"http://localhost:8081/admin/receipt"} rows={rows} setUpdate={setUpdate} update={update} />} />
      <MainAdminAction columns={columns} rows={rowss} title="Danh sách phiếu nhập" />
    </div>
  )
}

export default AdminReceipt