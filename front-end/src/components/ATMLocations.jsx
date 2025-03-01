// src/components/ATMLocations.jsx
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const ATMLocations = () => {
  const [atms, setAtms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchATMs = async () => {
      try {
        setLoading(true);
        const data = await apiService.getATMs();
        setAtms(data.data || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch ATM locations. Please try again later.');
        console.error('Error fetching ATMs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchATMs();
  }, []);

  if (loading) return <div>Loading ATM locations...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="atm-locations">
      <h2>ATM Locations</h2>
      {atms.length === 0 ? (
        <p>No ATM locations found</p>
      ) : (
        <div className="atm-grid">
          {atms.map((atm) => (
            <div key={atm._id} className="atm-card">
              <h3>{atm.name || 'Capital One ATM'}</h3>
              <p><strong>Location:</strong> {atm.address ? `${atm.address.street_number} ${atm.address.street_name}, ${atm.address.city}, ${atm.address.state}` : 'Address not available'}</p>
              {atm.accessibility && <p><strong>Accessibility:</strong> {atm.accessibility}</p>}
              {atm.hours && <p><strong>Hours:</strong> {atm.hours}</p>}
              {atm.amount_left && <p><strong>Cash Available:</strong> ${atm.amount_left.toFixed(2)}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ATMLocations;