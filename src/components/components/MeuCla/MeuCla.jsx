import { supabase } from "../../../Supabase";
import React from "react";
import PerfilIcon from "../perfil/PerfilIcon";
import styles from "../MeuCla/MeuCla.module.css"

export default function MeuCla() {
  const [idCla, setIdCla] = React.useState(null);
  const [infoCla, setInfoCla] = React.useState(undefined);
  const [infoMembersCla, setInfoMembersCla] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const id = localStorage.getItem("userId");

  React.useEffect(() => {
    setLoading(true);
    if (id) catchIdCla(id);
  }, [id]);

  React.useEffect(() => {
    if (idCla){
      catchInfoCla(idCla);
      catchInfoMembersCla(idCla)
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

  const catchInfoMembersCla = async (id_claUsuario) => {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("cla_usuario", id_claUsuario)

      if (error) throw error;

      setInfoMembersCla(data || []);
    
    } catch (error) {
      alert(error.message);
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className={styles.box}>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className={styles.perfilbar}>
          <PerfilIcon id={styles.perfil} />
          <hr id={styles.bar} />
          </div>
          <div className={styles.header}>
            <div className={styles.namedesc}>
              <h1>{infoCla?.nome_cla || ""}</h1>
              <h2>{infoCla?.descricao_cla || ""}</h2>
            </div>
            <p>
                {infoCla?.quantidade_atual_cla || 0}/{infoCla?.quantidade_limite_cla || 0}
              </p>
          </div>
            <div className={styles.body}>
              <table className={`${styles.tabela}`}>
                <thead>
                  <tr>
                    <th>Membro</th>
                    <th>Pontuação</th>
                    {/* <th>Streak</th> implementar foguinho ass: anna*/}
                  </tr>
                </thead>
                <tbody className={`${styles.scrollableTable}`}>
                  {infoMembersCla.map((member) => (
                    <tr key={member.id_claUsuario}>
                      <td>{`#${member.nome_usuario}`}</td>
                      <td>{member.pontuacao_usuario}</td>
                      <td>
                        {/* foguinho */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.points}>
                <p>{infoCla.pontuacao_cla}</p>
              </div>

            </div>
        </>
      ) }
    </div>
  );
}