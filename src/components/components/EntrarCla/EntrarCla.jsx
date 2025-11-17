
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./EntrarCla.module.css";

export const EntrarCla = () => {
  const handleFilter = async (e) => {
      // const filter = e.target.value;
      // const filteredData = data.filter((clan) =>
      //   clan.nome_equipe.toLowerCase().includes(filter.toLowerCase())
      // );
      // setData(filteredData);
      
  return (
    <div>
      <div className={styles.headbox2}>
          <div className={styles.perfil}>
            <PerfilIcon />
          </div>
          <h1>Entre em um Clã</h1>
        </div>
        <div>
          <input
            type="text"
            placeholder="Pesquisar por um Clã"
            onChange={handleFilter}
            style={{marginRight: "30px"}}
          />
          <input style={{width: "130px"}} type="text" placeholder="#0000" />
        </div>

        <table className={`${styles.tabela}`} >
          <thead>
            <tr>
              <th>Clã</th>
              <th>Id</th>
              <th>Membros</th>
              <th>Pontuação</th>
            </tr>
          </thead>
            <tbody className={`${styles.scrollableTable}`}>
            {data &&
              data.map((clan) => (
                <tr key={clan.id_equipe} onClick={ClaDescription} >
                  <td className={styles.nome_equipe} key={clan.nome_equipe} >{clan.nome_equipe}</td>
                  <td key={clan.id_equipe}>{`#${clan.id_equipe}`}</td>
                  <td key={clan.quantidade_atual_equipe}>
                    {clan.quantidade_atual_equipe}/
                    {clan.quantidade_limite_equipe}
                  </td>
                  <td key={clan.pontuacao_equipe}>{clan.pontuacao_equipe}</td>
                  {descripition && <td key={clan.descricao_equipe}>{clan.descricao_equipe}</td>}
                  <td style={{backgroundColor: "var(--yellow)"}} key={clan.created_at}>
                    <button
                      className={styles.entrarButton}
                      onClick={() => {
                        EnterCla(clan.id_equipe);
                      }}
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div>
          <button className={styles.criarButton}><Link to="criarcla">Criar Meu Clã</Link></button>
        </div>
    </div>
  )
}}

// import { Box, Button } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// import RankingClas from "../../../assets/icons/rankingclasicon.png";
// import Google from "../../../assets/icons/googleicon.png";

// import { supabase } from "../../../supabaseClient";
// import { GlobalContext } from "../../../context/GlobalContext";

// export const EntrarCla = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [senha, setSenha] = useState("");
//   const [visivel, setVisivel] = useState(false);

//   const handleNavigate = () => {
//     navigate("/menuinicial");
//   };}}