import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { GlobalContextProvider } from './context/GlobalContext.jsx'
import { ProcessContextProvider } from './context/ProcessContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <GlobalContextProvider>
      <AuthContextProvider>
        <ProcessContextProvider>
          <App />
        </ProcessContextProvider>
      </AuthContextProvider>
    </GlobalContextProvider>
  
)
