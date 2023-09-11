import React, { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../../Context/Context'
import "./style.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Img from '../Img/Img'

const PayMethod = () => {
    const context = useContext(Context)
    const [priceDelivery, setPriceDelivery] = useState(18000);
    const navigation = useNavigate();
    const handleRadioChange = (event) => {
        setPriceDelivery(event.target.value);
    };

    const numberPhonerf = useRef()
    const locationrf = useRef()
    useEffect(() => {
        if (context.isLogin) {
            numberPhonerf.current.value = context.isLogin.customerDTO.numberPhone;
            locationrf.current.value = context.isLogin.customerDTO.location;
        }
        else
        {
            context.setOpen(true);
            navigation("/")
        }

    }, [])

    function handleClick() {
        const order = {
            customerId: context.isLogin.customerDTO.id,
            totalMoney: tinhTongTien(context.cartItem),
            location: locationrf.current.value,
            numberPhone: numberPhonerf.current.value,
            theOrderDetailDTOs: context.cartItem.map((item) => {
                return {
                    productId: item.id,
                    numberOf: item.sl,
                    price: item.precentPromotion ? (item.price * item.precentPromotion / 100) : item.price,
                }
            })
        }
        axios.post("http://localhost:8081/user/complete/order", order)
            .then((res) => {
                context.setCartItem([])
                navigation("/user/success");
            })
            .catch((error) => console.log(error))

    }
    function displayIsLogin() {
        return (
            <div className="mainPayMethod">
                <div className="leftPay">
                    <div className='methodPay'>
                        <h4>Thông tin khách hàng</h4>
                        <div className="group-inputPay">
                            <label>Số điện thoại</label>
                            <input type="text" placeholder='Số điện thoại' ref={numberPhonerf} />
                            <span className='error-message'></span>
                        </div>
                        <div className="group-inputPay">
                            <label>Địa chỉ</label>
                            <input type="text" placeholder='Địa chỉ' ref={locationrf} />
                            <span className='error-message'></span>
                        </div>
                    </div>
                    <div className='methodPay'>
                        <h4>Phương thức vận chuyển</h4>
                        <div className='group-inputPayRadio'>
                            <input type="radio" name='methodDelivery' value={18000} checked={priceDelivery == 18000} onChange={handleRadioChange} className='inputPayRadio' />
                            <div className='contextDelivery'>
                                <h4>Giao nhanh</h4>
                                <p>Giao hàng nhanh. Hàng sẽ được nhận trong khoảng từ 5-7 ngày. Giao hàng toàn quốc.</p>
                            </div>
                            <span>18.000vnđ</span>
                        </div>
                        <div className='group-inputPayRadio'>
                            <input type="radio" name='methodDelivery' value={50000} checked={priceDelivery == 50000} onChange={handleRadioChange} className='inputPayRadio' />
                            <div className='contextDelivery'>
                                <h4>Hỏa tốc</h4>
                                <p>Giao hàng hỏa tốc. Nhận hàng trong vòng 2-3 ngày. Giao hàng toàn quốc.</p>

                            </div>
                            <span>50.000vnđ</span>
                        </div>
                    </div>
                    <div className='methodPay'>
                        <h4>Phương thức thanh toán</h4>
                        <div className='group-inputPayRadio'>
                            <input type="radio" className='inputPayRadio' checked="checked" name='methodPay' />
                            <div>
                                <div className="imgBank">
                                    <img src="https://cdn.divineshop.vn/static/b77a2122717d76696bd2b87d7125fd47.svg" alt="" />
                                    <img src="https://cdn.divineshop.vn/static/72a3a36fc7c66085b3f442940ba45fde.svg" alt="" />
                                    <img src="https://cdn.divineshop.vn/static/464c7c79044dea88e86adf0e1b9c064c.svg" alt="" />
                                    <img src="https://cdn.divineshop.vn/static/ddb866eb1214c914ea62417879046b99.svg" alt="" />
                                </div>
                                <p>Thanh toán qua ngân hàng, ví đện tử, visa. Ưu đãi 100% phí vận chuyển cho lần đầu thanh toán</p>
                            </div>
                        </div>
                        <div className='group-inputPayRadio'>
                            <input type="radio" className='inputPayRadio' name='methodPay' />
                            <div>
                                <h4>Thanh toán khi nhận hàng</h4>
                                <p>Thanh toán khi nhận hàng. Ưu dã về phí vận chuyển (nếu có) áp dụng với cả phí thu hộ.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightPay">
                    <h4>Đơn hàng</h4>
                    <hr />
                    {danhSachDonHang(context.cartItem)}
                    <hr />
                    <div className="completeOrder">
                        <div className="completeOrderDetail">
                            <span>Tạm tính</span>
                            <span>{tinhTongTien(context.cartItem)}</span>
                        </div>
                        <div className="completeOrderDetail">
                            <span>Phí vận chuyển</span>
                            <span>{priceDelivery}</span>
                        </div>
                        <div className="completeOrderDetail">
                            <span>Tổng tiền</span>
                            <span>{Number(tinhTongTien(context.cartItem)) + Number(priceDelivery)}</span>
                        </div>
                        <button className='btn-completeOrder' onClick={handleClick}>Đặt hàng</button>
                    </div>
                </div>
            </div>
        )
    }
    function displayNotLogin() {
        return (<></>)
    }
    return context.isLogin ? displayIsLogin() : displayNotLogin();
}

export default PayMethod

function danhSachDonHang(cartItem) {
    return (
        <div className='danhSachDonHang'>
            {cartItem.map((item) => {
                return (
                    <div className='itemPay'>
                        <Img id={item.pictureProducts[0]}/>
                        <span>{item.nameProduct}</span>
                        <span>{item.sl}</span>
                        {item.precentPromotion ?
                            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: 500,
                                    textDecoration: "line-through",
                                    color: "#e94560",
                                }}>{item.price}</span>
                                <span>{item.price * item.precentPromotion / 100}</span>
                            </div>
                            : <>
                                <span>{item.price}</span>
                            </>
                        }
                    </div>
                )
            })
            }
        </div>
    )
}

function tinhTongTien(cartItem) {
    return cartItem.reduce((toal, item) => {
        if (item.precentPromotion > 0)
            return (item.precentPromotion * item.price * item.sl / 100 + toal);
        else
            return (item.price * item.sl + toal);
    }, 0)
}