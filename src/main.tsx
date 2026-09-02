import React from 'react';
import ReactDOM from 'react-dom/client';
import { SocialProvider } from './context/SocialContext';
import App from './App';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocialProvider>
      <App />
    </SocialProvider>
  </React.StrictMode>
);
