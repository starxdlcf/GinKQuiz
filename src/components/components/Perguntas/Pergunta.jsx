import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../Supabase";
import styles from "../Perguntas/Pergunta.module.css";
import ideiaIcon from "../../../assets/icons/lampadaideia.png";
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
    <button className={styles.voltarbutton} onClick={returnToMenu}>voltar</button>
      {dataPergunta ? (
        <div className={styles.container}>
          <div className={styles.containerPergunta}>
            <h2>{dataPergunta.enunciado_pergunta}</h2>
            <div>
              <div className={styles.alt1e2}>
                <button className={styles.alternativa}>
                  {dataPergunta.alternativa1_pergunta}
                </button>
                <button className={styles.alternativa}>
                  {dataPergunta.alternativa2_pergunta}
                </button>
              </div>
              <div className={styles.alt3e4}>
                <button className={styles.alternativa}>
                  {dataPergunta.alternativa3_pergunta}
                </button>
                <button className={styles.alternativa}>
                  {dataPergunta.alternativa4_pergunta}
                </button>
              </div>
            </div>

            <button
              className={styles.dica}
              onClick={() => fetchDicas(id)}
            >{open === false ? (
                <img id={styles.dicaimagem} src={ideiaIcon} alt="Ideia" />
              ) : (
                "fechar dicas"
              )}
            </button>
          {open === true ? (
            <div id={styles.dicaOpen}>
              {dica && dica.length > 0 ? (
                dica.map((dica) => <p key={dica.id_dica}> {dica.info_dica}</p>)
              ) : (
                <p>sem dicas cadastradas</p>
              )}
            </div>
          ) : (
            <>
            </>
          )}
          </div>

        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
};

export default Pergunta;
