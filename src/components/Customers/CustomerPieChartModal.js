import React, { useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { FaTimes, FaSearchPlus, FaSearchMinus, FaHome, FaDownload } from 'react-icons/fa';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import './CustomerPieChartModal.css';

// Register zoom plugin with Chart.js
Chart.register(zoomPlugin);

const CustomerPieChartModal = ({ show, onClose, chartData }) => {
  const chartRef = useRef(null);

  if (!show) {
    return null;
  }

  const handleZoomIn = () => {
    const chart = chartRef.current?.chartInstance;
    if (chart) {
      chart.zoom(1.1);
    }
  };

  const handleZoomOut = () => {
    const chart = chartRef.current?.chartInstance;
    if (chart) {
      chart.zoom(0.9);
    }
  };

  const handleResetZoom = () => {
    const chart = chartRef.current?.chartInstance;
    if (chart) {
      chart.resetZoom();
    }
  };

  const handleDownload = () => {
    const chart = chartRef.current?.chartInstance;
    if (chart) {
      const link = document.createElement('a');
      link.href = chart.toBase64Image();
      link.download = 'chart.png';
      link.click();
    }
  };

  const options = {
    responsive: true,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
      },
    },
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="chart-controls">
          <FaSearchPlus onClick={handleZoomIn} className="chart-control-icon" />
          <FaSearchMinus onClick={handleZoomOut} className="chart-control-icon" />
          <FaHome onClick={handleResetZoom} className="chart-control-icon" />
          <FaDownload onClick={handleDownload} className="chart-control-icon" />
          <FaTimes onClick={onClose} className="chart-control-icon close-icon" />
        </div>
        <h3>Customer Status Distribution</h3>
        <div className="pie-chart-container">
          <Pie ref={chartRef} data={chartData} options={options} width={700} height={500} />
        </div>
      </div>
    </div>
  );
};
export default CustomerPieChartModal;