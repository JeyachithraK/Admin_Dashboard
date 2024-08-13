import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { FaTimes } from 'react-icons/fa';
import Chart from 'react-apexcharts';
import { motion } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import './PieChartModal.css';

const PieChartModal = ({ show, onClose, chartData }) => {
  if (!show) {
    return null;
  }

  const options = {
    labels: chartData.labels,
    colors: chartData.colors,
    chart: {
      type: 'pie',
      toolbar: {
        show: true,
      },
    },
    legend: {
      position: 'bottom',
      color : "white",
    },
    // If you want to use the `responsive` option, it should look something like this:
    responsive: [
      {
        breakpoint: 1000, // Example breakpoint
        options: {
          chart: {
            width: '100%', // Width for this breakpoint
          },
          legend: {
            position: 'bottom', // Legend position for this breakpoint
          },
        },
      },
    ],
  };
  

  const series = chartData.series;

  return (
    // <div className="modal-overlay">
    //   <div className="modal-content">
    //     <FaTimes onClick={onClose} className="chart-control-icon close-icon" />
    //     <h3>Order Status Distribution</h3>
    //     <div className="pie-chart-container" >
    //       <ReactApexChart options={options} series={series} type="pie" width={600} />
    //     </div>
    //   </div>
    // </div>
    <div className="modal-overlay">
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <UilTimes className="close-icon" onClick={onClose} />
        <h3>Order Status Distribution</h3>
        <div className="pie-chart-container">
          <Chart options={options} series={series} type="pie" width={600} />
        </div>
      </motion.div>
    </div>
  );
};

export default PieChartModal;
