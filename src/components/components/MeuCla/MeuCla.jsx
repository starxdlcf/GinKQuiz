import { supabase } from "../../../Supabase";
import React from "react";
import PerfilIcon from "../perfil/PerfilIcon";
import styles from "../MeuCla/MeuCla.module.css";
import { Column } from "@ant-design/plots";
import { colors } from "@mui/material";

export default function MeuCla() {
  const [idCla, setIdCla] = React.useState(null);
  const [idUsuario, setIdUsuario] = React.useState(null);
  const [nomeUser, setNomeUser] = React.useState("");
  const [pontosUser, setPontosUser] = React.useState(null);
  const [infoCla, setInfoCla] = React.useState([]);
  const [infoMembersCla, setInfoMembersCla] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showGrafico, setShowGrafico] = React.useState(false);
  const id = localStorage.getItem("userId");

  let arrayDeUsers = [];

  React.useEffect(() => {
    setLoading(true);
    if (id) catchIdCla(id);
  }, [id]);

  React.useEffect(() => {
    if (idCla) {
      catchInfoCla(idCla);
      catchInfoMembersCla(idCla);
    }
  }, [idCla]);

  const QuitCla = async (idPessoa) => {
    try{
      const { data, error} = await supabase 
      .from("usuarios")
      .update({
        cla_usuario: null
      })
      .eq("id_usuario", idPessoa);

      
      if (error) throw error;
      
      alert("Você saiu do clã")
      window.location.reload()

    } catch (error) {
      alert(error.message);
    }
  }

  const catchIdCla = async (idUser) => {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id_usuario", idUser)
        .single();

      if (error) throw error;

      setIdCla(data.cla_usuario);
      setNomeUser(data.nome_usuario);
      setPontosUser(data.pontuacao_usuario);
      setIdUsuario(data.id_usuario);
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
        .single();

      if (error) throw error;

      setInfoCla(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const catchInfoMembersCla = async (id_claUsuario) => {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("cla_usuario", id_claUsuario);

      if (error) throw error;

      setInfoMembersCla(data || []);

      for (let i = 0; infoMembersCla.length < i; i++) {
        DemoCustomSingleColor(nomeUser, pontosUser);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const DemoCustomSingleColor = (x, y) => {
    return null;
  };

  return (
    <div className={styles.box}>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div id={styles.all}>
          <div className={styles.global}>
            <div className={styles.perfilbar}>
              <p id={styles.bar}></p>
              <PerfilIcon id={styles.perfil} />
            </div>
            <div className={styles.header}>
              <div className={styles.namedesc}>
                <h1>{infoCla?.nome_cla || ""}</h1>
                <p>Descrição:</p>
                <h2>{`${infoCla?.descricao_cla || ""}`}</h2>
              </div>
              <p id={styles.howmanymembers}>
                {infoCla?.quantidade_atual_cla || 0}/
                {infoCla?.quantidade_limite_cla || 0}
              </p>
            </div>
            <div className={styles.body}>
              <div className={styles.points}>
                <h2>Pontuação do Clã</h2>
                <p id={styles.pontoscla}>{`${infoCla?.pontuacao_cla ?? 0}`}</p>
                <button className={styles.button} id={styles.rankposition}>
                  Posição no Ranking
                </button>
              </div>
              <div className={styles.tableuser}>
                <div className={styles.infouser}>
                  <div className={styles.user}>
                    <p>{`${nomeUser} (você)`}</p>
                    <p>{`${pontosUser}`}</p>
                  </div>
                  <div className={styles.botoes}>
                    <button 
                      className={styles.button} 
                      id={styles.graph}
                      onClick={() => setShowGrafico(!showGrafico)}
                    >
                      Gráfico
                    </button>
                    <button className={styles.button} onClick={(e) => {e.preventDefault(),QuitCla(id)}} id={styles.quit}>
                      Sair do Clã
                    </button>
                  </div>
                </div>
                <table className={`${styles.tabela}`}>
                  <thead>
                    <tr>
                      <th className={styles.member}>Membro</th>
                      <th className={styles.pointsbymember}>Pontuação</th>
                      {/* <th>Streak</th> implementar foguinho ass: anna*/}
                    </tr>
                  </thead>
                  <tbody className={`${styles.scrollableTable}`}>
                    {infoMembersCla.map((member) => (
                      <tr key={member.created_at}>
                        <td>{`#${member.nome_usuario}`}</td>
                        <td>{member.pontuacao_usuario}</td>
                        {/* <td>foguinho</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {showGrafico && (
            <div className={styles.grafico}>
              <button 
                onClick={() => setShowGrafico(false)}
                className={styles.closeButton}
              >
                ×
              </button>

              <h2>{`Pontuações dos membros do Clã ${infoCla?.nome_cla || ""} `}</h2>

              {/** Build chart data from members */}
              {(() => {
                const chartData = infoMembersCla.map((m) => ({
                  user: m.nome_usuario || "Usuário",
                  responses: Number(m.pontuacao_usuario) || 0,
                }));

                // Ensure current user is present (nomeUser, pontosUser)
                if (nomeUser && !chartData.some((c) => c.user === nomeUser)) {
                  chartData.unshift({
                    user: nomeUser,
                    responses: Number(pontosUser) || 0,
                  });
                }

                const columnConfig = {
                  data: chartData,
                  xField: "user",
                  yField: "responses",
                  height: 400,
                  padding: "auto",
                  marginTop: 50,
                };

                return chartData.length > 0 ? (
                  <Column {...columnConfig} />
                ) : (
                  <p>Sem dados suficientes para a construção do gráfico...</p>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
