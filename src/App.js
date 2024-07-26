import './App.css';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import Orders from './components/Orders/Orders';
import Customers from './components/Customers/Customer';
import Products from './components/Products/Products';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="AppGlass">
          <Sidebar/>
          <Routes>
            <Route path="/" element={<MainDash />} />
            <Route path="/dashboard" element={<MainDash />} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/customers" element={<Customers/>} />
            <Route path="/products" element={<Products/>} />
            {/* <Route path="/analytics" element={<div>Analytics Component</div>} />
            <Route path="/revenue" element={<div>Revenue Component</div>} />
            <Route path="/expenses" element={<div>Expenses Component</div>} /> */}
          </Routes>
          <RightSide/>
        </div>
      </Router>
    </div>
  );
}

export default App;
