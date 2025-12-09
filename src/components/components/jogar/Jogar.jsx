import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../Supabase";
import { useNavigate } from "react-router-dom";
import styles from "./Jogar.module.css"
import { FindInPage } from "@mui/icons-material";

export const Jogar = () => {

  //const { id } = useParams();
  const id = 12
  const navigate = useNavigate();
  const [dataPergunta, setDataPergunta] = React.useState(null);
  const [dica,setDica] = React.useState("")
  const [open, setOpen] = React.useState(false)
  
  useEffect(() => {
    fetchPergunta(id);
    fetchDicas(id);
  }, []);
  
  
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

      if (data != "")alert("acertou")
      else alert("errou")

    }
    catch (error){
      console.error(error)
      alert(error.message)
    }
  }

  const fetchDicas = async(id)=>{
    try{        
      const {data, error}= await supabase
      .from("dicas")
      .select("*")
      .eq("pergunta_dica",id)

      if (error) throw error

      const aleatorio =  data[Math.floor((Math.random()*data.lenght))]

      setDica(aleatorio)
    }
    catch (error){
      console.error(error)
      alert(error.message)
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
                (e)=>{ e.preventDefault(), verificarResposta(dataPergunta.alternativa1_pergunta)}} >
                {dataPergunta.alternativa1_pergunta}
              </button>
              <button className={styles.alternativa} onClick={ 
                (e)=>{e.preventDefault(), verificarResposta(dataPergunta.alternativa2_pergunta)}} >
                {dataPergunta.alternativa2_pergunta}
              </button>
              <button className={styles.alternativa} onClick={ 
                (e)=>{ e.preventDefault(), verificarResposta(dataPergunta.alternativa3_pergunta)}}>
                {dataPergunta.alternativa3_pergunta}
              </button>
              <button className={styles.alternativa} onClick={ 
                (e)=>{ e.preventDefault(), verificarResposta(dataPergunta.alternativa4_pergunta)}} >
                {dataPergunta.alternativa4_pergunta}
              </button>
            </div>

            <button
              className={styles.alternativa}
              onClick={() => {
                setOpen(!open);
                fetchDicas(id)}}
            >
              {open === false ? "mostrar dicas" : "fechar dicas"}
            </button>
          </>

          {open === true ? (
            <>
              {dica && dica.length > 0 ? (
                dica.map((dica) => <p key={dica.id_dica}> {dica.info_dica}</p>)
              ) : (
                <p>sem dicas cadastradas</p>
              )}
            </>
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