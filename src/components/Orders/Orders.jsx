import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';
import moment from 'moment';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FaChartPie, FaChartLine, FaChartBar, FaChartArea } from 'react-icons/fa';
import PieChartModal from './PieChartModal';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Orders = ({ showControls = true }) => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ product: '', trackingId: '', date: '', status: '' });
  const [editingOrder, setEditingOrder] = useState(null); 
  const [showChart, setShowChart] = useState(false);
  const [showLineChart, setShowLineChart] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
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
    try {
      await axios.delete(`http://localhost:8080/api/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setNewOrder({
      product: order.product,
      trackingId: order.trackingId,
      date: moment(order.date, 'MM-DD-YYYY').format('YYYY-MM-DD'), 
      status: order.status
    });
  };

  const handleSaveEdit = async () => {
    if (!editingOrder) return;  // Ensure an order is being edited

    const updatedOrder = {
      ...newOrder,
      date: moment(newOrder.date).format('MM-DD-YYYY')
    };
    try {
      await axios.put(`http://localhost:8080/api/orders/${editingOrder.id}`, updatedOrder);
      fetchOrders();
      setEditingOrder(null);  // Clear the editing state after saving
      setNewOrder({ product: '', trackingId: '', date: '', status: '' });
    } catch (error) {
      console.error('Error saving edited order:', error);
    }
  };

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  const toggleLineChart = () => {
    setShowLineChart(!showLineChart);
  };

  const toggleButtons = (button) => {
    const nextButton = button.nextElementSibling;
    if (nextButton) {
      button.classList.toggle('hidden');
      nextButton.classList.toggle('hidden');
    }
  };

  const orderDataByDate = orders.reduce((acc, order) => {
    const date = moment(order.date, 'MM-DD-YYYY').format('MM-DD-YYYY');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const sortedDates = Object.keys(orderDataByDate).sort((a, b) => new Date(a) - new Date(b));
  const lineChartData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Number of Orders',
        data: sortedDates.map(date => orderDataByDate[date]),
        borderColor: 'rgb(99, 185, 185)',
        backgroundColor: 'rgba(167, 162, 233, 0.473)',
        fill: true,
        tension: 0.2,
        borderWidth: 5,
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 6,  
      },
    },
  };

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = {
    labels: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(255, 105, 97, 1)',  
          'rgba(135, 206, 235, 1)',  
          'rgba(152, 251, 152, 1)',  
          'rgba(216, 191, 216, 1)'   
        ],
        borderColor: [
          'rgba(255, 105, 97, 1)',  
          'rgba(135, 206, 235, 1)',  
          'rgba(152, 251, 152, 1)',  
          'rgba(216, 191, 216, 1)'   
        ],
        borderWidth: 3
      }
    ]
  };

  return (
    <div className="orders-container">
      {showControls && (
        <>
          <h3>{editingOrder ? 'Edit Order' : 'Add New Order'}</h3>
          <input type="text" name="product" value={newOrder.product} onChange={handleInputChange} placeholder="Product" />
          <input type="text" name="trackingId" value={newOrder.trackingId} onChange={handleInputChange} placeholder="Tracking ID" />
          <input type="date" name="date" value={newOrder.date} onChange={handleInputChange} />
          <input type="text" name="status" value={newOrder.status} onChange={handleInputChange} placeholder="Status" />
          <button onClick={editingOrder ? handleSaveEdit : handleAddOrder}>
            {editingOrder ? 'Save Changes' : 'Add Order'}
          </button>
        </>
      )}

      {showControls && <h2>Orders</h2>}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Tracking ID</th>
              <th>Date</th>
              <th>Status</th>
              {showControls && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.product}</td>
                <td>{order.trackingId}</td>
                <td>{order.date}</td>
                <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
                {showControls && (
                  <td>
                    <button className="action-button" onClick={() => handleEditOrder(order)}>
                      Edit
                    </button>
                    <button className="action-button hidden" onClick={() => handleDeleteOrder(order.id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mm'>
        <div className="box-above-link">
          <FaChartPie size={24} />
          <span className="order-distribution">Order-Distribution</span>
          <a href="#" onClick={toggleChart}>
            <div className="pie-chart-icon-container">
              <i className="fas fa-chart-pie pie-chart-icon"></i>
            </div>
          </a>
          <FaChartLine size={24} />
          <FaChartBar size={24} />
          <FaChartArea size={24} />
        </div>
        <div className="box-above-link">
          <FaChartPie size={24} />
          <FaChartLine size={24} />
          <span className="order-distribution">Line-Order-Distribution</span>
          <a href="#" onClick={toggleLineChart}>
            <div className="icon-container">
              <i className="fas fa-chart-line line-chart-icon"></i>
            </div>
          </a>
          <FaChartBar size={24} />
          <FaChartArea size={24} />
        </div>
      </div>
      {showChart && <PieChartModal data={pieChartData} onClose={toggleChart} />}
      {showLineChart && (
        <div>
          <h2>Orders Over Time</h2>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      )}
    </div>
  );
};

export default Orders;
