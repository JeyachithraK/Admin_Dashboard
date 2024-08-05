import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';
import ProductPieChartModal from './ProductPieChartModal';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/products', newProduct);
      fetchProducts();
      setNewProduct({ name: '', price: '', description: '' });
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Error adding product');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Error deleting product');
    }
  };

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  // Compute price ranges
  const priceRanges = {
    'Under 1000': 0,
    'Under 2000': 0,
    'Under 3000': 0,
    'Under 4000': 0,
    'Under 5000': 0,
    'Above 5000': 0,
  };

  products.forEach(product => {
    const price = parseFloat(product.price);
    if (price < 1000) priceRanges['Under 1000']++;
    else if (price < 2000) priceRanges['Under 2000']++;
    else if (price < 3000) priceRanges['Under 3000']++;
    else if (price < 4000) priceRanges['Under 4000']++;
    else if (price < 5000) priceRanges['Under 5000']++;
    else priceRanges['Above 5000']++;
  });

  const chartData = {
    labels: Object.keys(priceRanges),
    datasets: [
      {
        data: Object.values(priceRanges),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)', 
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)', 
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="products-container">
      <h2>Products</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add New Product</h3>
      <div className="add-product-section">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Price"
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div className="pie-chart-link" style={{ marginTop: '20px' }}>
        <a href="#" onClick={toggleChart}>
          Wanna see pie-chart?
        </a>
      </div>

      <ProductPieChartModal
        show={showChart}
        onClose={toggleChart}
        chartData={chartData}
      />
    </div>
  );
};

export default Products;
