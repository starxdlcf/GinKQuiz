
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./EntrarCla.module.css";
import PerfilIcon from "../perfil/PerfilIcon";
import { supabase } from "../../../Supabase";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext.jsx";


export const EntrarCla = () => {

  const [data, setData] = React.useState(null);
  
  const { id, setId } = useContext(GlobalContext);
  
  const [descripition, setDescription] = React.useState(false);


  const handleFilter = async (e) => {
      // const filter = e.target.value;
      // const filteredData = data.filter((clan) =>
      //   clan.nome_equipe.toLowerCase().includes(filter.toLowerCase())
      // );
      // setData(filteredData);

  const EnterCla = async (x) => {
      // alert("Solicitação de entrada enviada ao líder do Clã!");
      console.log(x);
      const { error } = await supabase
        .from("usuarios")
        .update({"equipe_usuario": x})
        .eq("id_usuario", id);
      // console.log(data);
  
      if (error) {
        console.log(error);
        console.log('vc e burro')
      } else {
        alert("Você entrou no Clã com sucesso!");
        const { data } = await supabase
        .from('cla')
        .select('*')
        .eq('id_equipe', x)
        .single();
        
        data.quantidade_atual_equipe += 1;
      }
      
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
                <tr key={clan.id_equipe} >
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
}}}