import React, { useState } from 'react'
import './stype.css'
import ShopCard from './ShopCard'

const Shop = () => {
    const [wacthAll, setWacthAll] = useState(false);
    
  return (
    <>
        <section id='shopBackground'>
            <div className="containerShop">
                <div className="headingShop">
                    <div className="leftShop">
                        <h2>Danh sách sản phẩm</h2>
                    </div>
                    <div className='rightShop'>
                        <span onClick={() => setWacthAll(!wacthAll)}>Xem tất cả</span>
                    </div>
                </div>
                
                <div className='product-content'>
                    <ShopCard wacthAll = {wacthAll}/>
                </div>
            </div>
        </section>
    </>
  )
}

export default Shop