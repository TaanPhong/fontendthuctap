import React from 'react'
import TopPicAdminCustomer from './TopPicAdminCustomer'
import MainAdminCustomer from './MainAdminCustomer'
import "../adminorder/style.css"
import { useState } from 'react'
const AdminCustomer = () => {
    const [content, setContent] = useState("");
    return (
        <div className='MainDash'>
            <h1>Khách hàng</h1>
            <TopPicAdminCustomer setContext={setContent}/>
            <MainAdminCustomer content={content}/>
        </div>
    )
}

export default AdminCustomer