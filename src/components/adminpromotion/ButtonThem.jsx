import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UilPlusCircle, UilEdit, UilTimes, UilSearch } from '@iconscout/react-unicons'
const ButtonThem = () => {
    const navigation = useNavigate()
    return (
        <div className="rightTopPicNotDate" onClick={() => {
            navigation("/admin/nhapkhuyenmai")
        }}>
            <UilPlusCircle className='add' />
            <span>Thêm</span>
        </div>
    )
}

export default ButtonThem