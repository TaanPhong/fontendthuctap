import React from 'react'
import { UilBoltAlt } from '@iconscout/react-unicons'
import "./style.css"
import TopSaleCard from './TopSaleCard'

const TopSaler = () => {
    return (
        <>
            <section id='flashSaleBackground'>
                <div className="containerFlashSale">
                    <div className="headingFlash">
                        <UilBoltAlt className='flashSaleIcon' />
                        <h2>Sản phẩm bán chạy nhất</h2>
                    </div>
                   <TopSaleCard/>
                </div>
            </section>
        </>
    )
}

export default TopSaler