import React from 'react'
import "./style.css"
const Paginate = ({totalPosts, postsPerPage, currentPageData, setCurrentPageData}) => {
    let pages = [];
    for(var i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i)
    }
  return (
    <div className='paginate'>
        {
            pages.map((page, index) => {
                return (
                    <>
                        <button key={index} type='button' className={currentPageData === page ? 'btn-paginate active': "btn-paginate"} onClick={() => setCurrentPageData(page)}>{page}</button>
                    </>
                )
            })
        }
    </div>
  )
}

export default Paginate