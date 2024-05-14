import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthContextProvider } from './context/AuthContext.jsx'
import { GlobalContextProvider } from './context/GlobalContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <GlobalContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </GlobalContextProvider>
  
)
