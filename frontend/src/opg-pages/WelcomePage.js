import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/')
      .then(response => {
        //console.log("response: ", response);
        setWelcomeMessage(response.data.message);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleLoginClick = () => {
    navigate('login/');
  };

  const handleRegisterClick = () => {
    navigate('register/');
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '5px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'inline-block'
  };

  const messageStyle = {
    margin: '20px 0',
    fontSize: '18px'
  };

  return (
    <div style={containerStyle}>
      <h1>Welcome!</h1>
      <p style={messageStyle}>{welcomeMessage}</p>
      <button onClick={handleLoginClick} style={buttonStyle}>Login</button>
      <button onClick={handleRegisterClick} style={buttonStyle}>Register</button>
    </div>
  );
}

export default WelcomePage;
