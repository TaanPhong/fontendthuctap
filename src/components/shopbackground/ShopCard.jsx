import React from 'react'
import { UilAngleRightB, UilAngleLeftB, UilShoppingCart } from '@iconscout/react-unicons'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';
import Img from '../Img/Img';
const ShopCard = ({ wacthAll }) => {
    const context = useContext(Context);
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    /// Call api
    useEffect(callAPI, [context.contentCustomerFind])
    function callAPI() {
        axios.get("http://localhost:8081/product")
            .then(res => {
                //context.setProducts(res.data);
                setProducts(res.data.filter((item) => item.numberOf !== 0 && item.nameProduct.toLowerCase().indexOf(context.contentCustomerFind.toLowerCase()) !== -1))
            })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        axios.get("http://localhost:8081/product")
            .then(res => {
                context.setProducts(res.data);
                setProducts(res.data.filter((item) => item.numberOf !== 0))
            })
            .catch(error => console.log(error));
    }, [])
    const style = {
        marginBottom: "30px"
    }

    //const handleClick = 

    return (
        <>
            {
                products.map((productItem, index) => {
                    if (wacthAll) {
                        return (
                            <div className="boxProductCard">
                                <div className="product">
                                    <div className="imgProduct">
                                        <span className='discount'>{productItem.precentPromotion} % Off</span>
                                        <Img id={productItem.pictureProducts[0]} handleOnClick={() => {
                                            context.setProductItemSelected(productItem);
                                            navigate("/product/detail");
                                        }} />
                                    </div>
                                    <div className="detailProduct">
                                        <h3 style={!productItem.precentPromotion ? style : {}}>{productItem.nameProduct}</h3>
                                        {
                                            productItem.precentPromotion > 0 ?
                                                <>
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
                                                </> :
                                                <div className="priceProduct">
                                                    <h4>{productItem.price.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}</h4>
                                                </div>
                                        }
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
                    else {
                        if (index < 16) {
                            return (
                                <div className="boxProductCard">
                                    <div className="product">
                                        <div className="imgProduct">
                                            <span className='discount'>{productItem.precentPromotion} % Off</span>
                                            <Img id={productItem.pictureProducts[0]} handleOnClick={() => {
                                                context.setProductItemSelected(productItem);
                                                navigate("/product/detail");
                                            }} />
                                        </div>
                                        <div className="detailProduct">
                                            <h3 style={!productItem.precentPromotion ? style : {}}>{productItem.nameProduct}</h3>
                                            {
                                                productItem.precentPromotion > 0 ?
                                                    <>
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
                                                    </> :
                                                    <div className="priceProduct">
                                                        <h4>{productItem.price.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        })}</h4>
                                                    </div>
                                            }
                                            <div className='priceProduct'>
                                                <h4>Còn lại {productItem.numberOf} sản phẩm</h4>
                                            </div>
                                            <button className='secondary-btn' onClick={() => { context.addToCart(productItem) }}>
                                                <UilShoppingCart />
                                                <span>Thêm vào giỏ hàng</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                }
                )
            }
        </>
    )
}

export default ShopCard
