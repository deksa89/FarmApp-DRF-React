import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/product_detail.css';

const ProductDetail = () => {
  const { status_id } = useParams();
  const [prodDetail, setProdDetail] = useState([]);
  const navigate = useNavigate();
  const productDetailUrl = `http://localhost:8000/api/get_product/${status_id}`

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(productDetailUrl, {
            withCredentials: true,
        });
        console.log("response dolje: ", response)
        setProdDetail(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProductDetails();
  }, []);

  return (
    <div className="container">
      {prodDetail ? (
        <div className="prod-info">
          <p className="prod-name">{prodDetail.name}</p>
          <p className="prod-category">{prodDetail.category}</p>
          <p className="prod-detail">{prodDetail.detail}</p>
        </div>
      ) : (
        <p>Loading product data...</p>
      )}
    </div>
  );
}

export default ProductDetail;