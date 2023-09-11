import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context/Context';
import Modal from '@mui/material/Modal';
import { UilPlusCircle, UilEdit } from '@iconscout/react-unicons'
import './style.css'
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import axios from 'axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    padding: "2rem",
    "border-radius": "8px",
};

const getData = (setData, api) => {
    axios.get(api)
        .then((res) => setData(res.data))
        .catch((error) => console.log(error))
}


const SaveProduct = ({ row, display, callAPI, rows, setUpdate, update }) => {
    const [open, setOpen] = useState(false);
    const [brands, setBrands] = useState([]);
    const [typeProduct, setTypeProduct] = useState([]);
    const handleOpen = () => setOpen(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleClose = () => {
        setOpen(false);
    };

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }
    useEffect(() => {
        getData(setBrands, "http://localhost:8081/brands");
        getData(setTypeProduct, "http://localhost:8081/typeproducts");
    }, [])
    const displayTitle = () => {
        if (display)
            return (
                <div className="rightTopPicNotDate" onClick={handleOpen}>
                    <UilPlusCircle className='add' />
                    <span>Thêm</span>
                </div>
            )
        else
            return (
                <button className='btnedit' onClick={handleOpen}>
                    <UilEdit />
                </button>
            )
    }
    const context = useContext(Context);
    const [errorNameProduct, setErrorNameProduct] = useState("")
    const [errorDescription, setErrorDescription] = useState("")
    const [errorNameBrand, setErrorNameBrand] = useState("")
    const [errorNameType, setErrorNameType] = useState("")
    const [errorStatus, setErrorStatus] = useState("")
    //const [upload, setUpload] = useState(0);
    const formik = useFormik({
        initialValues: {
            id: row ? row.id : null,
            nameProduct: row ? row.nameProduct : "",
            description: row ? row.description : "",
            nameBrand: row ? row.nameBrand : "",
            nameType: row ? row.nameType : "",
            status: row ? row.status : 1,
            price: row ? row.price : 0,
            numberOf: row ? row.numberOf : 0,
            pictureProducts: row ? row.pictureProducts : [],
            commentDTOs: row ? row.commentDTOs : [],
        },
        onSubmit: value => {
            var submit = true;
            if (!value.nameProduct) {
                setErrorNameProduct("Vui lòng nhập tên sản phẩm")
                submit = false;
            }
            if (value.status === -1) {
                setErrorStatus("Vui lòng chọn trạng thái của sản phẩm")
                submit = false
            }
            if (!value.nameBrand) {
                setErrorNameBrand("Vui lòng chọn nhãn hiệu của sản phẩm")
                submit = false
            }
            if (!value.nameType) {
                setErrorNameType("Vui lòng chọn loại sản phẩm")
                submit = false
            }
            if (!value.description) {
                setErrorDescription("Vui lòng nhập mô tả cho sản phẩm")
                submit = false
            }
            if (row && submit) {
                axios.put(callAPI, value)
                    .then(res => {
                        alert("Thay đổi thành công")
                        setOpen(false);
                        setErrorDescription("")
                        setErrorNameBrand("")
                        setErrorNameProduct("")
                        setErrorNameType("")
                        setErrorStatus("")
                        setUpdate(!update);
                        value.id = null;
                        value.nameProduct = "";
                        value.description = "";
                        value.nameBrand = "";
                        value.nameType = "";
                        value.status = 1;
                        value.price = 0;
                        value.numberOf = 0;
                        value.pictureProducts = [];
                        value.commentDTOs = [];
                    }
                    )
                    .catch(error => alert("Quá trình cập nhật xảy ra lỗi!"))
            }
            else if (submit) {
                axios.post(callAPI, value)
                    .then(res => {

                        const formData = new FormData();
                        formData.append('url', selectedFile);
                        formData.append("productId", res.data.id);
                        axios.post("http://localhost:8081/admin/picture", formData, {
                            //params: { productId },
                            headers: { 'Content-Type': 'multipart/form-data' },
                        })
                            .then(ress => {
                                console.log("Thành công");
                            })
                            .catch(err => alert("Xảy ra lỗi"))
                        alert("Thêm thành công")
                        setOpen(false);
                        setErrorDescription("")
                        setErrorNameBrand("")
                        setErrorNameProduct("")
                        setErrorNameType("")
                        setErrorStatus("")
                        setUpdate(!update);
                        value.id = null;
                        value.nameProduct = "";
                        value.description = "";
                        value.nameBrand = "";
                        value.nameType = "";
                        value.status = 1;
                        value.price = 0;
                        value.numberOf = 0;
                        value.pictureProducts = [];
                        value.commentDTOs = [];
                    }
                    )
                    .catch(error => alert("Quá trình thêm xảy ra lỗi!"))
            }
        }
    })
    return (
        <>
            {displayTitle()}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="containerLogin" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3rem" }}>
                        <div className="group-admin-input-product">
                            <h4>Nhập thông tin sản phẩm</h4>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='group-admin-input'>
                                    <label>Nhập tên sản phẩm</label>
                                    <input type="text" placeholder='Nhập tên sản phẩm' name='nameProduct' onFocus={() => setErrorNameProduct("")} onChange={formik.handleChange} value={formik.values.nameProduct} />
                                    <span className='error-message'>{errorNameProduct}</span>
                                </div>
                                <div className='group-admin-input'>
                                    <label>Trạng thái sản phẩm</label>
                                    <select name="status" className="select-admin-product" onFocus={() => setErrorStatus("")} onChange={formik.handleChange} value={formik.values.status}>
                                        <option value={-1}>----</option>
                                        <option value={1} selected="selected">Còn kinh doanh</option>
                                        <option value={0}>Ngừng kinh doanh</option>
                                    </select>
                                    <span className='error-message'>{errorStatus}</span>
                                </div>
                                <div className='group-admin-input'>
                                    <label>Nhập loại sản phẩm</label>
                                    <select name="nameType" className="select-admin-product" onFocus={() => setErrorNameType("")} onChange={formik.handleChange} value={formik.values.nameType}>
                                        <option value="">----</option>
                                        {
                                            typeProduct.map((item, index) => {
                                                return <option key={"type" + index} value={item.nameType}>{item.nameType}</option>
                                            })
                                        }
                                    </select>
                                    <span className='error-message'>{errorNameType}</span>
                                </div>
                                <div className='group-admin-input'>
                                    <label>Nhập nhãn hiệu sản phẩm</label>
                                    <select name="nameBrand" className="select-admin-product" onFocus={() => setErrorNameBrand("")} onChange={formik.handleChange} value={formik.values.nameBrand}>
                                        <option value="">----</option>
                                        {
                                            brands.map((item, index) => {
                                                return <option key={"brand" + index} value={item.nameBrand}>{item.nameBrand}</option>
                                            })
                                        }
                                    </select>
                                    <span className='error-message'>{errorNameBrand}</span>
                                </div>
                                <div className='group-admin-input'>
                                    <label>Nhập mô tả sản phẩm</label>
                                    <textarea name="description" id="text-product-description" cols="30" rows="8" onFocus={() => setErrorDescription("")} onChange={formik.handleChange} value={formik.values.description}></textarea>
                                    <span className='error-message'>{errorDescription}</span>
                                </div>
                                {
                                    !row ? <div className='group-admin-input'>
                                        <label>Hình ảnh sản phẩm</label>
                                        <input type="file" accept="image/jpeg" className='upload-file' placeholder='hình ảnh' onChange={onFileChange} />
                                        <span className='error-message'></span>
                                    </div>
                                        : <></>
                                }
                                <div className='group-btn-confirm'>
                                    <button className='btn-xacnhan' type='submit'>Lưu</button>
                                    <button className='btn-thoat' onClick={handleClose}>Thoát</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default SaveProduct