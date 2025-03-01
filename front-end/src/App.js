// src/App.jsx
import React from 'react';
import AccountForm from './components/AccountForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Capital One Nessie API Integration</h1>
      </header>
      <main>
        <AccountForm />
      </main>
    </div>
  );
}

export default App;
