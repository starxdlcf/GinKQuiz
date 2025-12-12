import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../Supabase";
import { useNavigate } from "react-router-dom";
import styles from "./Jogar.module.css";
import Logo from "../../../assets/icons/LogotipoGinKQuiz.png";
import ideiaIcon from "../../../assets/icons/lampadaideia.png";

export const Jogar = () => {
  const { idPergunta } = useParams();
  const navigate = useNavigate();
  const [dataPergunta, setDataPergunta] = React.useState(null);
  const [dica, setDica] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [acertou, setAcertou] = React.useState(null);
  const [alternativaClicada, setAlternativaClicada] = React.useState(null);

  const tamanhoSL = JSON.parse(localStorage.getItem("tamanhoSelecionado"));
  const perguntasSL = JSON.parse(localStorage.getItem("perguntasSelecionadas"));

  useEffect(() => {
    fetchPergunta(idPergunta);
    // const tamanhoSL = JSON.parse(localStorage.getItem("tamanhoSelecionado"));
    // const perguntasSL = JSON.parse(
    //   localStorage.getItem("perguntasSelecionadas")
    // );
    // console.log("tamanhoSelecionado no localStorage:", tamanhoSL);
    // console.log("perguntasSelecionadas no localStorage:", perguntasSL);
  }, [idPergunta]);

  const fetchPergunta = async (id) => {
    try {
      const { data, error } = await supabase
        .from("perguntas")
        .select("*")
        .eq("id_pergunta", id)
        .single();

      if (error) throw error;

      setDataPergunta(data);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const verificarResposta = async (escolha) => {
    try {
      const { data, error } = await supabase
        .from("perguntas")
        .select("*")
        .eq("resposta_pergunta", escolha);

      const perguntasSL =
        JSON.parse(localStorage.getItem("perguntasSelecionadas")) || [];

      const indexAtual = perguntasSL.indexOf(Number(idPergunta));
      console.log("indexAtual:", indexAtual);
      const proximaPergunta = perguntasSL[indexAtual + 1];
      console.log("proximaPergunta:", proximaPergunta);
      if (error) throw error;

      if (data != "") {
        somarAcertos();
        setAcertou(true);
        // Aguarda o React atualizar o estado acertou antes de registrar a alternativa
        setTimeout(() => {
          setAlternativaClicada(escolha);
          setTimeout(() => {
            setAlternativaClicada(null);
            setAcertou(null);
            if (!proximaPergunta) {
              finalizarQuiz();
              return;
            }else{ 
              navigate(`/jogar/${proximaPergunta}`);
            }
          }, 300);
        }, 50);
      } else {
        setAcertou(false);
        // Aguarda o React atualizar o estado acertou antes de registrar a alternativa
        setTimeout(() => {
          setAlternativaClicada(escolha);
          setTimeout(() => {
            setAlternativaClicada(null);
            setAcertou(null);
                        if (!proximaPergunta) {
              finalizarQuiz();
              return;
            }else{ 
              navigate(`/jogar/${proximaPergunta}`);
            }
          }, 300);
        }, 50);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
      setAlternativaClicada(null);
      setAcertou(null);
    }
  };

  const somarAcertos = () => {
    const acertos = Number(localStorage.getItem("acertos"));
    const acertosAtualizados = acertos + 1;
    localStorage.setItem("acertos", acertosAtualizados);
  };

  const fetchDicas = async () => {
    if (!open) {
      try {
        const { data, error } = await supabase
          .from("dicas")
          .select("*")
          .eq("pergunta_dica", idPergunta);

        if (error) throw error;

        const dicas = data;

        const aleatorio = dicas[Math.floor(Math.random() * dicas.length)];
        setDica(aleatorio);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  const finalizarQuiz = () => {
    const fim = Date.now();
    const inicio = Number(localStorage.getItem("inicioQuiz"));
    const tempo = (fim - inicio) / 1000;
    const minutos = Math.floor(tempo / 60);
    const segundos = Math.floor(tempo % 60);

    const acertos = localStorage.getItem("acertos");

    const pontos = Math.floor((acertos / tempo) * 1000);

    localStorage.setItem("pontos", pontos);
    localStorage.setItem("tempoMin", minutos);
    localStorage.setItem("tempoSeg", segundos);

    navigate("/final");
  };

  return (
    <div id={styles.html}>
      {dataPergunta ? (
        <div className={styles.container}>
          <div id={styles.divcabecalho}>
            <img src={Logo} alt="Logo GinKQuiz" className={styles.logo} />
          </div>

          <div className={styles.containerPergunta}>
            <h2>{dataPergunta.enunciado_pergunta}</h2>
            <div>
              <div className={styles.alt1e2}>
                <button
                  className={`${
                    alternativaClicada === dataPergunta.alternativa1_pergunta
                      ? acertou == true
                        ? styles.alternativaCheckedRight
                        : styles.alternativaCheckedWrong
                      : styles.alternativa
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    verificarResposta(dataPergunta.alternativa1_pergunta);
                  }}
                >
                  {dataPergunta.alternativa1_pergunta}
                </button>
                <button
                  className={`${
                    alternativaClicada == dataPergunta.alternativa2_pergunta
                      ? acertou == true
                        ? styles.alternativaCheckedRight
                        : styles.alternativaCheckedWrong
                      : styles.alternativa
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    verificarResposta(dataPergunta.alternativa2_pergunta);
                  }}
                >
                  {dataPergunta.alternativa2_pergunta}
                </button>
              </div>
              <div className={styles.alt3e4}>
                <button
                  className={`${
                    alternativaClicada == dataPergunta.alternativa3_pergunta
                      ? acertou == true
                        ? styles.alternativaCheckedRight
                        : styles.alternativaCheckedWrong
                      : styles.alternativa
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    verificarResposta(dataPergunta.alternativa3_pergunta);
                  }}
                >
                  {dataPergunta.alternativa3_pergunta}
                </button>
                <button
                  className={`${
                    alternativaClicada === dataPergunta.alternativa4_pergunta
                      ? acertou == true
                        ? styles.alternativaCheckedRight
                        : styles.alternativaCheckedWrong
                      : styles.alternativa
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    verificarResposta(dataPergunta.alternativa4_pergunta);
                  }}
                >
                  {dataPergunta.alternativa4_pergunta}
                </button>
              </div>
            </div>

            <button
              className={styles.dica}
              onClick={() => {
                setOpen(!open);
                fetchDicas();
              }}
            >
              {open === false ? (
                <img id={styles.dicaimagem} src={ideiaIcon} alt="Ideia" />
              ) : (
                "fechar dicas"
              )}
            </button>
            {open === true ? (
              <p id={styles.dicaOpen} key={dica.id_dica}>
                {" "}
                {dica.info_dica}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}

    </div>
  );
};
