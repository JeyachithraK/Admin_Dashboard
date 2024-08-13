import React from 'react';
import { Line } from 'react-chartjs-2';
import './ProductLineChartModal.css';

const ProductLineChartModal = ({ show, onClose, chartData }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default ProductLineChartModal;
