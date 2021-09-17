import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import App from './App';
import './index.css';

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById('root')
);
