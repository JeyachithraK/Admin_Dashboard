import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import MainDash from './components/MainDash/MainDash';

import Orders from './components/Orders/Orders';
import Customers from './components/Customers/Customer';
import Products from './components/Products/Products';
import Reviews from './components/Reviews/Reviews';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<App><MainDash /></App>} />
        <Route path="/orders" element={<App><Orders /></App>} />
        <Route path="/customers" element={<App><Customers /></App>} />
        <Route path="/products" element={<App><Products /></App>} />
        <Route path="/reviews" element={<App><Reviews /></App>} />
      {/* <Route path="/dashboard" element={<MainDash />} />
      <Route path="/orders" element={<Orders/>} />
      <Route path="/customers" element={<Customers/>} />
      <Route path="/products" element={<Products/>} /> */}
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
