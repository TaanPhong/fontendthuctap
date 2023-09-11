import React from 'react'
import Chart from'react-apexcharts'
import {motion} from 'framer-motion'
import "./style.css"
const RevenueChart = ({ param, setExpanded, expanded }) => {
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
                type: "date",
                categories: param.map(item => item.date),
                title: {
                    text: 'Ngày',
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
                  text: 'Tổng doanh thu',
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
            name: "Doanh thu",
            data: param.map(item => item.sumRevenue),
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
            <div className="chartContainer">
                <Chart series={series} type='area' options={data.options} />
            </div>
            <label>Thống kê theo doanh thu theo ngày</label>
            <div className='detail-statistical' onClick={() => setExpanded(!expanded)}>
                <span>Xem chi tiết</span>
            </div>
        </motion.div>
       
    )
}

export default RevenueChart