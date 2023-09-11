import React from 'react'
import "./style.css"
import { useState } from 'react'
import TopPicAdminFull from '../toppicadminfull/TopPicAdminFull';
import MainAdminAction from '../mainadminaction/MainAdminActoin';
import { useEffect } from 'react';
import axios from 'axios';
import ExportFile from './ExportFile';
import RevenueChart from '../chart/RevenueChart';
import AllProductChart from '../chart/AllProductChart';

const AdminStatistical = () => {
  const [contentFind, setContentFind] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [loc, setLoc] = useState(false);
  const combobox = ["Doanh thu", "Tất cả sản phẩm"];
  const [rowss, setRowss] = useState([]);
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("");
  const [columns, setColumns] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (contentFind) {
      setRowss(rows.filter(item => item.date.indexOf(contentFind) !== -1));
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
          const dateN = new Date(item.date);
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

  ///======================================== columss ===========================//

  useEffect(() => {
    if (!status || status === "Doanh thu") {
      const col = [
        { field: 'id', headerName: 'STT', width: 70, },
        { field: 'date', headerName: 'Ngày', width: 120, },
        { field: 'sumOrther', headerName: 'Tổng số đơn', width: 150, },
        {
          field: 'revenue',
          headerName: 'Doanh thu',
          type: 'number',
          width: 150,

        },
        {
          field: 'reduce',
          headerName: 'Giảm giá',
          type: 'number',
          width: 150,

        },
        {
          field: 'cancelOrder',
          headerName: 'Đơn hàng bị hủy',
          type: 'number',
          width: 150,

        },
        {
          field: 'sumCancelOrder',
          headerName: 'Số đơn hủy',
          type: 'number',
          width: 150,

        },
        {
          field: 'sumRevenue',
          headerName: 'Tổng doanh thu',
          type: 'number',
          width: 150,

        },
      ];
      setColumns(col)
      axios.get("http://localhost:8081/admin/revenue")
        .then((res) => {
          setRows(res.data.map((item, index) => {
            return {
              ...item, id: index + 1
            }
          }))
          setRowss(res.data.map((item, index) => {
            return {
              ...item, id: index + 1
            }
          }));
        })
        .catch((err) => console.log(err))
    }
    else if (status === "Tất cả sản phẩm") {
      const col = [
        { field: 'id', headerName: 'STT', width: 50, },
        { field: 'nameProduct', headerName: 'Tên sản phẩm', minWidth: 350, wrapText: true },
        { field: 'importNumber', headerName: 'Số lượng nhập', width: 150, },
        {
          field: 'exportNumber',
          headerName: 'Số lượng xuất',
          type: 'number',
          width: 150,

        },
        {
          field: 'inventoryNumber',
          headerName: 'Tồn kho',
          type: 'number',
          width: 150,

        },
        {
          field: 'sumImport',
          headerName: 'Tổng giá trị nhập',
          type: 'number',
          width: 150,

        },
        {
          field: 'sumExport',
          headerName: 'Tổng giá trị xuất',
          type: 'number',
          width: 150,
        },
      ]
      setColumns(col)
      axios.get("http://localhost:8081/admin/statistical")
        .then((res) => {
          setRows(res.data.map((item, index) => {
            return {
              ...item, id: index + 1
            }
          }))
          setRowss(res.data.map((item, index) => {
            return {
              ...item, id: index + 1
            }
          }));
        })
        .catch((err) => console.log(err))
    }
  }, [status])

  // Hiển thị đồ thị 
  function displayChart() {
    if (status === "Tất cả sản phẩm" && rows.length !== 0) {
      if(rows[0].nameProduct)
      {
        return (
          <AllProductChart param={rows} setExpanded={setExpanded} expanded={expanded} />
        )
      }
        
    }
    else if ((!status || status === "Doanh thu") && rows.length !== 0) {
      if(rows[0].date)
      {
        return (
          <RevenueChart param={rows} setExpanded={setExpanded} expanded={expanded} />
        )
      }
        
    }
  }

  return (
    <div className='MainDash'>
      <h1>Thống kê</h1>
      <TopPicAdminFull tittle={"Nhập ngày"} setContentFind={setContentFind} model={<ExportFile status={status} />} setStatus={setStatus} status={status}
        setDateStart={setDateStart} combobox={combobox} setDateEnd={setDateEnd} dateStart={dateStart}
        contentStatus={"Thống kê"} dateEnd={dateEnd} setLoc={setLoc} loc={loc} />

      {displayChart()}
      {
        expanded ? <MainAdminAction title={"Thống kê"} columns={columns} rows={rowss} />
          : <></>
      }
    </div>

  )
}

export default AdminStatistical