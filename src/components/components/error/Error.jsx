import React, { use } from "react";
import styles from "./Erro.module.css";
import { useEffect } from "react";
import { useState } from "react";


const arrayPalavras = [
  "quiz",
  "jogo",
  "diversão",
  "matematica",
  "portugues",
  "quimica",
  "fisica",
  "historia",
  "geografia",
  "biologia",
  "computador",
  "programação",
  "desenvolvimento",
  "internet",
  "tecnologia",
  "ciência",
  "engenharia",
  "arte",
  "música",
  "literatura",
  "filosofia",
  "sociologia",
  "psicologia",
  "economia",
  "negócios",
  "marketing",
  "finanças",
  "empreendedorismo",
  "educação",
  "saúde",
  "esporte",
  "viagem",
  "mafagafos"
];
let palavraAleatoria =
arrayPalavras[Math.floor(Math.random() * arrayPalavras.length)];

export const Error = () => {
  const TEMPO_INICIAL = 7;
  
  const [game,setGame] = React.useState(false);

  const [seconds, setSeconds] = React.useState(TEMPO_INICIAL);

  const [running, setRunning] = React.useState(false);

  const [palavra, setPalavra] = React.useState("");

  const [pontos, setPontos] = React.useState(0);

  const palavraRef = React.useRef(null);

  const segundoRef = React.useRef(null);

useEffect(()=>{
  if(palavraRef.current){
    palavraRef.current.classList.remove(styles.bounce);
    void palavraRef.current.offsetWidth; // força reinício
    palavraRef.current.classList.add(styles.bounce);
  }}, [palavraAleatoria])
useEffect(()=>{
  if(segundoRef.current){
    segundoRef.current.classList.remove(styles.bounce);
    void segundoRef.current.offsetWidth; // força reinício
    segundoRef.current.classList.add(styles.bounce);
  }}, [seconds])


  useEffect(() => {
    let interval = null;
    if (running && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (running && seconds === 0) {
      alert(`Fim de jogo! Você fez ${pontos} pontos.`);
      setRunning(false);
      setGame(false);
    }
  return () => clearInterval(interval);
  
  },[pontos, seconds, running]);


  const handleChange = (event) => {
    setPalavra(event.target.value);
    console.log(event.target.value);

    if (event.target.value.length === palavraAleatoria.length) {
      if (event.target.value == palavraAleatoria) {
        setPontos((num)=> num+1);
        setSeconds((segundos) => segundos + 1);
        console.log('oioi')
      } else {
        console.log("erro");
      }
      palavraAleatoria =
      arrayPalavras[Math.floor(Math.random() * arrayPalavras.length)];
      setPalavra("");
    }
  };

  // const handlekey = (event) => {
  //   setPalavrasplit(palavrasplit => [...palavrasplit,event.key])
  //  setPalavra(event.key) 
  //   console.log(palavrasplit)
  // }

  const startGame = () => {
    setGame(true);
    setRunning(true);
    setSeconds(TEMPO_INICIAL);
    setPontos(0);
  }


  return (
    <div>
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

            {game ===true?
            <>
            <input
            className={styles.input}
                value={palavra}
                onChange={handleChange}
                type="text"
                name=""
                id=""
              />
  
              <h3 ref={palavraRef}>{palavraAleatoria}</h3>
              <h3 ref={segundoRef}>{pontos}</h3>
              <h3>Tempo restante:{seconds}</h3>
            
            </>
          : 
          <button onClick={startGame} >desafio das palavras</button>
          
          }
          </div>
        </div>
      </div>
    </div>
  );
};
