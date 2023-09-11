import React from 'react'
import { UilShoppingCart } from '@iconscout/react-unicons'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { UilAngleRightB, UilAngleLeftB } from '@iconscout/react-unicons'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react'
import { Context } from '../../Context/Context'
import { useNavigate } from 'react-router-dom'
import Img from '../Img/Img'

const NextArrow = (props) => {
    const { onClick } = props
    return (
        <div className="control-btn" onClick={onClick}>
            <button className='next-btn'>
                <UilAngleLeftB />
            </button>
        </div>
    )
}

const PrevArrow = (props) => {
    const { onClick } = props
    return (
        <div className="control-btn" onClick={onClick}>
            <button className='prev-btn'>
                <UilAngleRightB />
            </button>
        </div>
    )
}

const FlashCard = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };
    const [products, setProducts] = useState([]);
    const context = useContext(Context);
    const navigate = useNavigate();
    /// Call api
    useEffect(callAPI, [])
    function callAPI() {
        axios.get("http://localhost:8081/productpromtion")
            .then(res => {
                setProducts(res.data);
            })
            .catch(error => console.log(error));
    }
    //const handleClickImg = 
    return (
        <>
            <Slider {...settings}>
                {
                    products.map((productItem, index) => {
                        return (
                            <div className="boxProductCard">
                                <div className="product" >
                                    <div className="imgProduct">
                                        <span className='discount'>{productItem.precentPromotion} % Off</span>
                                        <Img id={productItem.pictureProducts[0]} handleOnClick={() => {
                                            context.setProductItemSelected(productItem);
                                            navigate("/product/detail");
                                        }} />
                                    </div>
                                    <div className="detailProduct">
                                        <h3>{productItem.nameProduct}</h3>
                                        <div className="priceProduct">
                                            <h4 style={{ textDecoration: "line-through", color: "#ad9191", fontWeight: 500 }}>{productItem.price.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}</h4>

                                        </div>
                                        <div className='priceProduct'>
                                            <h4>{(productItem.price * productItem.precentPromotion / 100).toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}</h4>
                                        </div>
                                        <div className='priceProduct'>
                                            <h4>Còn lại {productItem.numberOf} sản phẩm</h4>
                                        </div>
                                        <button className='secondary-btn' onClick={() => {
                                            if (context.isLogin) {
                                                context.addToCart(productItem)
                                            }
                                            else
                                                context.setOpen(true);
                                        }}>
                                            <UilShoppingCart />
                                            <span>Thêm vào giỏ hàng</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    )
                }

            </Slider>
        </>
    )
}

export default FlashCard