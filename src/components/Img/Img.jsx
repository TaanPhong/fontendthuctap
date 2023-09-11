import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const Img = ({id, handleOnClick, className}) => {
    const [img, setImg] = useState("");
    useEffect(()=>{
        axios.get("http://localhost:8081/product/imgs", {params:{"id": id,}, responseType: 'blob'})
        .then(res => setImg(URL.createObjectURL(res.data)))
        .catch(err =>  alert("Xảy ra lỗi"))
    }, [id])
  return (
    <img src={img} alt="" onClick={handleOnClick} className={className}/>
  )
}

export default Img