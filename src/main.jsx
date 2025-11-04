import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import { Login } from "./components/components/login/Login.jsx"
import { Cadastro } from './components/components/cadastro/Cadastro.jsx'
import { Error } from './components/components/error/Error.jsx'
import { MenuInicial } from './components/components/menuInicial/MenuInicial.jsx'
const router = createBrowserRouter([
  
  {
    path: "/",
    errorElement: <Error/>, 
    element: <Login />
  },
  {
    path: "/menu",
    element: <MenuInicial/>
  },
  {
    path:'cadastro',
    element:<Cadastro/>
  },
  {
    path:'/entrarcla',
    element:<Cadastro/>
  },
  {
    path:'/cla',
    element:<Cadastro/>
  },
  {
    path:'/iniciar',
    element:<Cadastro/>
  },
  {
    path:'/jogar',
    element:<Cadastro/>
  },
  {
    path:'/concluido',
    element:<Cadastro/>
  },
  {
    path:'/ranking',
    element:<Cadastro/>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
