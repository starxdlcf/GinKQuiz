import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// IMPORTANTE: Importe o App que acabamos de modificar
import App from "./App.jsx"; 

// Seus imports de componentes continuam iguais
import { Login } from "./components/components/login/Login.jsx";
import { Cadastro } from "./components/components/cadastro/Cadastro.jsx";
import { Error } from "./components/components/error/Error.jsx";
import { MenuInicial } from "./components/components/menuInicial/MenuInicial.jsx";
import { Jogar } from "./components/components/jogar/Jogar.jsx";
import Perfil from "./components/components/perfil/Perfil.jsx";
import CriarCla from "./components/components/criarCla/CriarCla.jsx";
import Termos from "./components/components/TermosDeUso/Termos.jsx";
import Gerenciamento from "./components/components/gerenciamento/Gerenciamento.jsx";
import Rankings from "./components/components/rankings/Rankings.jsx";
import { LoginGoogle } from "./components/components/loginGoogle/LoginGoogle.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import CriarPergunta from "./components/components/criarPergunta/CriarPergunta.jsx";
import Pergunta from "./components/components/Perguntas/Pergunta.jsx";
import PerguntaEdit from "./components/components/PerguntaEdit/PerguntaEdit.jsx";
import Lobby from "./components/components/lobby/Lobby.jsx";
import TelaFinal from "./components/components/telaFinal/TelaFinal.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // <--- O App agora envolve tudo!
    errorElement: <Error />, // O Error fica no nível global
    children: [
      // --- TODAS AS SUAS ROTAS AGORA SÃO FILHAS DO APP ---
      // Quando o caminho for "/", o App carrega e joga o Login no Outlet
      {
        path: "/", 
        element: <Login />,
      },
      {
        path: "/menu",
        element: <MenuInicial />,
      },
      {
        path: "gerenciamento",
        element: <Gerenciamento />,
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
        path: "jogar/:idPergunta",
        element: <Jogar />,
      },
      {
        path: "/concluido",
        element: <Cadastro />,
      },
      {
        path: "perfil",
        element: <Perfil />,
      },
      {
        path: "menu/criarCla",
        element: <CriarCla />,
      },
      {
        path: "/rankings",
        element: <Rankings />,
      },
      {
        path: "termos",
        element: <Termos />,
      },
      {
        path: "loginGoogle",
        element: <LoginGoogle />,
      },
      {
        path: "CriarPergunta",
        element: <CriarPergunta />,
      },
      {
        path: "pergunta/:id",
        element: <Pergunta />,
      },
      {
        path: "pergunta/edit/:id",
        element: <PerguntaEdit />,
      },
      {
        path: "lobby",
        element: <Lobby />,
      },
      {
        path: "final",
        element: <TelaFinal />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="89096649826-sp14cdkef28o7ign6tta2musnvftvbmj.apps.googleusercontent.com">
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </GoogleOAuthProvider>
);