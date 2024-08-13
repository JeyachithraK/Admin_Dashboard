import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';
import ProductPieChartModal from './ProductPieChartModal';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaChartPie, FaChartLine, FaChartBar, FaChartArea } from 'react-icons/fa';
import ProductLineChartModal from './ProductLineChartModal';


ChartJS.register(ArcElement, Tooltip, Legend);


export const UseProductsData = () => {
  const [expenses, setExpense] = useState(0);
  const [expensesSeries, setExpenseSeries] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        const products = response.data;
        console.log('Products:', products);

        // Ensure that products are not null or undefined
        if (products && Array.isArray(products)) {
          // Calculate total expense
          const totalExpense = products.reduce((acc, product) => {
            if (product.price) {
              return acc + parseFloat(product.price);
            }
            return acc;
          }, 0);

          // Prepare expense series data
          const expenseSeriesData = products
            .map(product => parseFloat(product.price))
            .filter(price => !isNaN(price)); // Filter out NaN values

          // Update state
          setExpense(totalExpense);
          setExpenseSeries(expenseSeriesData);

          // Debugging output
          console.log('Total Expense:', totalExpense);
          console.log('Expense Series Data:', expenseSeriesData);
        } else {
          console.error('Invalid products data');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return { expenses, expensesSeries };
};
  
const Products = () => {
  const [products, setProducts] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
  const [error, setError] = useState('');
  const [showLineChart, setShowLineChart] = useState(false); // Add this state

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
        borderWidth: 3,
      },
    ],
  };
  const toggleLineChart = () => setShowLineChart(!showLineChart);

  // Line chart data
  const lineChartData = {
    labels: products.map((product, index) => `Product ${index + 1}`),
    datasets: [
      {
        label: 'Product Prices',
        data: products.map(product => parseFloat(product.price)),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };


  return (
    <div className="products-container">
      <h2>Add New Product</h2>
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
      <div className='mm1'>
        <div className="box-above-link">
          <FaChartPie size={24} />
          <span className="order-distribution">Price-Distribution</span>
          <a href="#" onClick={toggleChart}>
            <div className="pie-chart-icon-container">
              <i className="fas fa-chart-pie pie-chart-icon"></i>
            </div>
          </a>
          <FaChartLine size={24} />
          <FaChartBar size={24} />
          <FaChartArea size={24} />
        </div>
        <br />
        <div className="box-above-link">
          <FaChartPie size={24} />
          <FaChartLine size={24} />
          <span className="order-distribution">Line-Order-Distribution</span>
          <a href="#" onClick={toggleLineChart}>
            <div className="icon-container">
              <i className="fas fa-chart-line line-chart-icon"></i>
            </div>
          </a>
          <FaChartBar size={24} />
          <FaChartArea size={24} />
        </div>
      </div>

      {/* Modals */}
      <ProductPieChartModal
        show={showChart}
        onClose={toggleChart}
        chartData={chartData}
      />
      <ProductLineChartModal
        show={showLineChart}
        onClose={toggleLineChart}
        chartData={lineChartData}
      />
    </div>
  );
};

export default Products;