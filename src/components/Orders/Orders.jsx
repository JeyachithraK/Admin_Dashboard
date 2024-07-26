// import React from 'react';
// import './Orders.css';

// const orders = [
//   {
//     product: 'Apple Smart Watch',
//     trackingId: 'ABC123456',
//     date: '2024-07-25',
//     status: 'Shipped'
//   },
//   {
//     product: 'Samsung Galaxy S21',
//     trackingId: 'XYZ789101',
//     date: '2024-07-24',
//     status: 'Delivered'
//   },
//   {
//     product: 'MacBook Pro 16"',
//     trackingId: 'LMN345678',
//     date: '2024-07-22',
//     status: 'Pending'
//   },
//   // Add more orders as needed
// ];

// const Orders = () => {
//   return (
//     <div className="orders-container">
//       <h2>Order Details</h2>
//       <table className="orders-table">
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Tracking ID</th>
//             <th>Date</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order, index) => (
//             <tr key={index}>
//               <td>{order.product}</td>
//               <td>{order.trackingId}</td>
//               <td>{order.date}</td>
//               <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Orders;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the orders!", error);
      });
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.product}</td>
              <td>{order.trackingId}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;

