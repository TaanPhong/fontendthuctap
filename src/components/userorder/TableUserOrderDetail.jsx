import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UilFileCheckAlt, UilDocumentInfo } from '@iconscout/react-unicons'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../Context/Context'
import Paginate from '../Paginate/Paginate';
import ConfirmEven from './ConfirmEven';
import DetailNote from '../detailnote/DetailNote';
import { useNavigate } from 'react-router-dom';

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
const browser = (status, row, update, setUpdate) => {
    if (status === 'Chờ duyệt') {
        return <ConfirmEven row={row} update={update} setUpdate={setUpdate} />;
    }
    else if (status === "Đã hủy") {
        return <UilDocumentInfo className='detailIcon' />;
    }
    else {
        return < UilFileCheckAlt className="detailIcon" />;
    }
}



const TableUserOrderDetail = ({ orderId, dateStart, dateEnd, loc }) => {
    const [theOrders, setTheOrders] = useState([]);
    const [theOrderss, setTheOrderss] = useState([]);
    const [update, setUpdate] = useState(true);
    const context = useContext(Context)
    useEffect(() => {
        axios.get("http://localhost:8081/user/orders/" + context.isLogin.customerDTO.id)
            .then((res) => {
                setTheOrders(res.data)
                setTheOrderss(res.data)
            })
            .catch((error) => console.log(error))
            setTheOrderss(theOrders)
    }, [update])
    useEffect(() => {
        if (orderId) {
            setTheOrderss(theOrders.filter(item => item.id.toString().indexOf(orderId.toString()) !== -1));
        }
        else
        {
            setTheOrderss(theOrders)
        }
            
    }, [orderId])
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
    // Đặt lại đơn
    const navigate = useNavigate();
    function reAddTheOrder(row) {
        context.setCartItem([]);
        let cartItem = [];
        row.theOrderDetailDTOs.map((item) => {
            const product = context.products.find((pro) => item.productId === pro.id)
            if(product)
            {
                const data = {...product, "sl": item.numberOf}
                cartItem.push(data);
            }
        })
        context.setCartItem(cartItem);
        navigate("/cart")
    }
    // Thay đổi trang
    const [currentPageData, setCurrentPageData] = useState(1);
    const [postsPage, setPostsPage] = useState(5);
    const lastPostsIndex = currentPageData * postsPage;
    const firstPostIndex = lastPostsIndex - postsPage;
    const currentPosts = theOrderss.slice(firstPostIndex, lastPostsIndex);
    return (
        <div className="Table">
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
                            <TableCell>Mã đơn hàng</TableCell>
                            <TableCell align="left">Ngày đặt</TableCell>
                            <TableCell align="left">Thành tiền</TableCell>
                            <TableCell align="left">Trạng thái</TableCell>
                            <TableCell align="left">Hủy đơn</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentPosts.length ?
                            <>
                                {
                                    currentPosts.map((row) => (
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
                                            <TableCell align="left" className='detail' >{browser(row.status, row, update, setUpdate)}</TableCell>
                                            <TableCell align="left" className='detail'><DetailNote row={row} display="Đặt lại" callAPI={reAddTheOrder} /> </TableCell>
                                        </TableRow>

                                    ))
                                }
                                <Paginate totalPosts={theOrderss.length} postsPerPage={postsPage} setCurrentPageData={setCurrentPageData} currentPageData={currentPageData} />
                            </>
                            : <></>}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TableUserOrderDetail