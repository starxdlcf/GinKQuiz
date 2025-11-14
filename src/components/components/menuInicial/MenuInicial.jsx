import React, { use } from "react";
import styles from "./MenuInicial.module.css";
import {supabase} from "../../../Supabase";

export const MenuInicial = () => {

  const [data,setData] = React.useState(null);

  React.useEffect(() => {
    showClanInfo();
  }, []); 

  const showClanInfo = async() => {
    const {data,error} = await supabase
    .from('cla')
    .select('*')
    console.log(data);
    setData(data);
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
          <input type="text" placeholder="Pesquisar por um Clã" />
          <input type="text" placeholder="#0000" />
        </div>

        <table>
          <thead>
            <tr>
              <th>Clã</th>
              <th>Membros</th>
              <th>Pontuação minima</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((clan) => (
              <tr key={clan.id}>
                <td key={clan.nome_cla}>{clan.nome_cla}</td>
                <td key={clan.}>{clan.membros}</td>
                <td>{clan.pontuacao_minima}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <button>Entrar</button>
          <button>Visitar Clã</button>
        </div>
      </div>
    </div>
  );
};
