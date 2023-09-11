import React, { useContext, useEffect, useRef, useState } from 'react'
import "./style.css"
import { Context } from '../../Context/Context'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Paginate from '../Paginate/Paginate';
import { useNavigate } from 'react-router-dom';
import Img from '../Img/Img';

const DetailProduct = () => {
    const context = useContext(Context);
    const navigate = useNavigate();
    const [url, setUrl] = useState(context.productItemSelect ? context.productItemSelect.pictureProducts[0]: 0);
    const contentCommentrf = useRef();
    const [comments, setComment] = useState(context.productItemSelect? context.productItemSelect.commentDTOs: [])
    const handleClickComment = () => {
        if (context.isLogin) {
            const data = {
                "content": contentCommentrf.current.value,
                "customerId": context.isLogin.customerDTO.id,
                "productId": context.productItemSelect.id,
            }
            axios.post("http://localhost:8081/user/commnet", data)
                .then((res) => {
                    setComment([...comments, res.data])
                    contentCommentrf.current.value = ""
                })
                .catch(() => console.log("Lỗi"))
        }
        else {
            context.setOpen(true);
        }

    }
    useEffect(()=>{
        if(!context.productItemSelect){
            navigate("/")
        }
    }, [])
    // Thay đổi trang
    const [currentPageData, setCurrentPageData] = useState(1);
    const [postsPage, setPostsPage] = useState(8);
    const lastPostsIndex = currentPageData * postsPage;
    const firstPostInex = lastPostsIndex - postsPage;
    const currentPosts = comments.slice(firstPostInex, lastPostsIndex);
    function displayIsLogin() {
        return (
            <div className="containerCart">
                <div className="wrapperDetailProduct">
                    <div className="leftProductDetail">
                        <h4 style={{ marginBottom: "32px" }}>{context.productItemSelect.nameProduct}</h4>
                        <div className="imgs-product">
                            <Img id={url} className={"imgBackground"}/>
                            <div className='layout-imgSmall'>
                                {
                                    context.productItemSelect.pictureProducts.map((item, index) => {
                                        return (
                                            <div key={index} onClick={() => setUrl(item)} className="img-small">
                                                <Img id={item}/>
                                            </div>
                                        )
                                    })

                                }
                            </div>
                        </div>
                        <div className="description-product">
                            <h4>Mô tả sản phẩm</h4>
                            <p>{context.productItemSelect.description}</p>
                        </div>
                        <div className='comment-container'>
                            <h4>Bình luận</h4>
                            <textarea name="commnet" id="content-comment" cols="30" rows="7" ref={contentCommentrf} placeholder='Viết bình luận của bạn về sản phẩm'></textarea>

                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <button className='btn-buyNow' onClick={handleClickComment}>Bình luận</button>
                            </div>
                            <div>
                                <h4 style={{ margin: "20px 0" }}>Tất cả bình luận</h4>
                                {comments.length
                                    ?
                                    <>
                                        {
                                            currentPosts.map((item) => {
                                                return (
                                                    <div key={item.id} className='context-comment'>
                                                        <h5>{item.userName}</h5>
                                                        <span>{item.dateComment}</span>
                                                        <span className='item-comment'>{item.content}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                        <Paginate totalPosts={comments.length} postsPerPage={postsPage} setCurrentPageData={setCurrentPageData} currentPageData={currentPageData} />
                                    </>
                                    : <><p>Chưa có bình luận nào về sản phẩm này.</p></>}
                            </div>
                        </div>
                    </div>
                    <div className="rightProductDetail">
                        <div className="contentDetailProduct">
                            <h4>Thông tin sản phẩm</h4>
                            <div className="content-row">
                                <span>Tên sản phẩm:</span>
                                <span>{context.productItemSelect.nameProduct}</span>
                            </div>
                            <div className="content-row">
                                <span>Nhãn hiệu:</span>
                                <span>{context.productItemSelect.nameBrand}</span>
                            </div>
                            <div className="content-row">
                                <span>Loại sản phẩm:</span>
                                <span>{context.productItemSelect.nameType}</span>
                            </div>
                            <div className="content-row">
                                <span>Giá sản phẩm:</span>
                                <span>{context.productItemSelect.price}</span>
                            </div>
                            <div className="content-row">
                                <span>Khuyến mãi:</span>
                                <span>{context.productItemSelect.precentPromotion}%</span>
                            </div>
                            <div className="content-row">
                                <span>Tình trạng:</span>
                                <span>{context.productItemSelect.numberOf ? "Còn hàng" : "hết hàng"}</span>
                            </div>
                            <button className='btn-buyNow' onClick={() => {
                                if (context.isLogin)
                                    context.addToCart(context.productItemSelect)
                                else
                                    context.setOpen(true)
                            }}>Mua ngay</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    function displayNotLogin(){
        return (<></>)
    }
    return context.productItemSelect ? displayIsLogin() : displayNotLogin();
}

export default DetailProduct