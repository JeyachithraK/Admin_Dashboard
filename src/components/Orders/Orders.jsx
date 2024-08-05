import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';
import moment from 'moment';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import PieChartModal from './PieChartModal';

ChartJS.register(ArcElement, Tooltip, Legend);

const Orders = ({ showControls = true }) => { // Default to showing controls
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ product: '', trackingId: '', date: '', status: '' });
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await axios.get('http://localhost:8080/api/orders');
    setOrders(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleAddOrder = async () => {
    const formattedOrder = {
      ...newOrder,
      date: moment(newOrder.date).format('MM-DD-YYYY')
    };
    await axios.post('http://localhost:8080/api/orders', formattedOrder);
    fetchOrders();
    setNewOrder({ product: '', trackingId: '', date: '', status: '' });
  };

  const handleDeleteOrder = async (id) => {
    await axios.delete(`http://localhost:8080/api/orders/${id}`);
    fetchOrders();
  };

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(122, 165, 193, 0.331)', // Blue for Pending
          'rgba(75, 192, 192, 0.2)', // Green for In Progress
          'rgba(255, 99, 132, 0.2)', // Pink for Completed
          'rgba(255, 99, 132, 0.2)'  // Red for Cancelled
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)', // Blue for Pending
          'rgba(75, 192, 192, 1)', // Green for In Progress
          'rgba(255, 99, 132, 1)', // Pink for Completed
          'rgba(255, 99, 132, 1)'  // Red for Cancelled
        ],
        borderWidth: 1
      }
    ]
  };

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  return (
    <div className="orders-container">
        {showControls && (
        <>
          <h3>Add New Order</h3>
          <input type="text" name="product" value={newOrder.product} onChange={handleInputChange} placeholder="Product" />
          <input type="text" name="trackingId" value={newOrder.trackingId} onChange={handleInputChange} placeholder="Tracking ID" />
          <input type="date" name="date" value={newOrder.date} onChange={handleInputChange} />
          <input type="text" name="status" value={newOrder.status} onChange={handleInputChange} placeholder="Status" />
         
          <button onClick={handleAddOrder}>Add Order</button>
        </>
      )}

      {showControls && <h2>Orders</h2>} {/* Conditionally render the heading */}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Tracking ID</th>
              <th>Date</th>
              <th>Status</th>
              {showControls && <th>Actions</th>} {/* Conditionally render the "Actions" column */}
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.product}</td>
                <td>{order.trackingId}</td>
                <td>{order.date}</td>
                <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td> {/* Fixed className */}
                {showControls && (
                  <td>
                    <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                  </td>
                )} {/* Conditionally render the delete button */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pie-chart-link">
        <a href="#" onClick={toggleChart}>
          Wanna see pie-chart?
        </a>
      </div>

      <PieChartModal show={showChart} onClose={toggleChart} chartData={chartData} />
    </div>
  );
};

export default Orders;