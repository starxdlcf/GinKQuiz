import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../Supabase";
import { useNavigate } from "react-router-dom";
import styles from "./Jogar.module.css"

export const Jogar = () => {

  //const { id } = useParams();
  const id = 12
  const navigate = useNavigate();

  const [dataPergunta, setDataPergunta] = React.useState(null);
  const [escolha, setEscolha] = React.useState("");
  //const [dica_array,setDica_array] = React.useState([])
  //const [dica,setDica] = React.useState("")
  
  useEffect(() => {
    fetchPergunta(id);
    //fetchDica(id);
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

  const verificaResposta = async()=>{
    try{
      const {data, error} = await supabase
      .from("perguntas")
      .get("*")
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

  // const fetchDica = async(id)=>{
  //   try{        
  //     const {data}= await supabase
  //     .from("dicas")
  //     .select("*")
  //     .eq("pergunta_dica",id)

  //     if (error) throw error

  //     const elementos = data.map(element=> element.info_dica)
  //     setDica_array(elementos)
  //   }
  //   catch (error){
  //     console.error(error)
  //     alert(error.message)
  //   }
  // }
  
return (
    <>
      {dataPergunta ? (
        <div>
          <>
            <h2>{dataPergunta.enunciado_pergunta}</h2>
            <div>
              <button className={styles.alternativa} >
                {dataPergunta.alternativa1_pergunta}
              </button>
              <button className={styles.alternativa} >
                {dataPergunta.alternativa2_pergunta}
              </button>
              <button className={styles.alternativa} >
                {dataPergunta.alternativa3_pergunta}
              </button>
              <button className={styles.alternativa} >
                {dataPergunta.alternativa4_pergunta}
              </button>
            </div>

            <button
              className={styles.alternativa}
              onClick={() => fetchDicas(id)}
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