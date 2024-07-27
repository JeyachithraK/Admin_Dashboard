import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/users/signup', {
        email,
        password,
      });
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      navigate('/login');
    } catch (err) {
      setError('Error signing up, please try again');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-header"></div>
        <div className="login-welcome">
          <h2>Welcome to My Dashboard</h2>
          <p>Register to access your account</p>
        </div>
      </div>
      <div className="login-right">
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <h2 className='log'>SignUp</h2><br />
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
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password" className='em'>Confirm Password</label>
              <input
                className="tr"
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div><br />
            <button type="submit">SignUp</button><br />
            <div className="additional-options">
              <div>
                <p className="acc">Already have an account? <a onClick={() => navigate('/login')}>Login here</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
