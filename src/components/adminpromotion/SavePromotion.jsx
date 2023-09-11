import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SelectedProduct from '../adminreceipt/SelectedProduct'
import { useRef } from 'react';
import { UilPlusCircle, UilEdit, UilTimes, UilSearch } from '@iconscout/react-unicons'
import { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '../../Context/Context';
import Paginate from '../Paginate/Paginate';
import { useFormik } from 'formik';
import axios from 'axios';
const SavePromotion = ({ setRows, rows }) => {
    const navigation = useNavigate();
    const [productDetails, setProductDetails] = useState([]);
    const [selected, setSelected] = useState(false);
    const [contentFind, setContentFind] = useState("");
    const [objectPromotion, setObjectPromotion] = useState(1);
    const [errDescription, setErrDescription] = useState("");
    const [errDateStart, setErrDateStart] = useState("");
    const [errDateEnd, setErrDateEnd] = useState("")
    const [errPresent, setErrPresent] = useState("");
    const context = useContext(Context)
    const formik = useFormik({
        initialValues: {
            description: "",
            staffId: context.isLogin.staffDTO.id,
            dateStart: "",
            dateEnd: "",
            present: 0,
            arrObj: {},
            id: null
        },
        onSubmit: value => {
            let submit = true;
            if (!value.description) {
                setErrDescription("Vui lòng nhâp lý do")
                submit = false
            }
            if (objectPromotion === 1) {
                if (!value.present) {
                    setErrPresent("Vui lòng nhập phầm trăm khuyến mãi")
                    submit = false;
                }
                else if (Number.parseInt(value.present) < 1 || Number.parseInt(value.present) > 100) {
                    setErrPresent("Vui lòng nhập phầm trăm khuyến mãi lớn hơn 0 và nhỏ hơn 100")
                    submit = false;
                }
                if (!value.dateStart) {
                    setErrDateStart("Vui lòng nhập ngày bắt đầu")
                    submit = false;
                }
                if (!value.dateEnd) {
                    setErrDateEnd("Vui lòng nhập ngày kết thúc")
                    submit = false;
                }
                if (value.dateEnd && value.dateStart) {
                    const dateS = new Date(value.dateStart)
                    const dateE = new Date(value.dateEnd)
                    if (dateE <= dateS) {
                        setErrDateEnd("Vui lòng nhập ngày kết thúc lớn hơn ngày bắt đầu");
                        submit = false;
                    }
                    let consider
                    for (let index = 0; index < context.promotions.length; index++) {
                        const element = context.promotions[index];
                        consider = element.promotionDetailDTOs.find((item) => {
                            const dateEndConsider = new Date(item.dateEnd);
                            const dateStartConsider = new Date(item.dateStart);
                            return (dateStartConsider <= dateS && dateS <= dateEndConsider)
                                || (dateStartConsider <= dateE && dateE <= dateEndConsider)
                                || (dateS <= dateEndConsider && dateEndConsider <= dateE);
                        })
                        //console.log("consider", consider);
                        if (consider) {
                            submit = false;
                            alert("Không thể tạo chương trình khuyến mãi vì sản phẩm " + consider.nameProduct + " đang được khuyến mãi tới ngày " + consider.dateEnd)
                            break;
                        }
                    }

                }

            }
            if (objectPromotion === 3) {
                console.log("Vao", value.arrObj);
                if (Object.entries(value.arrObj).length === 0) {
                    submit = false;
                    alert("Vui lòng nhập đủ thông tin!")
                }
                else {
                    for (const key in value.arrObj) {
                        const val = value.arrObj[key];
                        if (!val.dateStart || !val.dateEnd || !val.present) {
                            submit = false;
                            alert("Vui lòng nhập đủ thông tin!")
                            break;
                        }
                    }
                }

            }
            if (submit) {
                if (objectPromotion === 3) {
                    let promotionDetailDTOs = [];
                    for (const key in value.arrObj) {
                        const val = value.arrObj[key];
                        const result = {
                            "productId": Number.parseInt(key),
                            "dateStart": val.dateStart,
                            "dateEnd": val.dateEnd,
                            "present": Number.parseInt(val.present),
                        }
                        promotionDetailDTOs.push(result)
                    }
                    const data = {
                        "description": value.description,
                        "staffId": value.staffId,
                        "promotionDetailDTOs": promotionDetailDTOs,
                    }
                    axios.post("http://localhost:8081/admin/promotion", data)
                        .then(res => {
                            context.setPromotions([...context.promotions, res.data])
                            alert("Thêm thành công!")
                            navigation("/admin/khuyenmai")
                        })
                        .catch(err => alert("Quá trình thêm xảy ra lỗi!"))
                }
                else if (objectPromotion === 1) {
                    const promotionDetailDTOs = productDetails.map((item) => {
                        return {
                            "productId": item.id,
                            "dateStart": value.dateStart,
                            "dateEnd": value.dateEnd,
                            "present": value.present,
                        }
                    })
                    const data = {
                        "description": value.description,
                        "staffId": value.staffId,
                        "promotionDetailDTOs": promotionDetailDTOs,
                    }
                    axios.post("http://localhost:8081/admin/promotion", data)
                        .then(res => {
                            context.setPromotions([...context.promotions, res.data])
                            alert("Thêm thành công!")
                            navigation("/admin/khuyenmai")
                        })
                        .catch(err => alert("Quá trình thêm xảy ra lỗi!"))
                }
            }

        }
    })
    const ref = useRef();
    const handleOnClickCancel = (setProductDetails, productDetails, product) => {
        setProductDetails(productDetails.filter((item) => item.id !== product.id))
    }
    const handleRadioChange = (event) => {
        setObjectPromotion(Number.parseInt(event.target.value));
    };
    useEffect(() => {
        if (objectPromotion === 1) {
            setProductDetails(context.products.map(
                (item) => {
                    return { ...item, err: "" }
                }
            ))
        }
        else if (objectPromotion === 3) {
            setProductDetails([])
        }
    }, [objectPromotion])
    // Thay đổi trang
    const [currentPageData, setCurrentPageData] = useState(1);
    const [postsPage, setPostsPage] = useState(5);
    const lastPostsIndex = currentPageData * postsPage;
    const firstPostIndex = lastPostsIndex - postsPage;
    const currentPosts = productDetails.slice(firstPostIndex, lastPostsIndex);
    return (
        <div className="MainDash">
            <h1>Nhập khuyến mãi</h1>
            <form className="container-input-promotion" onSubmit={formik.handleSubmit}>
                <div className='group-btn-confirm'>
                    <button className='btn-xacnhan' type='submit'>Lưu</button>
                    <button className='btn-thoat' type='button' onClick={() => navigation("/admin/khuyenmai")}>Thoát</button>
                </div>
                <div className="reason">
                    <h4>Lý do chương trình khuyến mãi</h4>
                    <textarea name="description" id="description-promotion" placeholder='Nhập lý do khuyến mãi' cols="30" rows="7" onChange={formik.handleChange} value={formik.values.description} onFocus={() => setErrDescription("")}></textarea>
                    <span className='error-message'>{errDescription}</span>
                </div>
                <div className="type-promotion">
                    <h4>Loại khuyến mãi</h4>
                    <div className="group-input-radio-promotion">
                        <input name='type-promotion' type="radio" checked="checked" />
                        <span>Theo phần trăm</span>
                    </div>
                    <div className="group-input-radio-promotion">
                        <input name='type-promotion' type="radio" />
                        <span>Theo số tiền</span>
                    </div>
                </div>
                <div className="ap-dung">
                    <h4>Áp dụng cho</h4>
                    <hr />
                    <div className="group-input-radio-promotion">
                        <input name='object-promotion' type="radio" value={1} checked={objectPromotion === 1} onChange={handleRadioChange} />
                        <span>Tất cả sản phẩm</span>
                    </div>
                    <div className="group-input-radio-promotion">
                        <input name='object-promotion' type="radio" value={2} checked={objectPromotion === 2} onChange={handleRadioChange} />
                        <span>Danh mục sản phẩm</span>
                    </div>
                    <div className="group-input-radio-promotion">
                        <input name='object-promotion' type="radio" value={3} checked={objectPromotion === 3} onChange={handleRadioChange} />
                        <span>Sản phẩm</span>
                    </div>
                    <div style={{ padding: "10px" }}>
                        {
                            objectPromotion === 1 ? <></>
                                :
                                <div className='find-product'>
                                    <UilSearch className="search" onClick={() => setSelected(false)} />
                                    <input type="text" name='nameProduct' ref={ref} onChange={() => setContentFind(ref.current.value)} placeholder='Tìm kiếm sản phẩm' onFocus={() => setSelected(true)} />
                                </div>
                        }
                        {
                            selected ? <SelectedProduct setProductDetails={setProductDetails} productDetails={productDetails} setSelected={setSelected} contentFind={contentFind} /> : <></>
                        }
                    </div>

                </div>
                <div className='input-promotion'>
                    <h4>Chi tiết chương trình khuyến mãi</h4>
                    {
                        objectPromotion !== 3 ?
                            <div className='input-all-promotion'>
                                <div className="group-present-all">
                                    <label>Giá trị khuyến mãi</label>
                                    <input type="number" className='input-all' name='present' onFocus={() => setErrPresent("")} onChange={formik.handleChange} value={formik.values.present} />
                                    <span className='error-message'>{errPresent}</span>
                                </div>
                                <hr />
                                <label>Thời gian</label>
                                <div className='time-all'>
                                    <div className="group-date-all">
                                        <label>Ngày bắt đầu</label>
                                        <input type="date" name='dateStart' className='date-all' onFocus={() => setErrDateStart("")} onChange={formik.handleChange} value={formik.values.dateStart} />
                                        <span className='error-message'>{errDateStart}</span>
                                    </div>
                                    <div className="group-date-all">
                                        <label>Ngày kết thúc</label>
                                        <input type="date" name='dateEnd' className='date-all' onFocus={() => setErrDateEnd("")} onChange={formik.handleChange} value={formik.values.dateEnd} />
                                        <span className='error-message'>{errDateEnd}</span>
                                    </div>
                                </div>
                                <p>*(Lưu ý giá trị khuyến mãi, ngày áp dụng, ngày kết thúc sẽ được áp dụng chung cho tất cả sản phẩm)</p>
                            </div>
                            :
                            <>
                                {
                                    currentPosts.map((productDetail, index) => {
                                        return (
                                            <div style={{ marginBottom: "1rem" }}>
                                                <div key={index} className='item-promotion'>
                                                    <span>{productDetail.nameProduct}</span>
                                                    <input type="date" className='input-date-promotion' {...formik.getFieldProps("arrObj[" + productDetail.id + "].dateStart")} />
                                                    <input type="date" className='input-date-promotion' {...formik.getFieldProps("arrObj[" + productDetail.id + "].dateEnd")} />
                                                    <input type="number" className='input-present-promotion' placeholder='Nhập phần trăm' min={1} {...formik.getFieldProps("arrObj[" + productDetail.id + "].present")} />
                                                    <UilTimes style={{ cursor: "pointer", marginLeft: "45px", marginTop: "5px" }}
                                                        onClick={() => { handleOnClickCancel(setProductDetails, productDetails, productDetail) }} />
                                                </div>
                                                {/* <span className='error-message'>{productDetail.err}</span> */}
                                            </div>
                                        )
                                    })
                                }
                                <Paginate totalPosts={productDetails.length} postsPerPage={postsPage} setCurrentPageData={setCurrentPageData} currentPageData={currentPageData} />
                            </>
                    }

                </div>
            </form>
        </div>
    )
}

export default SavePromotion