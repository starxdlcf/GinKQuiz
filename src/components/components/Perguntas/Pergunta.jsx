import React from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../Supabase";

const Pergunta = () => {
  const { id } = useParams();

  const [dataPergunta, setDataPergunta] = React.useState(null);

  React.useEffect(() => {
    fetchPergunta(id);
  }, [id]);
  const fetchPergunta = async (id) => {
    const { data } = await supabase
      .from("perguntas")
      .select("*")
      .eq("id_pergunta", id)
    .single(); // Usando
    setDataPergunta(data);
    console.log(dataPergunta);
    console.log(data);
  };

  

  return (
    <>
      {dataPergunta ? (
        <div>
          <h2>{dataPergunta.enunciado_pergunta}</h2>
          
          <button>{dataPergunta.alternativa1_pergunta}</button>
          <button>{dataPergunta.alternativa2_pergunta}</button>
          <button>{dataPergunta.alternativa3_pergunta}</button>
          <button>{dataPergunta.alternativa4_pergunta}</button>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
};

export default Pergunta;
