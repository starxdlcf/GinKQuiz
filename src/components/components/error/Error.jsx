import React from "react";
import styles from "./Erro.module.css";
import { useEffect } from "react";
import { useState } from "react";


const arrayPalavras = [
  "quiz",
  "jogo",
  "diversao",
  "matematica",
  "portugues",
  "quimica",
  "fisica",
];
let palavraAleatoria =
arrayPalavras[Math.floor(Math.random() * arrayPalavras.length)];

export const Error = () => {
  const [palavrasplit,setPalavrasplit] = useState([]);

  const [palavra, setPalavra] = React.useState("");

  const [pontos, setPontos] = React.useState(0);

useEffect(()=>{
  document.addEventListener('keydown',handlekey)
  
  return () =>{
    document.removeEventListener('keydown', handlekey)
  }
},[])

  const handleChange = (event) => {
    setPalavra(event.target.value);
    console.log(event.target.value);

    if (event.target.value.length === palavraAleatoria.length) {
      if (event.target.value == palavraAleatoria) {
        setPontos((num)=> num+1);
        console.log('oioi')
      } else {
        console.log("erro");
      }
      palavraAleatoria =
      arrayPalavras[Math.floor(Math.random() * arrayPalavras.length)];
      setPalavra("");
    }
  };

  const handlekey = (event) => {
    setPalavrasplit(palavrasplit => [...palavrasplit,event.key])
   setPalavra(event.key) 
    console.log(palavrasplit)
  }


  return (
    <div onKeyDown={handlekey}>
      <div className={styles.paginaErro} >
        <h1>Erro 404</h1>

        <div className={styles.container}>
          <div className={styles.boxContent}>
            <h2>Página não encontrada</h2>
            <h2>
              Por que ao inves de futricar, você não vai jogar um quiz
              divertido?
            </h2>
            <h2>Ou se quiser jogar outra coisa</h2>
            <input
              className={styles.input}
              value={palavra}
              onChange={handleChange}
              type="text"
              name=""
              id=""
            />
            <h3>{palavraAleatoria}</h3>
            <h3>{pontos}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
