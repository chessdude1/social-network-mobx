import React from 'react';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import './App.css';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <h1>Test</h1>
      </div>
    </ThemeProvider>
  );
}

export default App;
