import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Customers.css';
import CustomerPieChartModal from './CustomerPieChartModal';
import { FaChartPie, FaChartLine, FaChartBar, FaChartArea } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [showLineChart, setShowLineChart] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', status: 'Active' });
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [editingCustomer, setEditingCustomer] = useState(null);

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
      await axios.post('http://localhost:8080/api/customers', newCustomer);
      fetchCustomers();
      setNewCustomer({ name: '', email: '', phone: '', status: 'Active' });
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setNewCustomer({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.status
    });
  };

  const handleSaveEdit = async () => {
    if (!editingCustomer) return;

    const updatedCustomer = {
      ...newCustomer,
    };

    try {
      await axios.put(`http://localhost:8080/api/customers/${editingCustomer.id}`, updatedCustomer);
      fetchCustomers();
      setEditingCustomer(null);
      setNewCustomer({ name: '', email: '', phone: '', status: 'Active' });
    } catch (error) {
      console.error('Error saving edited customer:', error);
    }
  };

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  const toggleLineChart = () => {
    setShowLineChart(!showLineChart);
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
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 3,
      },
    ],
  };

  const lineChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Number of Customers',
        data: Object.values(statusCounts),
        backgroundColor: 'rgba(173, 216, 230, 0.5)',
        borderColor: 'rgb(99, 168, 242)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Filter customers based on selected status
  const filteredCustomers = selectedStatus === 'All' ? customers : customers.filter(customer => customer.status === selectedStatus);

  return (
    <div className="customers-container">
      <div className="add-customer-section">
        <h3>{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h3>
        <input type="text" name="name" value={newCustomer.name} onChange={handleInputChange} placeholder="Name" />
        <input type="email" name="email" value={newCustomer.email} onChange={handleInputChange} placeholder="Email" />
        <input type="text" name="phone" value={newCustomer.phone} onChange={handleInputChange} placeholder="Phone" />
        <select className="sel" name="status" value={newCustomer.status} onChange={handleInputChange}>
        <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <br />
        {editingCustomer ? (
          <>
            <button onClick={handleSaveEdit}>Save Changes</button>
            {/* <button onClick={() => { setEditingCustomer(null); setNewCustomer({ name: '', email: '', phone: '', status: 'Active' }); }}></button> */}
          </>
        ) : (
          <button onClick={handleAddCustomer}>Add Customer</button>
        )}
      </div>

      <div className="filter-container">
        <h4><label htmlFor="statusFilter">Filter by Status: </label></h4>
        <select id="statusFilter" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
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
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.status}</td>
                <td>
                  <button onClick={() => handleEditCustomer(customer)}>Edit</button>&ensp;&ensp;
                  <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mm">
        <div className="box-above-link">
          <FaChartPie size={24} />
          <span className="order-distribution">Rate-Distribution</span>
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
          <span className="order-distribution">Rate-Order-Distribution</span>
          <a href="#" onClick={toggleLineChart}>
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
      {showLineChart && (
        <div className="line-chart-container">
          <Line data={lineChartData} />
        </div>
      )}
    </div>
  );
};

export default Customers;
