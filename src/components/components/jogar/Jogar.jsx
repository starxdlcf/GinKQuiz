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
    // 1. Cálculos Locais
    const fim = Date.now();
    const inicio = Number(localStorage.getItem("inicioQuiz"));
    const tempo = (fim - inicio) / 1000;

    const minutos = Math.floor(tempo / 60);
    const segundos = Math.floor(tempo % 60);
    const acertos = Number(localStorage.getItem("acertos"));
    
    // Pontuação dessa rodada
    const pontosDaRodada = Math.floor((acertos / tempo) * 1000);

    // Salva no LocalStorage para a tela final mostrar
    localStorage.setItem("pontos", pontosDaRodada);
    localStorage.setItem("tempoMin", minutos);
    localStorage.setItem("tempoSeg", segundos);

    // 2. Lógica do Supabase (Soma de Pontos)
    try {
      const userId = localStorage.getItem("userId");
      
      if (!userId) {
        logEvent('QUIZ', 'Usuário não logado, pontuação não será salva no ranking.');
        navigate("/final");
        return;
      }

      logEvent('QUIZ', 'Atualizando pontuação total no banco...', { pontosDaRodada });

      // PASSO A: Buscar pontuação atual do usuário
      const { data: dadosAtuais, error: erroBusca } = await supabase
        .from("pontuacao") // Nome da sua tabela
        .select("pontos")   // Nome da coluna de pontos acumulados
        .eq("id_usuario", userId)
        .maybeSingle(); // Usamos maybeSingle pois pode não existir ainda

      if (erroBusca) throw erroBusca;

      // Se o usuário não tiver registro ainda, começa com 0
      const pontuacaoAntiga = dadosAtuais ? dadosAtuais.pontos : 0;
      const novaPontuacaoTotal = pontuacaoAntiga + pontosDaRodada;

      // PASSO B: Salvar a soma (Upsert cria se não existir, atualiza se existir)
      const { error: erroSalvar } = await supabase
        .from("pontuacao")
        .upsert({ 
          id_usuario: userId, 
          pontos: novaPontuacaoTotal 
        }, { onConflict: 'id_usuario' });

      if (erroSalvar) throw erroSalvar;

      logEvent('QUIZ', 'Ranking atualizado com sucesso', { total: novaPontuacaoTotal });

    } catch (error) {
      logError('QUIZ', 'Erro ao salvar pontuação no ranking', error);
      // Não damos alert aqui para não travar a experiência, o usuário vê a nota localmente na próxima tela
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
