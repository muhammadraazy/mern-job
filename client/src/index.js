import React from 'react';
import ReactDOM from 'react-dom/client';
// to normalize all css
import "normalize.css"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context/appContext';
import { initialState } from "./context/reducer"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider initialState={initialState}>
      <App />
    </AppProvider>
  </React.StrictMode>
);


reportWebVitals();
