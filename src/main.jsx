import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Ecommerce from './App'
import { AuthProvider } from "./contexts/AuthContext";
import {BrowserRouter as Router} from 'react-router-dom'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <Ecommerce />
      </AuthProvider>
    </Router>
  </StrictMode>
);