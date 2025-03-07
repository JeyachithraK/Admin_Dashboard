import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        // Clear fields after submit
        setEmail('');
        setPassword('');
        setError('');
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-header"></div>
        <div className="login-welcome">
          <h2>Welcome Back</h2>
          <p className='wel'>Login to access your account</p>
          <dotlottie-player 
        src="https://lottie.host/b46f7d74-639d-45b4-ad4d-ae2fc17e827f/fTsv6H9b71.json" 
        background="transparent" 
        speed="1" 
        style={{ width: '350px', height: '350px'}} 
        loop 
        autoplay
      ></dotlottie-player>
        </div>
</div>
      <div className="login-right">
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <h2 className='log'>Login</h2><br />
            {error && <p className="error">{error}</p>}
            <div className="form-group">
              <label htmlFor="email" className='em'>Email</label>
              <input
                className="tr"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className='em'>Password</label>
              <input
                className="tr"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div><br />
            <button type="submit">Login</button><br />
            <div className="additional-options">
              <div>
                <p className="acc">Don't have an account? 
                  <button 
                    onClick={() => navigate('/signup')} 
                    className="link-button">
                    SignUp here
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
