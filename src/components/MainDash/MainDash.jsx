import React from "react";
import Cards from "../Cards/Cards";
import Orders from "../Orders/Orders"; // Import the Orders component
import "./MainDash.css";

const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <div className="cards-container">
        <Cards />
      </div>
      <h2>Recent Orders</h2>
      <div className="recent-orders-container">
        <Orders showControls={false} /> {/* Pass prop to hide controls */}

      </div>
    </div>
  );
};

export default MainDash;