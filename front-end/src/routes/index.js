// src/routes/index.js with protected routes
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import OptimizedMonthPage from '../pages/OptimizedMonthPage';
import AddAccountPage from '../pages/AddAccountPage';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/optimized-month" 
          element={
            <ProtectedRoute>
              <OptimizedMonthPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-account" 
          element={
            <ProtectedRoute>
              <AddAccountPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;