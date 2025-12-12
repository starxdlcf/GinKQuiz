import React from "react";
import { supabase } from "../../../Supabase";
import styles from "./Rankings.module.css";
import Perfil from "../perfil/PerfilIcon";
import { Link } from "react-router-dom";

export default function Rankings() {
  const [users, setUsers] = React.useState([]);
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [showTableUsers, setShowTableUsers] = React.useState(false);
  const [clas, setClas] = React.useState([]);
  const [showTableClas, setShowTableClas] = React.useState(true);
  const [quantidadePerguntasFiltro, setQuantidadePerguntasFiltro] =
    React.useState(null);
  const id = localStorage.getItem("userId");

  React.useEffect(() => {
    // Load rankings data here
    getClasbyPoints();
    // getUsersByPoints()
  }, [id]);

  React.useEffect(() => {
    if (quantidadePerguntasFiltro) {
      setFilteredUsers(
        users
          .filter((u) => u.perguntas_respondidas == quantidadePerguntasFiltro)
          .sort((a, b) => b.pontuacao_resultado - a.pontuacao_resultado)
      );
    } else {
      setFilteredUsers(users);
    }
  }, [quantidadePerguntasFiltro, users]);

  const getClasbyPoints = async () => {
    const { data, error } = await supabase
      .from("cla")
      .select("*")
      .order("pontuacao_cla", { ascending: false });

    if (error) {
      alert("Erro:", error);
      return;
    }

    setClas(data);

    console.log(data);
  };

  const getUsersByPoints = async () => {
    const { data, error } = await supabase
      .from("resultados")
      .select(
        "pontuacao_resultado, acertos_resultado, perguntas_respondidas, usuarios: usuario_id_resultado (nome_usuario)"
      )
      .order("pontuacao_resultado", { ascending: false });

    if (error) {
      console.log("Error fetching results:", error);
      return;
    }

    setUsers(data);
    setFilteredUsers(data);

    console.log(data);
  };

  //essa função é pra filtrar por um número x de questões, mas não temos uma coluna que armazene a quantidade de perguntas respondidas pelo usuário...
  const getUsersByXQuestions = async (quantidadePerguntasFiltro) => {
    const { data, error } = await supabase
      .from("resultados")
      .select(
        "pontuacao_resultado, acertos_resultado, perguntas_respondidas, usuarios: usuario_id_resultado (nome_usuario)"
      )
      .order("perguntas_respondidas" == quantidadePerguntasFiltro, {
        ascending: false,
      });

    if (error) {
      console.log("Error fetching results:", error);
      return;
    }

    setUsers(data);

    console.log(data);
  };

  const tableClas = () => {
    setShowTableClas(true);
    setShowTableUsers(false);

    getClasbyPoints();
  };

  const tableUsers = () => {
    setShowTableClas(false);
    setShowTableUsers(true);

    getUsersByPoints();
  };

  return (
    <div className={styles.rankingsContainer}>
      {/* remover esse botao depois */}
      {/* <button
        onClick={(e) => {
          e.preventDefault(), getUsersByPoints();
        }}
      >
        Mostrar Data
      </button> */}
      <div className={styles.rankingsBody}>
        <div className={styles.cabecalho}>
          <h1>Rankings</h1>

          <Perfil id={styles.profile} />
        </div>

        <div className={styles.rankingsContent}>
          <div id={styles.buttonsFilterTable}>
            <button
              id={
                showTableClas
                  ? styles.buttonsFilterTableUse
                  : styles.buttonsFilterTableNoUse
              }
              onClick={tableClas}
            >
              Top Clãs
            </button>
            <button
              id={
                showTableUsers
                  ? styles.buttonsFilterTableUse
                  : styles.buttonsFilterTableNoUse
              }
              onClick={tableUsers}
            >
              Top Usuários
            </button>
          </div>

          <div className={styles.tabelaRankings}>
            <table
              id={showTableClas ? styles.mostrarTabela : styles.esconderTabela}
              className={clas.length > 10 ? styles.scrollTable : ""}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Clã</th>
                  <th>Membros</th>
                  <th>Pontuação</th>
                </tr>
              </thead>
              <tbody>
                {clas.map((cla, index) => (
                  <tr key={cla.createdAt}>
                    <td>{index + 1}</td>
                    <td>{cla.nome_cla}</td>
                    <td>
                      {cla.quantidade_atual_cla}/{cla.quantidade_limite_cla}
                    </td>
                    <td>{cla.pontuacao_cla}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table
              id={showTableUsers ? styles.mostrarTabela : styles.esconderTabela}
              className={filteredUsers.length > 10 ? styles.scrollTable : ""}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Usuário</th>
                  <th>Perguntas</th>
                  <th>Pontuação</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id_resultado || index}>
                    <td>{index + 1}</td>
                    <td>{user.usuarios?.nome_usuario || "N/A"}</td>
                    <td>{`${user.perguntas_respondidas}`}</td>
                    <td>{user.pontuacao_resultado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.rodape}>
          <button>
            <Link to={"/menu"}>Ir ao Menu</Link>
          </button>

          <select
            onChange={(e) => setQuantidadePerguntasFiltro(e.target.value)}
            id={showTableUsers ? styles.selectShow : styles.selectNone}
          >
            <option value="">Todos</option>
            <option value="10">10 perguntas</option>
            <option value="20">20 perguntas</option>
            <option value="30">30 perguntas</option>
          </select>

          {/* <button>
            <Link to={""}>Ir ao Login</Link>
          </button> */}
        </div>
      </div>
    </div>
  );
}
