import React from "react";
import { supabase } from "../../../Supabase";
import styles from "./Rankings.module.css";
import Perfil from "../perfil/PerfilIcon";
import { Link } from "react-router-dom";

export default function Rankings() {
  const [users, setUsers] = React.useState([]);
  const [showTableUsers, setShowTableUsers] = React.useState(false);
  const [clas, setClas] = React.useState([]);
  const [showTableClas, setShowTableClas] = React.useState(true);
  const id = localStorage.getItem("userId");

  React.useEffect(() => {
    // Load rankings data here
    getClasbyPoints();
    // getUsersByPoints()
  }, [id]);

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
      .from("usuarios")
      .select("*")
      .order("pontuacao_usuario", { ascending: false });

    if (error) {
      console.log("Error fetching users:", error);
      return;
    }

    setUsers(data);

    console.log(data);
  };

  //essa função é pra filtrar por um número x de questões, mas não temos uma coluna que armazene a quantidade de perguntas respondidas pelo usuário...
  const getUsersByXQuestions = async () => {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .order("pontuacao_usuario");

    if (error) {
      console.log("Error fetching users:", error);
      return;
    }

    setUsers(data);

    console.log(data);
  };

  const tableClas = () => {
    setShowTableClas(true);
    setShowTableUsers(false);

    getClasbyPoints()
  };

  const tableUsers = () => {
    setShowTableClas(false);
    setShowTableUsers(true);

    getUsersByPoints()
  };

  return (
    <div className={styles.rankingsContainer}>
      {/* remover esse botao depois */}
      <button
        onClick={(e) => {
          e.preventDefault(), getUsersByPoints();
        }}
      >
        Mostrar Data
      </button>
      <div className={styles.rankingsBody}>
        <div className={styles.cabecalho}>
          <h1>Rankings</h1>

          <Perfil id={styles.profile} />
        </div>

        <div className={styles.rankingsContent}>
          <div id={styles.buttonsFilterTable}>
            <button id={showTableClas ? styles.buttonsFilterTableUse : styles.buttonsFilterTableNoUse} onClick={tableClas}>Top Clãs</button>
            <button id={showTableUsers ? styles.buttonsFilterTableUse : styles.buttonsFilterTableNoUse} onClick={tableUsers}>Top Usuários</button>
          </div>

          <div className={styles.tabelaRankings}>
            <table
              id={showTableClas ? styles.mostrarTabela : styles.esconderTabela}
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
                {users.map((user, index) => (
                  <tr key={user.createdAt}>
                    <td>{index + 1}</td>
                    <td>{user.nome_usuario}</td>
                    <td>{user.perguntas_respondidas}</td>
                    <td>{user.pontuacao_usuario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.rodape}>
          <button><Link to={"/menu"}>Ir ao Menu</Link></button>

          <select id={showTableUsers ? styles.selectShow : styles.selectNone}>Filtrar por</select>

          <button><Link to={""}>Ir ao Login</Link></button>
        </div>
      </div>
    </div>
  );
}
