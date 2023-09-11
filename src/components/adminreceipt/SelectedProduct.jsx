import React from 'react'
import { useContext } from 'react'
import { Context } from '../../Context/Context'
import { useState } from 'react'
import { useEffect } from 'react'
import Paginate from '../Paginate/Paginate'
import Img from '../Img/Img'

const SelectedProduct = ({ setProductDetails, productDetails, setSelected, contentFind }) => {
    const context = useContext(Context)
    const [productItems, setProductItems] = useState([])
    // Thay đổi trang

    const handleOnClick = (setProductDetails, productDetails, product) => {
        const productExit = productDetails.find(item => item.id === product.id);
        if (!productExit)
        {
            setProductDetails([...productDetails, { ...product }])
            setSelected(false)
        }
    }

    useEffect(() => {
        setProductItems(context.products.filter((item) => item.nameProduct.toLowerCase().indexOf(contentFind.toLowerCase()) !== -1))
    }, [contentFind])
    // Thay đổi trang
    const [currentPageData, setCurrentPageData] = useState(1);
    const [postsPage, setPostsPage] = useState(10);
    const lastPostsIndex = currentPageData * postsPage;
    const firstPostIndex = lastPostsIndex - postsPage;
    const currentPosts = productItems.slice(firstPostIndex, lastPostsIndex);

    return (
        <div className='product-selected-receipt'>
            <div className='icon-product-select'></div>
            <div className='products-receipt'>
                {
                    currentPosts.map((item) => {
                        return (
                            <div className='item-product-selected' onClick={() => handleOnClick(setProductDetails, productDetails, item)}>
                                <Img id = {item.pictureProducts[0]}/>
                                <span>{item.nameProduct}</span>
                            </div>
                        )
                    })
                }
                <Paginate totalPosts={productItems.length} postsPerPage={postsPage} setCurrentPageData={setCurrentPageData} currentPageData={currentPageData} />
            </div>
        </div>
    )
}

export default SelectedProduct