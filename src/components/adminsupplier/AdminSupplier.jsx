import React from 'react'
import { UilEdit, UilTrashAlt } from '@iconscout/react-unicons'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import "./style.css"
import MainAdminAction from '../mainadminaction/MainAdminActoin';
import TopPicAdminProduct from '../adminproduct/TopPicAdminProduct';
import SaveSupplier from './SaveSupplier';

const AdminSupplier = () => {
    const [rows, setRows] = useState([]);
    const [content, setContent] = useState("");
    const [rowss, setRowss] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8081/admin/supplier")
            .then((res) => {
                setRows(
                    res.data
                )
                setRowss(res.data)
            })
            .catch((err) => console.log(err))
    }, [])
    useEffect(() => {
        if (content) {
            setRowss(rows.filter(item => item.nameSupplier.toLowerCase().indexOf(content.toLowerCase()) !== -1));
        }
        else {
            setRowss(rows)
        }
    }, [content])
    // Log row
    //console.log("rows", rows);
    // Xóa
    function deleteSupplier(row, setRows, rows){
        //console.log("delete", row);
        if(row.delete)
        {
            if(window.confirm("Bạn thật sự muốn xóa nhà cung cấp này?"))
            {
                axios.delete("http://localhost:8081/admin/supplier/" + row.id)
                    .then((res)=>{
                        setRows(rows.filter(item => item.id !== row.id))
                        alert("Xóa thành công")
                    })
                    .catch(()=> alert("Quá trình xóa xảy ra lỗi!!!"))
            }
        }
        else
        {
            alert("Bạn không thể xóa nhà cung cấp này.")
        }
    }

    // column
    const columns = [
        { field: 'id', headerName: 'ID', width: 70, },
        { field: 'nameSupplier', headerName: 'Tên nhà cung cấp', width: 200, },
        { field: 'numberPhone', headerName: 'Số điện thoại', width: 150, },
        { field: 'location', headerName: 'Địa chỉ', width: 450, },
        { field: 'email', headerName: 'Email', width: 200, },
        {
            field: "action",
            headerName: "",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className='action'>
                        <SaveSupplier row={params.row} rows={rowss} setRows={setRowss} callAPI={"http://localhost:8081/admin/supplier/" + params.row.id}/>
                        <button className='btndelete' onClick={() => {  
                            deleteSupplier(params.row, setRowss, rowss)
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
            <h1>Nhà cung cấp</h1>
            <TopPicAdminProduct model={<SaveSupplier display={"Thêm"} callAPI={"http://localhost:8081/admin/supplier"} rows={rowss} setRows={setRowss}/>} setContent={setContent} title={"Nhập mã nhà cung cấp"}/>
            <MainAdminAction columns={columns} rows={rowss} title="Danh sách nhà cung cấp" />
        </div>
    )
}

export default AdminSupplier