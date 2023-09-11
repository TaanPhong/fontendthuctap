import React from 'react'
import './style.css'
import TopBar from "../TopBar/TopBar"
import Sidebar from "../Sidebar/Sidebar"
import MainDash from "../MainDash/MainDash"
import { Outlet } from 'react-router-dom'

const PageAdmin = () => {
    return (
        <div className="AppAdmin">
            <div className='AppWrapper'>
                <TopBar/>
                <div className='AppGlass'>
                    <Sidebar />
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default PageAdmin