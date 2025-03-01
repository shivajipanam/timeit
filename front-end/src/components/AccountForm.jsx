// src/components/AccountForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountForm = () => {
  const [formData, setFormData] = useState({
    type: 'Savings',
    nickname: '',
    rewards: 0,
    balance: 0
  });
  
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Checking...');
  
  // Test backend connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/test-connection');
        setConnectionStatus('Connected to backend');
      } catch (err) {
        setConnectionStatus('Failed to connect to backend');
        console.error('Connection test failed:', err);
      }
    };
    
    testConnection();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert numeric values
    if (name === 'rewards' || name === 'balance') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    
    try {
      const result = await axios.post('http://localhost:5000/api/create-account', formData);
      setResponse(result.data);
    } catch (err) {
      setError(err.response?.data || { message: 'Failed to create account' });
      console.error('Error creating account:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="account-form-container">
      <div className="connection-status">
        Backend Status: <strong>{connectionStatus}</strong>
      </div>
      
      <h2>Create New Bank Account</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Account Type</label>
          <select 
            id="type" 
            name="type" 
            value={formData.type} 
            onChange={handleChange}
          >
            <option value="Savings">Savings</option>
            <option value="Checking">Checking</option>
            <option value="Credit Card">Credit Card</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="nickname">Account Nickname</label>
          <input 
            type="text" 
            id="nickname" 
            name="nickname" 
            value={formData.nickname} 
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="rewards">Rewards Points</label>
          <input 
            type="number" 
            id="rewards" 
            name="rewards" 
            value={formData.rewards} 
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="balance">Initial Balance</label>
          <input 
            type="number" 
            id="balance" 
            name="balance" 
            value={formData.balance} 
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
      
      {response && (
        <div className="response success">
          <h3>Success!</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      
      {error && (
        <div className="response error">
          <h3>Error</h3>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AccountForm;