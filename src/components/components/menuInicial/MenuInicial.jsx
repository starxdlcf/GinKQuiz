import React, { use } from "react";
import styles from "./MenuInicial.module.css";
import {supabase} from "../../../Supabase";

import { GlobalContext } from "../../../context/GlobalContext";
import { useContext } from "react";


export const MenuInicial = () => {

  const [data,setData] = React.useState(null);

  const { id, setId } = useContext(GlobalContext);

  React.useEffect(() => {
    showClanInfo();
  }, []); 

  const showClanInfo = async() => {
    const {data,error} = await supabase
    .from('cla')
    .select('*')
    console.log(data);
    setData(data);

    if(error){
      console.log(error);
    }
  }

  const handleFilter = async (e) => {
    // const filter = e.target.value;
    // const filteredData = data.filter((clan) =>
    //   clan.nome_equipe.toLowerCase().includes(filter.toLowerCase())
    // );
    // setData(filteredData);

    console.log(e.target.value);

    const {data , error} = await supabase
    .from('cla')
    .select('*')
    .ilike('nome_equipe', `${e.target.value}%`)
    setData(data);

    if(error){
      console.log(error);
    }
  }

const showId = () => {
  console.log(id);
}

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <h1>GinKQuiz</h1>

        <button>Jogar</button>
        <button>Rankings</button>
      </div>
      <div className={styles.box2}>
        <h1>Entre em um Clã</h1>
        <div>
          <input type="text" placeholder="Pesquisar por um Clã"
          onChange={handleFilter} />
          <input type="text" placeholder="#0000" />
        </div>

        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Clã</th>
              <th>Membros</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((clan) => (
              <tr key={clan.id}>
                <td key={clan.nome_equipe}>{clan.nome_equipe}</td>
                <td key={clan.quantidade_atual_equipe}>{clan.quantidade_atual_equipe}/{clan.quantidade_limite_equipe}</td>
                <td key={clan.pontuacao_equipe}>{clan.pontuacao_equipe}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <button  onClick={showId}>Entrar</button>
          <button>Visitar Clã</button>
        </div>
      </div>
    </div>
  );
};
