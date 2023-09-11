import React from 'react'
import { UilBoltAlt } from '@iconscout/react-unicons'
import FlashCard from './FlashCard'
import './flashsale.css'

const Flashsale = () => {
  return (
    <>
        <section id='flashSaleBackground'>
            <div className="containerFlashSale">
                <div className="headingFlash">
                    <UilBoltAlt className = 'flashSaleIcon'/>
                    <h2>Sản phẩm khuyến mãi</h2>
                </div>
                <FlashCard/>
            </div>
        </section>
    </>
  )
}

export default Flashsale