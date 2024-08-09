import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Customers.css';
import CustomerPieChartModal from './CustomerPieChartModal';
import { FaChartPie, FaChartLine, FaChartBar, FaChartArea } from 'react-icons/fa'; // Import icons from react-icons
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', status: 'Active' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleAddCustomer = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/customers', newCustomer);
      fetchCustomers();
      setNewCustomer({ name: '', email: '', phone: '', status: 'Active' });
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/customers/${id}`);
      fetchCustomers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  const statusCounts = customers.reduce((acc, customer) => {
    const status = customer.status || 'Active';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ['rgba(75, 192, 192, 0.2)','rgba(255, 206, 86, 0.2)' ],
        borderColor: ['rgba(75, 192, 192, 1)',  'rgba(255, 206, 86, 1)'],
        borderWidth: 3
        
      }
    ]
  };
//  backgroundColor: [
//   'rgba(75, 192, 192, 0.2)', 
//   'rgba(255, 99, 132, 0.2)',
//   'rgba(255, 206, 86, 0.2)',
//   'rgba(54, 162, 235, 0.2)',
//   'rgba(153, 102, 255, 0.2)',
//   'rgba(255, 159, 64, 0.2)'
// ],
// borderColor: [
//   'rgba(75, 192, 192, 1)', 
//   'rgba(255, 99, 132, 1)',
//   'rgba(255, 206, 86, 1)',
//   'rgba(54, 162, 235, 1)',
//   'rgba(153, 102, 255, 1)',
//   'rgba(255, 159, 64, 1)'
// ],
// borderWidth: 3,
// },
  return (
    <div className="customers-container">
      <div className="add-customer-section">
        <h3>Add New Customer</h3>
        <input type="text" name="name" value={newCustomer.name} onChange={handleInputChange} placeholder="Name" />
        <input type="email" name="email" value={newCustomer.email} onChange={handleInputChange} placeholder="Email" />
        <input type="text" name="phone" value={newCustomer.phone} onChange={handleInputChange} placeholder="Phone" />
        <select className="sel" name="status" value={newCustomer.status} onChange={handleInputChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <br />
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>

      <div className="customers-table-container">
        <h2>Customers</h2>
        <table className="customers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.status}</td>
                <td>
                  <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mm'>
            <div className="box-above-link">
              <FaChartPie size={24} />
              <a href="#" onClick={toggleChart}>
                {/* Wanna see pie-chart? */}
                <div class="pie-chart-icon-container">
                 <i class="fas fa-chart-pie pie-chart-icon"></i>
                </div>
              </a>
              <FaChartLine size={24} />
              <FaChartBar size={24} />
              <FaChartArea size={24} />
            </div>
            <div className="box-above-link">
                   <FaChartPie size={24} />
                  <FaChartLine size={24} />
                     <a href="#" >
                        <div className="icon-container">
                <i className="fas fa-chart-line graph-icon"></i>
            </div>
          </a>
        <FaChartBar size={24} />
        <FaChartArea size={24} />

      </div>
      </div>
      <CustomerPieChartModal
        show={showChart}
        onClose={toggleChart}
        chartData={chartData}
      />
    </div>
  );
};

export default Customers;
