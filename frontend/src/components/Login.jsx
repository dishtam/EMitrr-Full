import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const submitThis = async (e) => {
    e.preventDefault()
    const info = { email: email, password: password }

    try {
      const response = await axios.post('http://localhost:3000/api/login', info)
      // const response = await fetch("http://localhost:3000/api/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(info),
      // });
      // console.log(response.data)

      if (response.data.success) {
        console.log('Login successful')
        localStorage.setItem('token', response.data.token)
        navigate('/') // Redirect to the home page upon successful login
      } else {
        console.error('Login failed')
        // Handle login failure (display error message, etc.)
      }
    } catch (error) {
      console.error('Error:', error)
      // Handle network errors or other issues
    }
  }

  return (
    <div className="container">
      <form onSubmit={submitThis}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>

        <Link to="/register" className="link">
          Don't have an account?
        </Link>
      </form>
    </div>
  )
}

export default Login
