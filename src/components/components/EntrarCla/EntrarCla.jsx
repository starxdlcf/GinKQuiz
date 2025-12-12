import React from "react";
import { Link } from "react-router-dom";
import styles from "./EntrarCla.module.css";
import PerfilIcon from "../perfil/PerfilIcon.jsx";
import { supabase } from "../../../Supabase.jsx";

export const EntrarCla = () => {
  const [clas, setClas] = React.useState([]);
  const id = localStorage.getItem("userId");
  const [buscarClaNome, setBuscarClaNome] = React.useState("");
  const [buscarClaId, setBuscarClaId] = React.useState("");
  const [carregando, setCarregando] = React.useState(true);

  React.useEffect(() => {
    fetchClans();
  }, []);

  const fetchClans = async () => {
    try {
      setCarregando(true);

      let { data: clans, error } = await supabase.from("cla").select("*");

      if (error) throw error;
      setClas(clans);
    } catch (error) {
      alert(error.message);
    } finally {
      setCarregando(false);
    }
  };

  const handleBuscarClaNome = (e) => setBuscarClaNome(e.target.value);

  const handleBuscarClaId = (e) => setBuscarClaId(e.target.value);

  const resultadoNome = React.useMemo(() => {
    const pesquisa = (buscarClaNome || "").trim().toLowerCase();
    if (!pesquisa) return clas || [];
    return (clas || []).filter((cla) =>
      (cla.nome_cla || "").toLowerCase().includes(pesquisa)
    );
  }, [clas, buscarClaNome]);

  const resultadoId = React.useMemo(() => {
    const pesquisa = parseInt(buscarClaId.trim(), 10); // Converte para número
    if (isNaN(pesquisa)) return clas || []; // Se não for um número, retorna todos os clãs
    return (clas || []).filter((cla) => cla.id_cla === pesquisa); // Compara diretamente como número
  }, [clas, buscarClaId]);

  const enterCla = async (idCla) => {
    try {
      // buscar informações do clã e do usuário
      const [{ data: claData, error: claError }, { data: userData, error: userError }] = await Promise.all([
        supabase.from("cla").select("*").eq("id_cla", idCla).single(),
        supabase.from("usuarios").select("pontuacao_usuario").eq("id_usuario", id).single(),
      ]);

      if (claError) throw claError;
      if (userError) throw userError;

      const cla = claData;
      const usuario = userData;

      // verifica se o clã está cheio
      if (Number(cla.quantidade_atual_cla) >= Number(cla.quantidade_limite_cla)) {
        alert("Este clã já atingiu o número máximo de membros.");
        return;
      }

      // verifica requisito de pontos (usuário deve ter >= pontuacao_cla)
      const reqPontos = Number(cla.pontuacao_cla || 0);
      const pontosUser = Number(usuario.pontuacao_usuario || 0);
      if (pontosUser < reqPontos) {
        alert(`Você precisa de pelo menos ${reqPontos} pontos para entrar neste clã. Você tem ${pontosUser}.`);
        return;
      }

      // atualiza o usuário para entrar no clã
      const { error: updateError } = await supabase
        .from("usuarios")
        .update({ cla_usuario: idCla })
        .eq("id_usuario", id);

      if (updateError) throw updateError;

      // incrementa contador de membros do clã
      const { error: incError } = await supabase
        .from("cla")
        .update({ quantidade_atual_cla: Number(cla.quantidade_atual_cla || 0) + 1 })
        .eq("id_cla", idCla);

      if (incError) throw incError;

      alert("Você entrou no Clã com sucesso!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao entrar no clã");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headbox2}>
        <div className={styles.perfil}>
          <PerfilIcon />
        </div>
        <h1>Entre em um Clã</h1>
      </div>

      <div>
        <input
          id={styles.isearch}
          type="text"
          placeholder="Pesquisar por um Clã"
          onChange={handleBuscarClaNome}
          style={{ marginRight: "30px" }}
        />
        <input id={styles.isearch} style={{ width: "130px" }} 
        type="text" 
        onChange={handleBuscarClaId} 
        placeholder="#0000" />
      </div>

      {carregando ? (
        <p>Carregando Clãs...</p>
      ) : (
        <table className={`${styles.tabela} ${
          (buscarClaNome ? resultadoNome : resultadoId).length >= 10 
            ? styles.hasScroll 
            : ''
        }`}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Clã</th>
              <th>Membros</th>
              <th>Pontuação</th>
              <th aria-hidden="true"></th>
            </tr>
          </thead>
          <tbody className={`${styles.scrollableTable}`}>
            {(buscarClaNome ? resultadoNome : resultadoId).length > 0 ? (
              (buscarClaNome ? resultadoNome : resultadoId).map((clan) => (
                <tr key={clan.id_cla}>
                  <td>{`#${clan.id_cla}`}</td>
                  <td className={styles.nome_cla}>{clan.nome_cla}</td>
                  <td>
                    {clan.quantidade_atual_cla}/{clan.quantidade_limite_cla}
                  </td>
                  <td>{clan.pontuacao_cla}</td>
                  <td style={{ backgroundColor: "var(--yellow)" }}>
                    <button
                      className={styles.entrarButton}
                      onClick={() => {
                        enterCla(clan.id_cla);
                      }}
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <p>Nenhum resultado encontrado</p>
            )}
          </tbody>
        </table>
      )}

      <div>
        <Link to="criarcla">
          <button className={styles.criarButton}>Criar meu Clã</button>
        </Link>
      </div>
    </div>
  );
};
