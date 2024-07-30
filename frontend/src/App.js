import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './opg-pages/WelcomePage';
import Login from './opg-pages/Login';
import Register from './opg-pages/Register';
import ListProducts from './opg-pages/ProductList';
import ProductDetail from './opg-pages/ProductDetail';
import EditProduct from './opg-pages/EditProduct';
import AddProduct from './opg-pages/AddProduct';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list_products" element={<ListProducts />} />
        <Route path="/add_product" element={<AddProduct />} />
        <Route path="/get_product/:status_id" element={<ProductDetail />} />
        <Route path="/update_product/:status_id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;