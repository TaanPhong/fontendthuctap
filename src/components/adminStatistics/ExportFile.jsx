import axios from 'axios'
import React from 'react'

const ExportFile = ({status}) => {
    const handleClickExcel = () => {
        let api = "";
        let file = "";
        if(!status || status === "Doanh thu")
        {
            api = "http://localhost:8081/admin/excel/revenue";
            file = 'revenue.xlsx';
        }
        else if(status === "Tất cả sản phẩm"){
            api = "http://localhost:8081/admin/excel/all-product";
            file = "allProduct.xlsx";
        }
        axios.get(api, {
            responseType: 'blob', // Để xác định dữ liệu trả về là file
        })
            .then(res => {
                const blob = new Blob([res.data], { type: 'application/octet-stream' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(err => alert("Hệ thống gặp lỗi"))
    }

    const handleClickPDF = () =>{
        let api = "";
        let file = "";
        if(!status || status === "Doanh thu")
        {
            api = "http://localhost:8081/admin/pdf/revenue";
            file = 'revenue.pdf';
        }
        else if(status === "Tất cả sản phẩm"){
            api = "http://localhost:8081/admin/pdf/all-product";
            file = "allProduct.pdf";
        }
        axios.get(api, {responseType: "blob"})
            .then(res =>{
                const blob = new Blob([res.data], { type: 'application/octet-stream' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(err => alert("Hệ thống gặp lỗi"))
    }

    return (
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                style={{
                    background: "#2579f2", color: "#fff", borderRadius: "8px",
                    padding: "10px", fontSize: "16px", fontWeight: 600
                }}>
                Xuất file
            </button>
            <ul class="dropdown-menu" id='export-file'>
                <li onClick={() => handleClickExcel()}>Xuất file excel</li>
                <li onClick={handleClickPDF}>Xuất file pdf</li>
            </ul>
        </div>
    )
}

export default ExportFile