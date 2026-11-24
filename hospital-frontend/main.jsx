import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.9/dist/css/bootstrap.min.css';
import '	https://cdn.jsdelivr.net/npm/bootstrap@5.3.9/dist/js/bootstrap.bundle.min.js' ;
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
