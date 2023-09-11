import React, { useContext } from 'react'
import TopPicAdminProduct from './TopPicAdminProduct'
import MainAdminProduct from '../mainadminaction/MainAdminActoin'
import { UilEdit, UilTrashAlt } from '@iconscout/react-unicons'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import "./style.css"
import SaveProduct from './SaveProduct';
import { Context } from '../../Context/Context';


const AdminProduct = () => {
  const context = useContext(Context);
  const [content, setContent] = useState("");
  const [rowss, setRowss] = useState([]);
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:8081/product")
      .then((res) => {
        //setRows(res.data)
        context.setProducts(res.data);
        setRowss(res.data)
      })
      .catch((err) => console.log(err))
  }, [update])

  useEffect(() => {
    if (content) {
      setRowss(context.products.filter(item => item.nameProduct.toLowerCase().indexOf(content.toLowerCase()) !== -1));
    }
    else {
      setRowss(context.products)
    }
  }, [content])

  ///======================================== columss ===========================//
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, },
    { field: 'nameProduct', headerName: 'Tên sản phẩm', width: 300, },
    { field: 'price', headerName: 'Giá sản phẩm', width: 150, },
    {
      field: 'numberOf',
      headerName: 'Số lượng',
      type: 'number',
      width: 150,

    },
    {
      field: 'nameType',
      headerName: 'Loại sản phẩm',
      width: 200,

    },
    {
      field: 'nameBrand',
      headerName: 'Thương hiệu',
      width: 200,
    },
    {
      field: "action",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        //console.log("params", params);
        return (
          <div className='action'>
            <SaveProduct row={params.row} callAPI={"http://localhost:8081/admin/product/" + params.row.id} setUpdate={setUpdate} update={update} rows={rowss} />
            <button className='btndelete' onClick={() => { deleted(params.row.isDelete, params.row.id) }}>
              <UilTrashAlt />
            </button>
          </div>
        )
      }
    }
  ];

  function deleted(isDelete, id) {
    if (isDelete) {
      alert("Không thể xóa sản phẩm này!")
    }
    else {
      var choose = window.confirm("Bạn thật sự muốn xóa sản phẩm này");
      if (choose) {
        axios.delete("http://localhost:8081/admin/product/" + id)
          .then((res) => {
            setRowss(rowss.filter(item => item.id !== id));
            alert("xóa thành công")
            context.setProducts(context.products.filter(item => item.id !== id));
          })
          .catch((error) => alert("Quá trình xóa xảy ra lỗi"))
      }
    }
  }

  return (
    <div className='MainDash'>
      <h1>Sản phẩm</h1>
      <TopPicAdminProduct model={<SaveProduct display="Thêm" callAPI="http://localhost:8081/admin/product" update={update} setUpdate={setUpdate} rows={rowss} />} title={"Nhập tên sản phẩm"} setContent={setContent} />
      <MainAdminProduct columns={columns} rows={rowss} title="Danh sách sản phẩm" />
    </div>
  )
}

export default AdminProduct