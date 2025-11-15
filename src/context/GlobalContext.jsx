// isso aqui serve para pega or o id do usuario logado em qualquer componente
// e evitar de ter que passar por props toda hora
//como funciona eu ainda nn sei direito mas ta funcionando

import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [id, setId] = useState(null);

  return (
    <GlobalContext.Provider value={{ id, setId }}>
      {children}
    </GlobalContext.Provider>
  );
};
