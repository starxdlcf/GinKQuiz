import React from "react";
import styles from "./MenuInicial.module.css";

export const MenuInicial = () => {
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
            <tr>
              <td>Megamentes #1222</td>
              <td>46/55</td>
              <td>30</td>
            </tr>
            <tr>
              <td>UTFPR #1</td>
              <td>40/55</td>
              <td>100</td>
            </tr>
            <tr>
              <td>Equipe Rocket #15</td>
              <td>32/55</td>
              <td>0</td>
            </tr>
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
