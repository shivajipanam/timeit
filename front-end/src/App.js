// src/App.jsx
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import AppRoutes from './routes';
import GlobalStyles from './styles/GlobalStyles';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;