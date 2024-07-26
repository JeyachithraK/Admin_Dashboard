// import React from 'react';
// import './Products.css'; // Make sure this path is correct

// const Products = () => {
//   const products = [
//     { name: 'Product A', category: 'Electronics', price: '$199.99', stock: 'In Stock' },
//     { name: 'Product B', category: 'Apparel', price: '$49.99', stock: 'Out of Stock' },
//     { name: 'Product C', category: 'Home Goods', price: '$29.99', stock: 'In Stock' },
//     // Add more products as needed
//   ];

//   return (
//     <div className="products-container">
//       <h2>Products</h2>
//       <table className="products-table">
//         <thead>
//           <tr>
//             <th>Product Name</th>
//             <th>Category</th>
//             <th>Price</th>
//             <th>Stock Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product, index) => (
//             <tr key={index}>
//               <td>{product.name}</td>
//               <td>{product.category}</td>
//               <td>{product.price}</td>
//               <td className={`status ${product.stock.toLowerCase().replace(/\s+/g, '-')}`}>{product.stock}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Products;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div className="products-container">
      <h2>Products</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;

