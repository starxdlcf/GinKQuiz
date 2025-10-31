import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import { Login } from "./components/components/login/Login.jsx"

const router = createBrowserRouter([
  
  {
    path: "/", 
    element: <Login />
  },
  {
    path: "/home",
    element: <App />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
