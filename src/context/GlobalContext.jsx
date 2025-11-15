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
