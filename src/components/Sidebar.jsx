import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { FaStar } from 'react-icons/fa'; // Example icon

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const sidebarVariants = {
    true: { left: '0' },
    false: { left: '-60%' }
  };

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      alert("You will be redirected to login");
      setTimeout(() => {
        navigate('/login');
      }, 5000); // 5 seconds delay
    }
  };

  return (
    <>
      <div 
        className="bars" 
        style={{ left: expanded ? '60%' : '5%' }} 
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div 
        className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Sh<span>o</span>ps
          </span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => (
            <NavLink
              to={`/${item.heading.toLowerCase()}`}
              className={({ isActive }) => isActive ? 'menuItem active' : 'menuItem'}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </NavLink>
          ))}

          {/* signoutIcon */}
          <div className="menuItem" onClick={handleSignOut}>
            <UilSignOutAlt />
            <span>Log Out</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
