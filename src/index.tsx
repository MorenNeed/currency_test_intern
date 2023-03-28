import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './ts/pages/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
let theme = createTheme({
  palette: {
    mode: 'light'
  }
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
