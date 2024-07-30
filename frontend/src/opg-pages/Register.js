import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    naziv_opg: '',
    adresa: '',
    telefon: '',
    email: '',
    //potvrdiEmail: '',  NAPRAVITI DA BUDE POTVRDA MAILA PRILIKOM REGISTRACIJE
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //console.log("formData: ", formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/api/register/', formData);
        console.log("response: ", response);
        alert('Registracija uspješna!');
        navigate('/login');
      } catch (error) {
        console.log('Registration error:', error);
        alert('Došlo je do pogreške prilikom registracije.');
      }
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '5px'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: '#007bff',
    textDecoration: 'underline'
  };

  return (
    <div style={containerStyle}>
      <h2>Registracija korisnika</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        {Object.entries(formData).map(([key, value]) => (
          <label key={key} style={labelStyle}>
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, '$1')}:
            <input
              type={key.includes('lozinka') || key.includes('email') ? key : "text"}
              name={key}
              value={value}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
        ))}
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
      <p>Ako imaš račun <button onClick={() => navigate('/login')} style={secondaryButtonStyle}>Ulogiraj se</button></p>
    </div>
  );
}

export default Register;
