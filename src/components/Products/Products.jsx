import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:8080/products');
    setProducts(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    await axios.post('http://localhost:8080/products', newProduct);
    fetchProducts();
    setNewProduct({ name: '', price: '', description: '' });
  };

  const handleUpdateProduct = async (id) => {
    const updatedProduct = products.find(product => product.id === id);
    await axios.put(`http://localhost:8080/products/${id}`, updatedProduct);
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:8080/products/${id}`);
    fetchProducts();
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
                {/* <button onClick={() => handleUpdateProduct(product.id)}>Update</button> */}
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add New Product</h3>
      <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Name" />
      <input type="text" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Price" />
      <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Description" />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default Products;
