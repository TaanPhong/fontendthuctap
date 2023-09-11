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

const MainAdminCustomer = ({content}) => {
    const [customers, setCustomers] = useState([]);
    const [customerss, setCustomerss] = useState([]);
    //const context = useContext(Context)
    useEffect(() => {
        axios.get("http://localhost:8081/admin/customers")
            .then((res) => {setCustomers(res.data)
                setCustomerss(res.data)
            })
            .catch((error) => console.log(error))
    }, [])
    useEffect(()=>{
        if(content){
            setCustomerss(customers.filter(item => item.fullName.toLowerCase().indexOf(content.toLowerCase()) !== -1));
        }
        else
        {
            setCustomerss(customers);
        }
    }, [content])
    // Thay đổi trang
    const [currentPageData, setCurrentPageData] = useState(1);
    const [postsPage, setPostsPage] = useState(5);
    const lastPostsIndex = currentPageData * postsPage;
    const firstPostIndex = lastPostsIndex - postsPage;
    const currentPosts = customerss.slice(firstPostIndex, lastPostsIndex);
    return (
        <div className="Table">
            <h3>Danh sách khách hàng</h3>
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
                            <TableCell>Mã khách hàng</TableCell>
                            <TableCell align="left">Họ và tên</TableCell>
                            <TableCell align="left">Số điện thoại</TableCell>
                            <TableCell align="left">Địa chỉ</TableCell>
                            <TableCell align="left">Giới tính</TableCell>
                            <TableCell align="left">Email</TableCell>
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
                                    <TableCell align="left">{row.fullName}</TableCell>
                                    <TableCell align="left">{row.numberPhone}</TableCell>
                                    <TableCell align="left">
                                        {row.location}
                                    </TableCell>
                                    <TableCell align="left">{row.gender}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                </TableRow>

                            ))}
                            <Paginate totalPosts={customerss.length} postsPerPage={postsPage} setCurrentPageData={setCurrentPageData} currentPageData={currentPageData} />
                        </>
                    </TableBody>
                    
                </Table>
            </TableContainer>
        </div>
    )
}

export default MainAdminCustomer