// src/components/Dashboard.jsx
import React, { useState } from 'react';
import ATMLocations from './ATMLocations';
import CustomerAccounts from './CustomerAccounts';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('atms');

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Capital One Nessie API Dashboard</h1>
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'atms' ? 'active' : ''}`}
            onClick={() => setActiveTab('atms')}
          >
            ATM Locations
          </button>
          <button 
            className={`tab-button ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            Customer Accounts
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        {activeTab === 'atms' ? (
          <ATMLocations />
        ) : (
          <CustomerAccounts />
        )}
      </div>
    </div>
  );
};

export default Dashboard;