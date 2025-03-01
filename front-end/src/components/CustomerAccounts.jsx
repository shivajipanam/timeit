// src/components/CustomerAccounts.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const CustomerAccounts = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const data = await apiService.getCustomers();
        setCustomers(data.data || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch customers. Please try again later.');
        console.error('Error fetching customers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleCustomerSelect = async (customer) => {
    setSelectedCustomer(customer);
    setAccountsLoading(true);
    
    try {
      const data = await apiService.getAccounts(customer._id);
      setAccounts(data.data || []);
    } catch (err) {
      console.error('Error fetching accounts:', err);
      setError('Failed to fetch accounts for this customer.');
    } finally {
      setAccountsLoading(false);
    }
  };

  if (loading) return <div>Loading customers...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="customer-accounts">
      <h2>Customer Accounts</h2>
      
      <div className="customer-list">
        <h3>Select a Customer</h3>
        {customers.length === 0 ? (
          <p>No customers found</p>
        ) : (
          <div className="customer-grid">
            {customers.map((customer) => (
              <div 
                key={customer._id} 
                className={`customer-card ${selectedCustomer && selectedCustomer._id === customer._id ? 'selected' : ''}`}
                onClick={() => handleCustomerSelect(customer)}
              >
                <h4>{customer.first_name} {customer.last_name}</h4>
                <p>{customer.address ? `${customer.address.street_number} ${customer.address.street_name}, ${customer.address.city}, ${customer.address.state}` : 'Address not available'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {selectedCustomer && (
        <div className="accounts-section">
          <h3>Accounts for {selectedCustomer.first_name} {selectedCustomer.last_name}</h3>
          {accountsLoading ? (
            <div>Loading accounts...</div>
          ) : accounts.length === 0 ? (
            <p>No accounts found for this customer</p>
          ) : (
            <div className="accounts-grid">
              {accounts.map((account) => (
                <div key={account._id} className="account-card">
                  <h4>{account.nickname || account.type}</h4>
                  <p><strong>Type:</strong> {account.type}</p>
                  <p><strong>Balance:</strong> ${account.balance?.toFixed(2) || '0.00'}</p>
                  <p><strong>Account Number:</strong> {account._id}</p>
                  {account.rewards && <p><strong>Rewards:</strong> {account.rewards} points</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerAccounts;