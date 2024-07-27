import React from 'react';
import './App.css';
import './components/Login/Login.css';
import './components/Signup/Signup.css';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import MainDash from './components/MainDash/MainDash';
import Orders from './components/Orders/Orders';
import Customers from './components/Customers/Customer';
import Products from './components/Products/Products';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import RightSide from './components/RigtSide/RightSide';

function App({ children }) {
  return (
    <div className="App">
      {/* <Router> */}
        <div className="AppGlass">
          <Sidebar/>
        { children }
        <RightSide/>
          {/* <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<MainDash />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/products" element={<Products />} />
          </Routes> */}
        </div>
      {/* </Router> */}
    </div>
  );
}

export default App;
