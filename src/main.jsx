import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Ecommerce from './App'
import {BrowserRouter as Router} from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Ecommerce/>
    </Router>
  </StrictMode>,
)