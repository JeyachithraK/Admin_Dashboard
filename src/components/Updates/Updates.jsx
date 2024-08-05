import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { FaBell } from "react-icons/fa"; // Import the notification icon
import "./Updates.css";

const Updates = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orders'); // Fetch orders from your API
      const orders = response.data;
      const formattedUpdates = orders.map((order) => ({
        productName: order.product,
        trackingId: order.trackingId,
        time: moment(order.date, 'MM-DD-YYYY').fromNow() // Calculate time ago
      }));
      setUpdates(formattedUpdates);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="Updates">
      {updates.map((update, index) => (
        <div className="update" key={index}>
          <div className="notification-icon">
            <FaBell /> {/* Notification icon */}
          </div>
          <div className="noti">
            <div style={{ marginBottom: '0.5rem' }}>
              <span>{`${update.productName} was ordered`}</span>
              <span>{` and the tracking ID is ${update.trackingId}`}</span>
            </div>
            <span>{update.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Updates;
