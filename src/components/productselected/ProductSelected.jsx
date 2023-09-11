import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./style.css"
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Paginate from '../Paginate/Paginate';

export default function ProductSelected({ selectRows, setSelectRows }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/product")
            .then(res => setRows(res.data))
            .catch((err) => console.log(err))
    }, [])
    const [currentPageData, setCurrentPageData] = useState(1);
    const [postsPage, setPostsPage] = useState(7);
    const lastPostsIndex = currentPageData * postsPage;
    const firstPostIndex = lastPostsIndex - postsPage;
    const currentPosts = rows.slice(firstPostIndex, lastPostsIndex);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><input type="checkbox" /></TableCell>
                        <TableCell align="left">id</TableCell>
                        <TableCell align="left">Tên sản phẩm</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentPosts.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <input type="checkbox" value={row.id}/>
                            </TableCell>
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell align="left">{row.nameProduct}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Paginate totalPosts={rows.length} postsPerPage={postsPage} setCurrentPageData={setCurrentPageData} currentPageData={currentPageData} />
        </TableContainer>
    );
}