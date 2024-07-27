import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';
import moment from 'moment/moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ product: '', trackingId: '', date: '', status: '' });

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

  const handleUpdateOrder = async (id) => {
    const updatedOrder = orders.find(order => order.id === id);
    await axios.put(`http://localhost:8080/api/orders/${id}`, updatedOrder);
    fetchOrders();
  };

  const handleDeleteOrder = async (id) => {
    await axios.delete(`http://localhost:8080/api/orders/${id}`);
    fetchOrders();
  };

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Tracking ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.product}</td>
              <td>{order.trackingId}</td>
              <td>{order.date}</td>
              <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
              <td>
                {/* <button onClick={() => handleUpdateOrder(order.id)}>Update</button> */}
                <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add New Order</h3>
      <input type="text" name="product" value={newOrder.product} onChange={handleInputChange} placeholder="Product" />
      <input type="text" name="trackingId" value={newOrder.trackingId} onChange={handleInputChange} placeholder="Tracking ID" />
      <input type="date" name="date" value={newOrder.date} onChange={handleInputChange} />
      <input type="text" name="status" value={newOrder.status} onChange={handleInputChange} placeholder="Status" />
      <button onClick={handleAddOrder}>Add Order</button>
    </div>
  );
};

export default Orders;
