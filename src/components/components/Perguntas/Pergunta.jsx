import React from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../Supabase";
import styles from "../Perguntas/Pergunta.module.css";

const Pergunta = () => {
  const { id } = useParams();

  const [dataPergunta, setDataPergunta] = React.useState(null);

  const [dica, setDica] = React.useState(null);

  const [open, setOpen] = React.useState(false);

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
    setDica(data);
    console.log(data);
  };

  const showIdPergunta = () => {
    console.log();
  };
  return (
    <>
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
              <p>aqui aparecerá sua tabela</p>
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
