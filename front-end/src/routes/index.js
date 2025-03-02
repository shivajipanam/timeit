// src/routes/index.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import OptimizedMonthPage from '../pages/OptimizedMonthPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/optimized-month" element={<OptimizedMonthPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;