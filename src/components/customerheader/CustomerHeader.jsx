import React, { useContext, useState } from 'react'
import './customerheader.css'
import Logo from "../../imgs/logobackup.jpg"
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { UilShoppingCartAlt, UilBell, UilUserCircle} from '@iconscout/react-unicons'
import LoginModal from '../login/LoginModal';
import { Context } from '../../Context/Context';
import LoginSuccess from '../loginsuccess/LoginSuccess';
import { useRef } from 'react';

const CustomerHeader = () => {
  const [selectedLink, setSelectedLink] = useState(0);
  const context = useContext(Context);
  const ref = useRef();
  return (
    <div className='headerCustomer'>
        <div className="heardercontainer">
            <div className="left-content">
                <div className="logo-header">
                    <img src={Logo} alt="" />
                </div>
                <nav className='topnav'>
                    <ul>
                        <li className= {selectedLink === 1 ? "navLink activeLink": "navlink"} onClick={()=>setSelectedLink(1)}><Link to='/'>Khuyến mãi</Link></li>
                         <li className= {selectedLink === 2 ? "navLink activeLink": "navlink"} onClick={()=>setSelectedLink(2)}><Link to= '/'>Cửa hàng</Link></li>
                    </ul>  
                </nav>
                <div className="findCustomerProduct">
                    <input type="text" placeholder='Nhập tên sản phẩm' ref={ref} onChange={() => context.setContentCustomerFind(ref.current.value)} className='inputCustomer'/>
                    <SearchIcon className = "iconCustomer"/>
                </div>
            </div>
            
            <div className="right-content">
                {context.isLogin ? <LoginSuccess/> : <LoginModal/>}
                {context.isLogin ? linkToCartLogin(context.cartItem): linkToCart(context.cartItem, context.setOpen)}
                <div className='itemCustomer'>
                    <UilBell className = "iconRight-content"/>
                    <span>0</span>    
                </div>
            </div>
        </div>
    </div>
  )
}

export default CustomerHeader

function linkToCartLogin (cartItem) {
    return(
        <div className='itemCustomer'>
                
            <Link to= '/cart'>
            <UilShoppingCartAlt className = "iconRight-content"/>
            <span>{cartItem.length === 0 ? '': cartItem.length}</span>  
            </Link>
        </div>
    )
}

function linkToCart (cartItem, setOpen) {
    return(
        <div className='itemCustomer' onClick={() => setOpen(true)}>
            <UilShoppingCartAlt className = "iconRight-content"/>
            <span>{cartItem.length === 0 ? '': cartItem.length}</span>  
        </div>
    )
}