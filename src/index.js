import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import { CookbookContextProvider } from './store/cookbook-context';
import App from './App';
import './index.css';

ReactDOM.render(
  <AuthContextProvider>
    <CookbookContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookbookContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
