import { supabase } from "../../../Supabase";
import React from "react";
import { GlobalContext } from "../../../context/GlobalContext";

export default function MeuCla() {
  const [idCla, setIdCla] = React.useState("");
  const [infoCla, setInfoCla] = React.useState({});
  const { idUsuario } = React.useContext(GlobalContext);

  React.useEffect(() => {
    if (idUsuario) {
      catchIdCla(idUsuario);
    }
  }, [idUsuario]);

  React.useEffect(() => {
    if (idCla) {
      catchInfoCla(idCla);
    }
  }, [idCla]);

  const catchIdCla = async (idUser) => {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("cla_usuario")
        .eq("id_usuario", idUser);

      if (error) throw error;

      if (data && data.length > 0) {
        setIdCla(data[0].cla_usuario); // Acesse o primeiro elemento do array
      } else {
        throw new Error("No cla_usuario found for the given id_usuario");
      }
    } catch (error) {
      console.error("Error fetching idCla:", error.message);
      alert("Failed to fetch idCla. Please try again.");
    }
  };

  const catchInfoCla = async (id_cla) => {
    try {
      const { data, error } = await supabase
        .from("cla")
        .select("*")
        .eq("id_cla", id_cla);

      if (error) throw error;

      if (data && data.length > 0) {
        setInfoCla(data[0]); // Acesse o primeiro elemento do array
      } else {
        throw new Error("No data found for the given id_cla");
      }
    } catch (error) {
      console.error("Error fetching infoCla:", error.message);
      alert("Failed to fetch infoCla. Please try again.");
    }
  };

  return (
    <>
      {infoCla.nome_cla ? (
        <>
          <h1>{infoCla.nome_cla}</h1>
          <div>
            <h2>{infoCla.descricao_cla}</h2>
            <div>
              <p>
                {infoCla.quantidade_atual_cla}/{infoCla.quantidade_limite_cla}
              </p>
              <p>{infoCla.pontuacao_cla}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Carregando...</p> // Mostra um estado de carregamento enquanto infoCla não está disponível
      )}
    </>
  );
}