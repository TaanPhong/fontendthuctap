import React from 'react'
import { UilSearchAlt, UilPlusCircle } from '@iconscout/react-unicons'
import { useRef } from 'react'

const TopPicAdminProduct = ({model, title, setContent}) => {
  const ref = useRef();
  return (
    <div className='topPic'>
        <div className="leftTopPic">
            <div className="findBy">
                <input type="text" placeholder= {title} onChange={() => setContent(ref.current.value)} ref={ref}/>
                <UilSearchAlt className = "iconTopPic"/>
            </div>
        </div>
        {model}
        
    </div>
  )
}

export default TopPicAdminProduct