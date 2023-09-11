import React, { useContext } from 'react'
import TopPicAdminProduct from '../adminproduct/TopPicAdminProduct'
import MainAdminProduct from '../mainadminaction/MainAdminActoin'
import { UilEdit, UilTrashAlt } from '@iconscout/react-unicons'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import "./style.css"
import { Context } from '../../Context/Context';
import SaveTypeProduct from './SaveTypeProduct';

const AdminTypeProduct = () => {
    const context = useContext(Context);
    const [content, setContent] = useState("");
    const [rows, setRows] = useState([]);
    const [rowss, setRowss] = useState([]);
    const [update, setUpdate] = useState(true);
    useEffect(() => {
      axios.get("http://localhost:8081/admin/type/product")
        .then((res) => {
          //setRows(res.data)
          setRows(res.data);
          setRowss(res.data)
        })
        .catch((err) => console.log(err))
    }, [update])
  
    useEffect(() => {
      if (content) {
        setRowss(rows.filter(item => item.nameType.toLowerCase().indexOf(content.toLowerCase()) !== -1));
      }
      else {
        setRowss(rows)
      }
    }, [content])
  
    ///======================================== columss ===========================//
    const columns = [
      { field: 'id', headerName: 'ID', width: 70, },
      { field: 'nameType', headerName: 'Tên loại sản phẩm', width: 800, },
      {
        field: "action",
        headerName: "",
        width: 150,
        renderCell: (params) => {
          return (
            <div className='action'>
              <SaveTypeProduct row={params.row} callAPI={"http://localhost:8081/admin/type/product/" + params.row.id} setUpdate={setUpdate} update={update} rows={rows} />
              <button className='btndelete' onClick={() => { deleted(params.row.productDTOs, params.row.id) }}>
                <UilTrashAlt />
              </button>
            </div>
          )
        }
      }
    ];
  
    function deleted(productDTOs, id) {
      if (productDTOs.length !== 0) {
        alert("Không thể xóa loại sản phẩm này!")
      }
      else {
        var choose = window.confirm("Bạn thật sự muốn xóa loại sản phẩm này");
        if (choose) {
          axios.delete("http://localhost:8081/admin/type/product/" + id)
            .then((res) => {
              setRowss(rowss.filter(item => item.id !== id));
              alert("xóa thành công")
              setRows(rows.filter(item => item.id !== id));
            })
            .catch((error) => alert("Quá trình xóa xảy ra lỗi"))
        }
      }
    }
  
    return (
      <div className='MainDash'>
        <h1>Loại sản phẩm</h1>
        <TopPicAdminProduct model={<SaveTypeProduct display="Thêm" callAPI="http://localhost:8081/admin/type/product" update={update} setUpdate={setUpdate} rows={rows} />} title={"Nhập tên loại sản phẩm"} setContent={setContent} />
        <MainAdminProduct columns={columns} rows={rowss} title="Danh sách loại sản phẩm" />
      </div>
    )
}

export default AdminTypeProduct