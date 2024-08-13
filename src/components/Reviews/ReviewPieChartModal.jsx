import React from 'react';
import Chart from 'react-apexcharts';
import { motion } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import './ReviewPieChartModal.css';

const ReviewPieChartModal = ({ show, onClose, chartData }) => {
  if (!show) {
    return null;
  }
  const chartOptions={
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
    <div className="modal-overlay">
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <UilTimes className="close-icon" onClick={onClose} />
        <h3>Review Ratings Distribution</h3>
        <div className="pie-chart-container">
          <Chart options={chartOptions} series={chartData.series} type="pie" width={600} />
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewPieChartModal;
