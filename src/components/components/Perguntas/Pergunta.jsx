import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../Supabase";
import styles from "../Perguntas/Pergunta.module.css";
import { Navigate } from "react-router-dom";

const Pergunta = () => {
  const { id } = useParams();

  const navigate = useNavigate()

  const [dataPergunta, setDataPergunta] = React.useState(null);

  const [dica, setDica] = React.useState(null);

  const [open, setOpen] = React.useState(true)

  React.useEffect(() => {
    fetchPergunta(id);
    fetchDicas(id);
  }, [id]);
  const fetchPergunta = async (id) => {
    const { data } = await supabase
      .from("perguntas")
      .select("*")
      .eq("id_pergunta", id)
      .single(); // Usando
    setDataPergunta(data);
    console.log(data);
  };

  const fetchDicas = async (id) => {
    setOpen(!open);
    const { data, error } = await supabase
      .from("dicas")
      .select("*")
      .eq("pergunta_dica", id);
    if (error) console.error(error)
    setDica(data);
    console.log(data);
  };

  const returnToMenu = (e) =>{
    e.preventDefault()
    navigate(-1)
  }
  return (
    <>
    <button onClick={returnToMenu}>voltar</button>
      {dataPergunta ? (
        <div>
          <>
            <h2>{dataPergunta.enunciado_pergunta}</h2>
            <div>
              <button className={styles.alternativa}>
                {dataPergunta.alternativa1_pergunta}
              </button>
              <button className={styles.alternativa}>
                {dataPergunta.alternativa2_pergunta}
              </button>
              <button className={styles.alternativa}>
                {dataPergunta.alternativa3_pergunta}
              </button>
              <button className={styles.alternativa}>
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

export default Pergunta;
