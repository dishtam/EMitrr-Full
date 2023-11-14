import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Flash} from '@primer/react'
import '../styles/register.css'; // Import the CSS file with the styles

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Registration successful');
        // Optionally, redirect to login or perform other actions upon successful registration
        navigate("/");
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Register</button>
        <Link to='/login' className='link'>
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default Register;
