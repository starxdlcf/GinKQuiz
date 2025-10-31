import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import { Login } from "./components/components/login/Login.jsx"
import { Cadastro } from './components/components/cadastro/Cadastro.jsx'
import { MenuInicial } from './components/components/menuInicial/MenuInicial.jsx'
const router = createBrowserRouter([
  
  {
    path: "/", 
    element: <Login />
  },
  {
    path: "/menu",
    element: <MenuInicial/>
  },
  {
    path:'cadastro',
    element:<Cadastro/>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
