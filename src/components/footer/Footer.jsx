import React from 'react'
import Logo from "../../imgs/logobackup.jpg"
import Facebook from "../../imgs/facebook.png"
import Instaram from "../../imgs/instaram.jpg"
import Zalo from "../../imgs/zalo.png"
import './style.css'

const Footer = () => {
  return (
    <footer id='pageFooter'>
        <div className="containerFooter">
            <div className="introduce">
                <img src={Logo} alt="" />
                <p>Địa chỉ: 97 Man Thiện - Hiệp Phú - Quận 9 - Thành phố Thủ Đức - Thành phố Hồ Chí Minh</p>
                <p>Websit chuyên cung cấp nước hoa giá rẻ chính hàng</p>
            </div>
            <div className="introduce">
                <h3>Thông tin</h3>
                <span>Tin tức</span>
                <span>Khuyến mãi</span>
                <span>Chính sách bảo mật</span>
                <span>Tuyển dụng</span>
            </div>
            <div className="introduce">
                <h3>Hỗ trợ</h3>
                <span>Điều khoản sử dụng</span>
                <span>Chính sách giao hàng</span>
                <span>Chăm sóc khách hàng</span>
            </div>
            <div className="introduce">
                <h3>Theo dõi</h3>
                <div>
                    <img src={Facebook} alt="" />
                    <span>Facebook</span>
                </div>
                <div>
                    <img src={Instaram} alt="" />
                    <span>Instarma</span>
                </div>
                <div>
                    <img src={Zalo} alt="" />
                    <span>Zalo</span>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer