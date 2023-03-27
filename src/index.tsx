import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import App from './ts/pages/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
