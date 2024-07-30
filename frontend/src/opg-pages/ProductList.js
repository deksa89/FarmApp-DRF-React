import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/product_list.css'


const categoryMapping = {
  'milk_product': 'Mliječni proizvodi',
  'fruit_product': 'Voće',
  'vegetables_product': 'Povrće',
};

function ListProducts() {
  const [prodData, setProdData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const productUrl = 'http://localhost:8000/api/list_products/';
  const userUrl = 'http://localhost:8000/api/auth/';

  useEffect(() => {
    const fetchProdData = async () => {
      try {
        const response = await axios.get(productUrl, {
            withCredentials: true,
        });
        const products = response.data.map(product => ({
          ...product,
          category: categoryMapping[product.category] || product.category,
        }));
        setProdData(products); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchUserData = async () => {
        try {
          const response = await axios.get(userUrl, {
              withCredentials: true,
          });
          console.log("response dolje: ", response)
          setUserData(response.data); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    fetchUserData();
    fetchProdData();
  }, []);

  const handleProductClick = (product) => {
    console.log("detalji: ", product)
    navigate(`/get_product/${product.id}`);
  };


  const handleDelete = async (status_id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete_product/${status_id}`, {
        withCredentials: true,
      });
      const deletedProduct = prodData.find(product => product.id === status_id);
      setPopupMessage(`${deletedProduct.name} is deleted`);
      setShowPopup(true);
      setProdData(prodData.filter(product => product.id !== status_id));
      setTimeout(() => setShowPopup(false), 2000);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (status_id) => {
    navigate(`/update_product/${status_id}`);
  };

  const handleAddProduct = () => {
    navigate('/add_product');
  };

  return (
    <div className="container">
      {userData ? (
        <div className="user-info">
          <p className="opg-name">{userData.naziv_opg}</p>
          <p className="user-name">{userData.ime} {userData.prezime}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <div className="products-list">
        {prodData.map((product) => (
          <div key={product.id} className="product-item">
            <p className="product-name" onClick={() => handleProductClick(product)}>{product.name}</p>
            <p className="product-category">{product.category}</p>
            <p className="product-detail">{product.detail}</p>
            <button className="add-button" onClick={() => handleAddProduct()}>Add Product</button>
            <button className="edit-button" onClick={() => handleEdit(product.id)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup">
          {popupMessage}
        </div>
      )}
    </div>
  );
}

export default ListProducts;
