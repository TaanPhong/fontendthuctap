import React from 'react'
import './TopBar.css'
import Logo from '../../imgs/logobackup.jpg'
import img2 from '../../imgs/img2.png'
import { UilSetting, UilUserCircle  } from '@iconscout/react-unicons'
const TopBar = () => {
  return (
    <div className='topbar'>
        <div className="topbarwrapper">
            <div className="topleft">
                <div className="logo">
                <img src={Logo} alt="Logo"/>
                    <span>
                        Tiệm <span>tỏa</span> hương
                    </span>
                </div>
            </div>
            <div className="right">
                <div className="topbarIconContainer">
                    <UilSetting/>
                </div>
                <img src={img2} alt="" className='topAvatar'/> 
               
            </div>
        </div>

    </div>
  )
}

export default TopBar