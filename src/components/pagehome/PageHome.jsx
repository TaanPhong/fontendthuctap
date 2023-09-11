import React, { useRef } from 'react'
import './pagehome.css'
import CustomerHeader from '../customerheader/CustomerHeader'
import Customermain from '../customermain/CustomerMain'
import { Outlet } from 'react-router-dom'
import FooterTop from '../footertop/FooterTop'
import Footer from '../footer/Footer'

const PageHome = () => {
  return (
    <div className="AppCustomer">
        <CustomerHeader/>
        <div className="customerMainWrapper">
          <div className="wrapperContainer">
            <Outlet/>
            <FooterTop/>
          </div>
          <Footer/>
        </div> 
        
    </div>
  )
}

export default PageHome