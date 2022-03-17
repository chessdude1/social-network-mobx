import React from 'react';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { RegistrationPage } from './Views/RegistrationPage/RegistrationPage';
import { AuthPage } from './Views/AuthPage/AuthPage';
import { UserPage } from './Views/UserPage/UserPage';

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Inter',
        textTransform: 'none',
      },
    },
  })
);

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/authorization' element={<AuthPage />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='*' element={<RegistrationPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
