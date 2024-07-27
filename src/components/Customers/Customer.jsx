import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Customers.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await axios.get('http://localhost:8080/customers');
    setCustomers(response.data);
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    if (id) {
      setCustomers(prevCustomers => 
        prevCustomers.map(customer => 
          customer.id === id ? { ...customer, [name]: value } : customer
        )
      );
    } else {
      setNewCustomer({ ...newCustomer, [name]: value });
    }
  };

  const handleAddCustomer = async () => {
    await axios.post('http://localhost:8080/customers', newCustomer);
    fetchCustomers();
    setNewCustomer({ name: '', email: '', phone: '' });
  };

  // const handleUpdateCustomer = async (id) => {
  //   const updatedCustomer = customers.find(customer => customer.id === id);
  //   await axios.put(`http://localhost:8080/customers/${id}`, updatedCustomer);
  //   fetchCustomers();
  // };

  const handleDeleteCustomer = async (id) => {
    await axios.delete(`http://localhost:8080/customers/${id}`);
    fetchCustomers();
  };

  return (
    <div className="customers-container">
      <h2>Customers</h2>
      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                {/* <button onClick={() => handleUpdateCustomer(customer.id)}>Update</button> */}
                <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add New Customer</h3>
      <input type="text" name="name" value={newCustomer.name} onChange={handleInputChange} placeholder="Name" />
      <input type="email" name="email" value={newCustomer.email} onChange={handleInputChange} placeholder="Email" />
      <input type="text" name="phone" value={newCustomer.phone} onChange={handleInputChange} placeholder="Phone" />
      <button onClick={handleAddCustomer}>Add Customer</button>
    </div>
  );
};

export default Customers;
