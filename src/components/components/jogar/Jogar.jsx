import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../Supabase";
import { useNavigate } from "react-router-dom";
import styles from "./Jogar.module.css"
import { FindInPage } from "@mui/icons-material";

export const Jogar = () => {

  //const { id } = useParams();
  const [id, setId] = React.useState(12)//para testes
  const navigate = useNavigate();
  const [dataPergunta, setDataPergunta] = React.useState(null);
  const [dica,setDica] = React.useState("")
  const [open, setOpen] = React.useState(false)
  
  //resolver
  console.log("id começo")
  console.log(id)

  useEffect(() => {
    setId(Math.floor((Math.random()*40)+1))
    handlePergunta()
  }, []); //para testes

  const handlePergunta = () =>{
    fetchPergunta(id);//colocar no use effect dps
  }
  
  
  const fetchPergunta = async (id) => {
    try{
      const { data,error } = await supabase
      .from("perguntas")
      .select("*")
      .eq("id_pergunta", id)
      .single();

      console.log("id real")
      console.log(id)
      
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

      if (data != "")alert("acertou")
      else alert("errou")

    }
    catch (error){
      console.error(error)
      alert(error.message)
    }
  }

  const fetchDicas = async()=>{
    if (!open){
      console.log("id no dica")
      console.log(id)
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
    </>
  );
};