import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/product_detail.css';

const categoryMapping = {
  'milk_product': 'Mliječni proizvodi',
  'fruit_product': 'Voće',
  'vegetables_product': 'Povrće',
};

const ProductDetail = () => {
  const { status_id } = useParams();
  const [prodDetail, setProdDetail] = useState(null);
  const navigate = useNavigate();
  const productDetailUrl = `http://localhost:8000/api/get_product/${status_id}`;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(productDetailUrl, {
            withCredentials: true,
        });
        const productData = response.data;
        // Map internal category value to human-readable label
        productData.category = categoryMapping[productData.category] || productData.category;
        setProdDetail(productData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProductDetails();
  }, [productDetailUrl]);

  const backButton = () => {
    navigate(`/list_products`);
  };

  return (
    <div className="container">
      {prodDetail ? (
        <div className="prod-info">
          <p className="prod-name">{prodDetail.name}</p>
          <p className="prod-category">{prodDetail.category}</p>
          <p className="prod-detail">{prodDetail.detail}</p>
          <button className="back-button" onClick={backButton}>Back</button>
        </div>
      ) : (
        <p>Loading product data...</p>
      )}
    </div>
  );
}

export default ProductDetail;
