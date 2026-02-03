import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
// Ajuste o caminho abaixo conforme onde você salvou o arquivo de logs
// Se App.jsx está na raiz 'src', e loggers em 'src/utils', o caminho é './utils/loggers'
import { logEvent } from "./utils/loggers"; 

function App() {
  const location = useLocation();

  // --- ESPIÃO DE NAVEGAÇÃO ---
  // Esse useEffect roda toda vez que o usuário muda de página
  useEffect(() => {
    logEvent("NAV", `Navegou para: ${location.pathname}`);
  }, [location]);

  // --- LOG DE SISTEMA ---
  // Esse useEffect roda apenas 1 vez quando o site é aberto (F5)
  useEffect(() => {
    logEvent("SYSTEM", "Aplicação Inicializada");
  }, []);

  return (
    <>
      {/* O Outlet é o "buraco" mágico. 
         O React vai pegar o componente da rota filha (Login, Menu, etc.)
         e desenhar exatamente aqui dentro.
      */}
      <Outlet />
    </>
  );
}

export default App;