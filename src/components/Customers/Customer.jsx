// import React from 'react';
// import './Customer.css'; // Make sure this path is correct

// const Customers = () => {
//   const customers = [
//     { name: 'John Doe', email: 'john@example.com', phone: '555-1234', status: 'active' },
//     { name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', status: 'inactive' },
//     { name: 'Alice Johnson', email: 'alice@example.com', phone: '555-8765', status: 'active' },
//     // Add more customers as needed
//   ];

//   return (
//     <div className="customers-container">
//       <h2>Customers</h2>
//       <table className="customers-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map((customer, index) => (
//             <tr key={index}>
//               <td>{customer.name}</td>
//               <td>{customer.email}</td>
//               <td>{customer.phone}</td>
//               <td className={`status ${customer.status}`}>{customer.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Customers;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Customers.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/customers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the customers!", error);
      });
  }, []);

  return (
    <div className="customers-container">
      <h2>Customers</h2>
      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;

