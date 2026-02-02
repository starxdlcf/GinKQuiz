import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../Supabase";
import { useNavigate } from "react-router-dom";
import styles from "./Jogar.module.css";
import Logo from "../../../assets/icons/LogotipoGinKQuiz.png";
import ideiaIcon from "../../../assets/icons/lampadaideia.png";
import { logEvent, logError } from '../../../utils/loggers.js';


export const Jogar = () => {
  const [numero,setNumero] = React.useState(1)
  const { idPergunta } = useParams();
  const navigate = useNavigate();
  const [dataPergunta, setDataPergunta] = React.useState(null);
  const [dica, setDica] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [acertou, setAcertou] = React.useState(null);
  const [alternativaClicada, setAlternativaClicada] = React.useState(null);


  const tamanhoSL = JSON.parse(localStorage.getItem("tamanhoSelecionado"));

  useEffect(() => {
    fetchPergunta(idPergunta);
  }, [idPergunta]);

  const fetchPergunta = async (id) => {
    try {
      // [LOG] Início da busca
      logEvent('QUIZ', `Buscando pergunta ID: ${id}`);

      const { data, error } = await supabase
        .from("perguntas")
        .select("*")
        .eq("id_pergunta", id)
        .single();

      if (error) throw error;

      // [LOG] Sucesso no carregamento
      logEvent('QUIZ', 'Pergunta carregada com sucesso', { enunciado: data.enunciado_pergunta });
      
      setDataPergunta(data);
    } catch (error) {
      // [LOG] Erro crítico
      logError('QUIZ', 'Erro ao buscar pergunta', error);
      alert(error.message);
    }
  };

  const verificarResposta = async (escolha) => {
    try {
      // [LOG] Ação do usuário
      logEvent('QUIZ', 'Usuário selecionou alternativa', { escolha });

      const { data, error } = await supabase
        .from("perguntas")
        .select("*")
        .eq("resposta_pergunta", escolha); // Verifica se essa escolha é a resposta correta

      if (error) throw error;

      const perguntasSL = JSON.parse(localStorage.getItem("perguntasSelecionadas")) || [];
      const indexAtual = perguntasSL.indexOf(Number(idPergunta));
      const proximaPergunta = perguntasSL[indexAtual + 1];

      // Se data não for vazio, significa que o Supabase encontrou essa resposta como a correta
      if (data != "") {
        // [LOG] Acerto
        logEvent('QUIZ', 'Resposta CORRETA ✅');
        
        somarAcertos();
        setAcertou(true);

        setTimeout(() => {
          setAlternativaClicada(escolha);
          setTimeout(() => {
            setAlternativaClicada(null);
            setAcertou(null);
            
            if (!proximaPergunta) {
              finalizarQuiz();
            } else {
              // [LOG] Navegação
              logEvent('QUIZ', 'Avançando para próxima pergunta');
              setNumero(numero + 1);
              navigate(`/jogar/${proximaPergunta}`);
            }
          }, 300);
        }, 50);

      } else {
        // [LOG] Erro
        logEvent('QUIZ', 'Resposta ERRADA ❌');
        
        setAcertou(false);
        setTimeout(() => {
          setAlternativaClicada(escolha);
          setTimeout(() => {
            setAlternativaClicada(null);
            setAcertou(null);
            
            if (!proximaPergunta) {
              finalizarQuiz();
            } else {
               // [LOG] Navegação mesmo errando
               logEvent('QUIZ', 'Avançando para próxima pergunta');
               setNumero(numero + 1);
               navigate(`/jogar/${proximaPergunta}`);
            }
          }, 300);
        }, 50);
      }
    } catch (error) {
      logError('QUIZ', 'Erro ao verificar resposta', error);
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
    if (!open) { // Só busca se estiver abrindo
      try {
        logEvent('QUIZ', 'Usuário solicitou dica', { perguntaId: idPergunta });

        const { data, error } = await supabase
          .from("dicas")
          .select("*")
          .eq("pergunta_dica", idPergunta);

        if (error) throw error;

        const dicas = data;
        const aleatorio = dicas[Math.floor(Math.random() * dicas.length)];
        
        setDica(aleatorio);
      } catch (error) {
        logError('QUIZ', 'Erro ao buscar dica', error);
        alert(error.message);
      }
    }
  };


const finalizarQuiz = async () => {
    // 1. Cálculos da Rodada (Mantido igual)
    const fim = Date.now();
    const inicio = Number(localStorage.getItem("inicioQuiz"));
    const tempo = (fim - inicio) / 1000;

    const minutos = Math.floor(tempo / 60);
    const segundos = Math.floor(tempo % 60);
    const acertos = Number(localStorage.getItem("acertos"));
    const pontosDaRodada = Math.floor((acertos / tempo) * 1000);

    // Salva no LocalStorage para exibição na tela final
    localStorage.setItem("pontos", pontosDaRodada);
    localStorage.setItem("tempoMin", minutos);
    localStorage.setItem("tempoSeg", segundos);

    // 2. Atualização no Banco (Tabela usuarios)
    try {
      const userId = localStorage.getItem("userId");

      if (userId) {
        logEvent('QUIZ', 'Iniciando atualização de pontuação no perfil do usuário...');

        // PASSO A: Buscar a pontuação ATUAL (Nome corrigido aqui)
        const { data: usuario, error: erroBusca } = await supabase
          .from("usuarios")
          .select("pontuacao_usuario") // <--- ALTERADO
          .eq("id_usuario", userId)
          .single();

        if (erroBusca) throw erroBusca;

        // Se estiver null (primeira vez), considera 0 (Nome corrigido aqui)
        const pontuacaoAtual = usuario.pontuacao_usuario || 0; // <--- ALTERADO
        const novaPontuacaoTotal = pontuacaoAtual + pontosDaRodada;

        logEvent('QUIZ', 'Cálculo de pontuação realizado', { 
          anterior: pontuacaoAtual, 
          ganho: pontosDaRodada, 
          novoTotal: novaPontuacaoTotal 
        });

        // PASSO B: Atualizar com a SOMA (Nome corrigido aqui)
        const { error: erroUpdate } = await supabase
          .from("usuarios")
          .update({ pontuacao_usuario: novaPontuacaoTotal }) // <--- ALTERADO
          .eq("id_usuario", userId);

        if (erroUpdate) throw erroUpdate;

        logEvent('QUIZ', 'Pontuação total salva com sucesso!');
      } else {
        logEvent('QUIZ', 'Usuário não logado. Pontuação não salva no banco.');
      }

    } catch (error) {
      logError('QUIZ', 'Erro ao atualizar pontuação do usuário', error);
      // O logError vai mostrar o erro no console, mas o usuário segue o fluxo
    }

    // 3. Navegação
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
            <h2 id={styles.containerPergunta}>{numero}/{tamanhoSL}</h2>
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
