import React, { useContext, useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Context } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Img from '../Img/Img';

const Toppicpage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>
    },
  };
  const [products, setProducts] = useState([]);
  const context = useContext(Context);
  const navigate = useNavigate();
  /// Call api
  useEffect(callAPI, [])
  function callAPI() {
    axios.get("http://localhost:8081/product/promotions")
      .then(res => {
        setProducts(res.data);
      })
      .catch(error => console.log(error));
  }
  const handleClick = (id) =>{
    const productItem = context.products.find(item => item.id === id);
    if(productItem){
      context.setProductItemSelected(productItem);
      navigate("/product/detail");
    }
  }
  return (
    <>
      <Slider {...settings}>
        {products.map((value, index) => {
          return (
            <>
              <div className='boxTopSlider' key={index}>
                <div className='leftSlider'>
                  <h1>{value.promotion}% off</h1>
                  <p>{value.des}</p>
                  <button className='btn-primary' onClick={() => {handleClick(value.id)}}>Xem chi tiết</button>
                </div>
                <div className='rightSlider'>
                  <Img id={value.idPicture}/>
                </div>
              </div>
            </>
          )
        })}
      </Slider>
    </>
  )
}

export default Toppicpage