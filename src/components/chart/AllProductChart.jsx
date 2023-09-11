import React from 'react'
import Chart from'react-apexcharts'
import {motion} from 'framer-motion'
import "./style.css"

const AllProductChart = ({ param, setExpanded, expanded }) => {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      xaxis: {
        type: "String",
        categories: param.map(item => item.nameProduct),
        title: {
          text: 'Tên sản phẩm',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#263238' // Màu sắc của tiêu đề trục Y
          }
        }
      },
      yaxis: {
        title: {
          text: 'Số lượng tồn kho',
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#263238' // Màu sắc của tiêu đề trục Y
          }
        }
      },
    }
  };
  const series = [
    {
      name: "Sản phẩm",
      data: param.map(item => item.inventoryNumber),
    }
  ]
  return (
    <motion.div className="ExpandedCard">
      <div style={
        {
          alignSelf: 'flex-end', cursor: 'pointer', color: 'white'
        }
      }  >
      </div>
      <div className="chartContainer" style={{height: "auto"}}>
        <Chart series={series} type='area' options={data.options} />
      </div>
      <label style={{marginTop: "30px"}}>Thống kê theo sản phẩm tồn kho</label>
      <div className='detail-statistical' onClick={() => setExpanded(!expanded)}>
        <span>Xem chi tiết</span>
      </div>
    </motion.div>
  )
}

export default AllProductChart