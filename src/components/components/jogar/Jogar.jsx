import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../Supabase";
import { useNavigate } from "react-router-dom";
import styles from "./Jogar.module.css"

export const Jogar = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [dataPergunta, setDataPergunta] = React.useState(null);
  const [dica,setDica] = React.useState("")
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    fetchPergunta(id)
  }, [id]); 

  const fetchPergunta = async (id) => {
    try{
      const { data,error } = await supabase
      .from("perguntas")
      .select("*")
      .eq("id_pergunta", id)
      .single();
      
      if (error) throw error

      setDataPergunta(data)
      
    }
    catch(error){
      console.log(error)
      alert(error.message)
    }
  };

  const verificarResposta = async(escolha)=>{
    try{
      const {data, error} = await supabase
      .from("perguntas")
      .select("*")
      .eq("resposta_pergunta", escolha)
      
      if (error) throw error

      if (data != ""){
        somarPontos()
        alert("acertou")
        setOpen(false)
        navigate(`/jogar/${Math.floor((Math.random()*40)+1)}`)
      }
      else {
        alert("errou")
        setOpen(false)
        navigate(`/jogar/${Math.floor((Math.random()*40)+1)}`)
      }

    }
    catch (error){
      console.error(error)
      alert(error.message)
    }
  }

  const somarPontos= ()=>{
    const pontos = Number(localStorage.getItem("pontos"))
    const pontosAtualizados = pontos+50
    localStorage.setItem("pontos",pontosAtualizados)
    console.log("pontos Atuais", pontosAtualizados)
  }

  const fetchDicas = async()=>{
    if (!open){
      try{        
        const {data, error}= await supabase
        .from("dicas")
        .select("*")
        .eq("pergunta_dica",id)
  
        if (error) throw error
  
        const dicas = data
  
        const aleatorio =  dicas[Math.floor((Math.random()*dicas.length))]
        setDica(aleatorio)
      }
      catch (error){
        console.error(error)
        alert(error.message)
      }
    }
  }

  const finalizarQuiz = ()=>{
    const fim = Date.now()
    const inicio = Number(localStorage.getItem("inicioQuiz"))
    const tempoSeg = (fim - inicio)/1000
    const minutos = Math.floor(tempoSeg / 60);
    const segundos = Math.floor(tempoSeg % 60);

    alert(`Seu tempo = ${minutos}:${segundos}, sua pontuação = ${localStorage.getItem("pontos")}`)

    localStorage.clear("inicioQuiz")
    localStorage.clear("pontos")
  }
  
return (
    <>
      {dataPergunta ? (
        <div>
          <>
            <h2>{dataPergunta.enunciado_pergunta}</h2>
            <div>
              <button className={styles.alternativa} onClick={
                (e)=>{ e.preventDefault(); verificarResposta(dataPergunta.alternativa1_pergunta)}} >
                {dataPergunta.alternativa1_pergunta}
              </button>
              <button className={styles.alternativa} onClick={ 
                (e)=>{e.preventDefault(); verificarResposta(dataPergunta.alternativa2_pergunta)}} >
                {dataPergunta.alternativa2_pergunta}
              </button>
              <button className={styles.alternativa} onClick={ 
                (e)=>{ e.preventDefault(); verificarResposta(dataPergunta.alternativa3_pergunta)}}>
                {dataPergunta.alternativa3_pergunta}
              </button>
              <button className={styles.alternativa} onClick={ 
                (e)=>{ e.preventDefault(); verificarResposta(dataPergunta.alternativa4_pergunta)}} >
                {dataPergunta.alternativa4_pergunta}
              </button>
            </div>

            <button
              className={styles.alternativa}
              onClick={() => {
                setOpen(!open);
                fetchDicas()}}
            >
              {open === false ? "mostrar dicas" : "fechar dicas"}
            </button>
          </>

          {open === true ? (
            <p key={dica.id_dica}> {dica.info_dica}</p>
          ) : (
            <>
            </>
          )}
        </div>
      ) : (
        <p>Carregando...</p>
      )}

      {/* remover isso no final */}
      <button onClick={(e)=>{e.preventDefault(); localStorage.clear("pontos")}}>limpar pontos</button>
      <button onClick={(e)=>{e.preventDefault(); finalizarQuiz()}}>finalizar</button>
    </>
  );
};