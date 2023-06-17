import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { SearchContextProvider } from './context/SearchContext.jsx'
import { ThemeContextProvider } from './context/ThemeContext.jsx'
import './index.css'

const client = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <SearchContextProvider>
      <ThemeContextProvider>
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </ThemeContextProvider>
    </SearchContextProvider>
  </QueryClientProvider>
)
