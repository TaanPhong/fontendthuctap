import React from 'react'
import './customermain.css'
import Toppicpage from './Toppicpage'
import Flashsale from '../flashsale/Flashsale'
import Shop from '../shopbackground/Shop'
import FooterTop from '../footertop/FooterTop'
import Footer from "../footer/Footer"
import { useEffect, useState } from 'react';
import axios from 'axios';
import TopSaler from '../topsaler/TopSaler'

const Customermain = () => {
  return (
    <>
      <Toppicpage/>
      <Flashsale/>
      <TopSaler/>
      <Shop/>
    </>
  )
}

export default Customermain