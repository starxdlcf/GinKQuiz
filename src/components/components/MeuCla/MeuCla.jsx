<<<<<<< Updated upstream
import { supabase } from "../../../Supabase";
import React from "react";
import { GlobalContext } from "../../../context/GlobalContext";
=======
>>>>>>> Stashed changes
import PerfilIcon from "../perfil/PerfilIcon";

export default function MeuCla() {
  const [idCla, setIdCla] = React.useState(null);
  const [infoCla, setInfoCla] = React.useState(undefined);
  const [loading, setLoading] = React.useState(true);
  const { id } = React.useContext(GlobalContext);

  React.useEffect(() => {
    setLoading(true);
    catchIdCla(id);
  }, []);

  React.useEffect(() => {
    if (idCla){
      catchInfoCla(idCla)
    }
  }, [idCla]);

  const catchIdCla = async (idUser) => {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id_usuario", idUser)
        .single();

      if (error) throw error;

      setIdCla(data.cla_usuario);
      
    } catch (error) {
      alert(error.message);
    }
  };

  const catchInfoCla = async (id_cla) => {
    try {
      const { data, error } = await supabase
        .from("cla")
        .select("*")
        .eq("id_cla", id_cla)
        .single()

      if (error) throw error;

      setInfoCla(data);
      
    } catch (error) {
      alert(error.message);
    }
    finally{
      setLoading(false)
    }

  };

  return (
    <>
<<<<<<< Updated upstream
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div >
          <PerfilIcon />
          </div>
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
      ) }
=======
    <PerfilIcon></PerfilIcon>

    <h1>brr brr patapim</h1>
    <div>
      <h2>Meu Clã</h2>
      <div>
        <p>Informações do clã aqui</p>
      </div>
    </div>
>>>>>>> Stashed changes
    </>
  );
}