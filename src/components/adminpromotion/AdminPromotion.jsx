import React, { useContext } from 'react'
import { UilEdit, UilTrashAlt } from '@iconscout/react-unicons'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import "./style.css"
import MainAdminAction from '../mainadminaction/MainAdminActoin';
import TopPicAdminProduct from '../adminproduct/TopPicAdminProduct';
import ButtonThem from '../adminpromotion/ButtonThem';
import { Context } from '../../Context/Context';
import TopPicAdminFull from '../toppicadminfull/TopPicAdminFull';
import DetailPromotion from './DetailPromotion';




const AdminPromotion = () => {
    const [rows, setRows] = useState([]);
    const context = useContext(Context);
    const [content, setContent] = useState("");
    useEffect(() => {
        axios.get("http://localhost:8081/admin/promotion")
            .then((res) => {
                setRows(
                    res.data
                )
                context.setPromotions(res.data)
            })
            .catch((err) => console.log(err))
    }, [])
    useEffect(() => {
        setRows(context.promotions)
    }, [context.promotions])
    useEffect(() => {
        setRows(context.promotions.filter((item) => {
            return item.id.toString().indexOf(content) !== -1
        }))
    }, [content])

    // column

    function handleDelete(row){
        if(row.delete){
            if(window.confirm("Bạn thật sự muốn xóa chương trình khuyễn mãi này?"))
            {
                axios.delete("http://localhost:8081/admin/promotion/" + row.id)
                .then(
                    (res) => {
                        console.log("Vào");
                        setRows(rows.filter(item =>{
                            return item.id !== row.id;
                        }))
                        context.setPromotions(context.promotions.filter(item => {
                            return item.id !== row.id;
                        }))
                        alert("Xóa thành công.")
                    }
                )
                .catch(
                    err => {
                        alert("Hệ thống xảy ra lỗi vui lòng chờ trong ít phút!")
                    }
                )
            }
        }
        else
        {
            alert("Đã có sản phẩm được bán với giá khuyến mãi trong chương trình khuyễn mãi này.")
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, },
        { field: 'description', headerName: 'Lý do', width: 700, },
        { field: 'fullName', headerName: 'Nhân viên tạo', width: 150, },
        {
            field: "action",
            headerName: "",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className='action'>
                        <button className='btnedit'>
                            <UilEdit />
                        </button>
                        <button className='btndelete' onClick={()=> handleDelete(params.row)}>
                            <UilTrashAlt />
                        </button>
                        <div className="detailNoteReceipt">
                            <DetailPromotion row={params.row} />
                        </div>
                    </div>
                )
            }
        }
    ];

    return (
        <div className='MainDash'>
            <h1>Khuyến mãi</h1>
            <TopPicAdminProduct title={"Nhập mã khuyến mãi"} model={<ButtonThem />} setContent={setContent} />
            <MainAdminAction columns={columns} rows={rows} title="Danh sách khuyến mãi" />
        </div>
    )
}

export default AdminPromotion