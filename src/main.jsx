import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./components/components/login/Login.jsx";
import { Cadastro } from "./components/components/cadastro/Cadastro.jsx";
import { Error } from "./components/components/error/Error.jsx";
import { MenuInicial } from "./components/components/menuInicial/MenuInicial.jsx";
import { Jogar } from "./components/components/jogar/Jogar.jsx";
import Perfil from "./components/components/perfil/Perfil.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import CriarCla from "./components/components/criarCla/CriarCla.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Login />,
  },
  {
    path: "/menu",
    element: <MenuInicial />,
  },
  {
    path: "cadastro",
    element: <Cadastro />,
  },
  {
    path: "/iniciar",
    element: <Cadastro />,
  },
  {
    path: "/jogar",
    element: <Jogar />,
  },
  {
    path: "/concluido",
    element: <Cadastro />,
  },
  {
    path: "menu/perfil",
    element: <Perfil />,
  },
  {
    path:"menu/criarCla",
    element:<CriarCla/>,
  },
  {
    path:"menu/rankings",
    element:<Cadastro/>,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </StrictMode>
);
