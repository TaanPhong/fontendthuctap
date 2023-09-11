import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UilFileCheckAlt, UilDocumentInfo } from '@iconscout/react-unicons'
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../../Context/Context';
import { useEffect } from 'react';
import axios from 'axios';
import Paginate from '../Paginate/Paginate';
import DetailNote from '../detailnote/DetailNote';


const makeStyles = (staus) => {
    if (staus === 'Hoàn thành') {
        return {
            background: 'rgb(145 254 159 / 47%)',
            color: 'green',
        }
    }
    else if (staus === 'Chờ duyệt') {
        return {
            background: '#ffadad8f',
            color: 'red',
        }
    }
    else {
        return {
            background: '#59bfff',
            color: 'white',
        }
    }
}

const browser = (status, row, callAPI) => {
    if (status !== 'Đã hủy' && status !== "Hoàn thành") {
        return <DetailNote row={row} display={display(status)} callAPI ={callAPI}/>;
    }
    else {
        return <UilDocumentInfo className='detailIcon' />;
    }
}

function display (status){
    if(status === 'Chờ duyệt'){
        return "Duyệt đơn";
    }
    else if(status === "Đang lấy hàng"){
        return "Giao hàng";
    }
    else if(status === "Đang vận chuyển")
    {
        return "Hoàn thành";
    }
    else
        return "";
}

const TableOrderAdmin = ({contentFind, dateStart, dateEnd, loc}) => {
    const [theOrders, setTheOrders] = useState([]);
    const [theOrderss, setTheOrderss] = useState([]);
    const [isUpdate, setIsUpdate] = useState(true);
    const context = useContext(Context)
    useEffect(() => {
        axios.get("http://localhost:8081/admin/orders")
            .then((res) => {setTheOrders(res.data)
                setTheOrderss(res.data)
            })
            .catch((error) => console.log(error))
    }, [isUpdate])
    useEffect(()=>{
        if(contentFind){
            setTheOrderss(theOrders.filter(item => item.id.toString().indexOf(contentFind) !== -1));
        }
        else
        {
            setTheOrderss(theOrders);
        }
    }, [contentFind])
    useEffect(() => {
        if (loc) {
            setTheOrderss(theOrders.filter(item => {
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
            console.log("tt", theOrders);
            setTheOrderss(theOrders)
            
        }
    }, [loc])
    // Thay đổi trang
    const [currentPageData, setCurrentPageData] = useState(1);
    const [postsPage, setPostsPage] = useState(5);
    const lastPostsIndex = currentPageData * postsPage;
    const firstPostIndex = lastPostsIndex - postsPage;
    const currentPosts = theOrderss.slice(firstPostIndex, lastPostsIndex);

    // Call API 
    function callAPI (row){
        let data = null;
        let update = false;
        let updateData = null;
        if(row.status === "Chờ duyệt")
        {
            update = true;
            updateData = {...row, "staffID": context.isLogin.staffDTO.id}
            data = {
                "theOrderId": row.id,
                "statusId": 3,
            }
        }
        else if(row.status === "Đang lấy hàng"){
            data = {
                "theOrderId": row.id,
                "statusId": 4,
            }
        }
        else if(row.status === "Đang vận chuyển")
        {
            data = {
                "theOrderId": row.id,
                "statusId": 5,
            }
        }
        axios.post("http://localhost:8081/user/historystatus", data)
            .then((res)=> {
                const order = theOrders.find((item) => item.id === res.data.theOrderId)
                setTheOrders(theOrders.map((item)=>
                {
                    return item.id === order.id ? {...item, status: res.data.status}: item
                }))
                alert("Cập nhật đơn hàng thành công!")
                setIsUpdate(!isUpdate)
            })
            .catch((error) => console.log(error))
        if(update){
            axios.put("http://localhost:8081/admin/orders/" + row.id, updateData)
                .then(res => console.log("Cập nhật thành công"))
                .catch(err => console.log("Lỗi"));
        }
    }

    return (
        <div className="Table">
            <h3>Danh sách đơn đặt hàng</h3>
            <TableContainer component={Paper}
                style={
                    {
                        boxShadow: "0px 13px 20px 0px #80808029"
                    }
                }
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã đơn đặt hàng</TableCell>
                            <TableCell align="left">Ngày giờ đặt</TableCell>
                            <TableCell align="left">Tổng tiền</TableCell>
                            <TableCell align="left">Trạng thái hiện tại</TableCell>
                            <TableCell align="left">Cập nhật trạng thái</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <>
                            {currentPosts.map((row) => (
                                <TableRow className='rowbody'
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="left">{row.dateFound}</TableCell>
                                    <TableCell align="left">{row.totalMoney}</TableCell>
                                    <TableCell align="left">
                                        <span className='status' style={makeStyles(row.status)}>{row.status}</span>
                                    </TableCell>
                                    <TableCell align="left" className='detail'>{browser(row.status, row, callAPI)}</TableCell>
                                    <TableCell align="left" className='detail'><DetailNote row={row} display=""/> </TableCell>
                                </TableRow>

                            ))}
                            <Paginate totalPosts={theOrderss.length} postsPerPage={postsPage} setCurrentPageData={setCurrentPageData} currentPageData={currentPageData} />
                        </>
                    </TableBody>
                    
                </Table>
            </TableContainer>
        </div>
    )
}

export default TableOrderAdmin