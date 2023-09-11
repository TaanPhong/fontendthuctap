import React, { useContext, useEffect } from 'react'
import "./style.css"
import { Link, useNavigate } from 'react-router-dom'
import { UilTimes, UilPlus, UilMinus } from '@iconscout/react-unicons'
import { Context } from '../../Context/Context'
import Img from '../Img/Img'

const CartDetail = () => {
  const context = useContext(Context)
  const navigate = useNavigate();
  useEffect(() => {
    if (!context.isLogin) {
      navigate("/")
      context.setOpen(true)
    }
  }, [])
  function displayIsLogin() {
    return (
      <div className="containerCart">
        {context.cartItem.length === 0 ? notProduct() : cartProduct(context.cartItem, context.addToCart, context.decrease, context.removeToCart, context.removeToCartAll)}
      </div>
    )
  } 

  function displayNotLogin() {
    return <></>
  }
    
  return context.isLogin ? displayIsLogin() : displayNotLogin();
}

function notProduct() {
  return (
    <div className='notProduct'>
      <img src="https://cdn.divineshop.vn/static/4e0db8ffb1e9cac7c7bc91d497753a2c.svg" alt="not product" />
      <p>Giỏ hàng chưa có sản phẩm nào</p>
      <Link to="/" className='bnt-backhome'>Quay lại trang chủ</Link>
    </div>
  )
}


function cartProduct(cartItem, addToCart, decrease, removeToCart, removeToCartAll) {
  return (
    <div className="mainCart">
      <div className="leftCart">
        {cartItem.map((item) => {
          return (
            <div className="itemcart">
              <div className="itemcartstyle">
                <Img id={item.pictureProducts[0]}/>
                <span>{item.nameProduct}</span>
              </div>
              <div className='itemcartonCLick'>
                {item.precentPromotion > 0
                  ?
                  <div className='discoutSpanCartDetail'>
                    <span style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      textDecoration: "line-through",
                      color: "#e94560",
                    }}>{item.price}</span>
                    <span>{item.price * item.precentPromotion / 100}</span>
                  </div>
                  :
                  <>
                    <span>{item.price}</span>
                  </>
                }
                <div className="numberofstyle">
                  <button onClick={() => decrease(item)}><UilMinus /></button>
                  <span>{item.sl}</span>
                  <button onClick={() => addToCart(item)}><UilPlus /></button>
                </div>
                <button className='btn-remove' onClick={() => removeToCart(item)}><UilTimes /></button>
              </div>
            </div>
          )
        })}
        <span style={
          {
            fontSize: '15px',
            cursor: 'pointer',
            fontWeight: 400,
            textDecoration: 'underline'
          }
        } onClick={() => removeToCartAll()}>Xóa giỏ hàng</span>
      </div>
      <div className="rightCart">
        <div className='rowCart'>
          <span>Tạm tính giỏ hàng</span>
          <span>{tinhTongTienKhongKhuyenMai(cartItem)}vnđ</span>
        </div>
        <div className='rowCart'>
          <span>Khuyến mãi</span>
          <span>{tinhTongKhuyenMai(cartItem)}vnđ</span>
        </div>
        <div className='rowCart'>
          <span>Thành tiền</span>
          <span>{tinhTongTien(cartItem)}vnđ</span>
        </div>
        <Link to="/user/pay">
          <button className='btn-muahang'>
            <span>Thanh toán</span>
            <span>{tinhTongTien(cartItem)}vnđ</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

function tinhTongTien(cartItem) {
  //const toal = 0
  return cartItem.reduce((toal, item) => {
    if (item.precentPromotion > 0)
      return (item.precentPromotion * item.price * item.sl / 100 + toal);
    else
      return (item.price * item.sl + toal);
  }, 0)
}

function tinhTongTienKhongKhuyenMai(cartItem) {
  return cartItem.reduce((toal, item) => (item.sl * item.price + toal), 0)
}

function tinhTongKhuyenMai(cartItem) {
  return cartItem.reduce((toal, item) => {
    if (item.precentPromotion > 0)
      return (item.precentPromotion * item.price * item.sl / 100 + toal);
    else
      return toal;
  }, 0)
}

export default CartDetail