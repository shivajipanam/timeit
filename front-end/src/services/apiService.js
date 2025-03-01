
// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Service for interacting with the Nessie API through our backend
 */
const apiService = {
  /**
   * Get all ATM locations
   */
  getATMs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/atms`);
      return response.data;
    } catch (error) {
      console.error('Error fetching ATMs:', error);
      throw error;
    }
  },

  /**
   * Get all branch locations
   */
  getBranches: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/branches`);
      return response.data;
    } catch (error) {
      console.error('Error fetching branches:', error);
      throw error;
    }
  },

  /**
   * Get all customers
   */
  getCustomers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  /**
   * Get accounts for a specific customer
   * @param {string} customerId - The customer's ID
   */
  getAccounts: async (customerId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/accounts/${customerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  }
};

export default apiService;