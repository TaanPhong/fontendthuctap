import React, { useContext } from 'react'
import { UilPadlock } from '@iconscout/react-unicons'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import "./style.css"
import MainAdminAction from '../mainadminaction/MainAdminActoin';
import TopPicAdminProduct from '../adminproduct/TopPicAdminProduct';
import SaveStaff from './SaveStaff';
import { Context } from '../../Context/Context';


const AdminStaff = () => {
    const [rows, setRows] = useState([]);
    const [content, setContent] = useState("");
    const [rowss, setRowss] = useState([]);
    const [update, setUpdate] = useState(true);
    //const context = useContext(Context);
    useEffect(() => {
        axios.get("http://localhost:8081/admin/staff")
            .then((res) => {
                setRows(
                    res.data.map((item) => {
                        return { ...item, status: item.status ? "Còn làm" : "Đã nghỉ" }
                    })
                )
                setRowss(
                    res.data.map((item) => {
                        return { ...item, status: item.status ? "Còn làm" : "Đã nghỉ" }
                    })
                )
            })
            .catch((err) => console.log(err))
    }, [update])
    useEffect(() => {
        if (content) {
            setRowss(rows.filter(item => item.fullName.toLowerCase().indexOf(content.toLowerCase()) !== -1));
        }
        else {
            setRowss(rows)
        }
    }, [content])
    // update 
    function updateLock(row, setRows, rows) {
        let messenger = "";
        let status = 0;
        if (row.status === "Còn làm") {
            messenger = "Bạn thật sự muốn khóa nhân viên này?";
            status = 0;
        }
        else {
            messenger = "Bạn thật sự muốn mở khóa nhân viên này?";
            status = 1;
        }

        var lock = window.confirm(messenger);
        if (lock) {
            axios.put("http://localhost:8081/admin/staff/" + row.id, { ...row, status })
                .then((res) => {
                    setRows(rows.map(item => {
                        return item.id === res.data.id ? { ...res.data, status: res.data.status ? "Còn làm" : "Đã nghỉ" } : item;
                    }))
                    if (status) {
                        axios.put("http://localhost:8081/admin/unlock/" + row.id)
                            .then(res => alert("Mở khóa thành công."))
                            .catch(err => alert("Xảy ra  lỗi"))
                    }
                    else {
                        axios.put("http://localhost:8081/admin/lock/" + row.id)
                            .then(resp => {
                                alert("Khóa thành công.")
                            })
                            .catch(err => alert("Xảy ra  lỗi"))
                    }

                })
        }
    }
    /// column
    const columns = [
        { field: 'id', headerName: 'ID', width: 70, },
        { field: 'fullName', headerName: 'Họ và tên', width: 200, },
        { field: 'numberPhone', headerName: 'Số điện thoại', width: 150, },
        { field: 'location', headerName: 'Địa chỉ', width: 300, },
        { field: 'citizenID', headerName: 'CCCD', width: 150, },
        { field: 'status', headerName: 'Trạng thái', width: 150, backGround: "red" },
        {
            field: "action",
            headerName: "",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className='action'>
                        <SaveStaff row={params.row} setUpdate={setUpdate} update={update} rows={rows} callAPI={"http://localhost:8081/admin/staff/" + params.row.id} />
                        {
                            params.row.id !== 1 ? <button className='btndelete' onClick={() => {
                                updateLock(params.row, setRowss, rowss);
                            }}>
                                <UilPadlock />
                            </button>
                                : <></>
                        }
                    </div>
                )
            }
        }
    ];
    return (
        <div className='MainDash'>
            <h1>Nhân viên</h1>
            <TopPicAdminProduct title={"Nhập tên nhân viên"} model={<SaveStaff display={"Thêm"} setUpdate={setUpdate} update={update} rows={rows} callAPI={"http://localhost:8081/register"} />} setContent={setContent} />
            <MainAdminAction columns={columns} rows={rowss} title="Danh sách nhân viên" />
        </div>
    )
}

export default AdminStaff