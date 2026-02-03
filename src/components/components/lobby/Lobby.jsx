import React from "react";
import { supabase } from "../../../Supabase";
import { useNavigate } from "react-router-dom";
import styles from "./lobby.module.css";
import Perfil from "../perfil/PerfilIcon";
import { logEvent, logError } from '../../../utils/loggers';

function Lobby() {
  const [listaGeneros, setListaGeneros] = React.useState({});
  const [temasSelecionados, setTemasSelecionados] = React.useState([]);
  const [tamanhoSelecionado, setTamanhoSelecionado] = React.useState(null);
  const [clickedButtonFacil, setClickedButtonFacil] = React.useState(false);
  const [clickedButtonMedio, setClickedButtonMedio] = React.useState(false);
  const [clickedButtonExpert, setClickedButtonExpert] = React.useState(false);
  const [randomClicked, setRandomClicked] = React.useState(false);

  const id = localStorage.getItem("userId");

  const navigate = useNavigate();

  React.useEffect(() => {
    fetchLista();
  }, []);

  const fetchLista = async () => {
    try {
      // [LOG] Monitora fluxo do App
      logEvent('QUIZ', 'Carregando lista de temas do Lobby');
      
      // [LOG API] Monitora Rede - Início
      logEvent('API', 'REQ: Buscando lista de temas...');

      const { data, error } = await supabase.from("temas").select("*");

      if (error) {
         // [LOG API] Monitora Rede - Erro
         logError('API', 'ERR: Falha ao buscar temas', error);
         throw error;
      }

      setListaGeneros(data);
      
      // [LOG API] Monitora Rede - Sucesso
      logEvent('API', 'RES: Temas recebidos', { quantidade: data.length });

    } catch (error) {
      logError('QUIZ', 'Erro ao carregar temas', error);
      console.log("ouve um erro na requisição de temas", error);
    }
  };

  const RandomThemes = () => {
    setRandomClicked(true);
    const temasRandom = [];
    for (let i = 0; i < listaGeneros.length; i++) {
      temasRandom.push(i + 1);
    }
    temasRandom.sort(() => Math.random() - 0.5);
    const temasSelecionadosRandom = temasRandom.slice(0, 5);
    setTemasSelecionados(temasSelecionadosRandom);
  };

  const BuscarPerguntas = async () => {
    // Validação inicial
    if (tamanhoSelecionado === null || temasSelecionados.length === 0) {
      logEvent('QUIZ', 'Tentativa de início bloqueada: Configuração incompleta');
      alert("Selecione a dificuldade e pelo menos um tema!");
      return;
    }

    const perguntasTemp = [];
    
    logEvent('QUIZ', 'Iniciando busca de perguntas', { 
      temas: temasSelecionados, 
      dificuldade: tamanhoSelecionado 
    });

    try {
      for (let i = 0; i < temasSelecionados.length; i++) {
        
        // [LOG API] Monitora Rede - Loop de requisições
        logEvent('API', `REQ: Buscando perguntas do tema ID ${temasSelecionados[i]}`);

        const { data, error } = await supabase
          .from("perguntas")
          .select("tema_pergunta,enunciado_pergunta,id_pergunta")
          .eq("tema_pergunta", temasSelecionados[i]);
        
        if (error) {
            logError('API', `ERR: Erro no tema ${temasSelecionados[i]}`, error);
            throw error;
        }

        // [LOG API] Sucesso parcial
        logEvent('API', `RES: Perguntas recebidas do tema ${temasSelecionados[i]}`, { qtd: data.length });

        perguntasTemp.push(
          ...data
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.ceil(tamanhoSelecionado / temasSelecionados.length))
        );
      }

      const arrayPerguntasIds = perguntasTemp.map((item) => item.id_pergunta);

      // Salva configurações
      localStorage.setItem("tamanhoSelecionado", JSON.stringify(tamanhoSelecionado));
      localStorage.setItem("perguntasSelecionadas", JSON.stringify(arrayPerguntasIds));

      logEvent('QUIZ', 'Perguntas selecionadas e preparadas', { total: arrayPerguntasIds.length });

      iniciarQuiz(arrayPerguntasIds);

    } catch (error) {
      logError('QUIZ', 'Erro ao buscar/filtrar perguntas', error);
    }
  };

  const iniciarQuiz = (arrayPerguntasIds) => {
    if (!arrayPerguntasIds || arrayPerguntasIds.length === 0) {
      logError('QUIZ', 'Erro crítico: Array de perguntas vazio ao tentar iniciar');
      alert("Não foi possível encontrar perguntas para os temas selecionados.");
      return;
    }

    const inicio = Date.now();
    localStorage.setItem("inicioQuiz", inicio);

    logEvent('QUIZ', 'Navegando para a tela de jogo', { primeiraPergunta: arrayPerguntasIds[0] });

    navigate(`/jogar/${arrayPerguntasIds[0]}`);
  };

  return (
    <div className={styles.lobbyContainer}>
      <div className={styles.someOtherClass}>
        <div className={styles.dois}>
          <div className={styles.containertudo}>
            <div className={styles.parteesquerdacontainer}>
              {listaGeneros && listaGeneros.length > 0 ? (
                <div id={styles.containertemas}>
                  {listaGeneros.map((genero) => (
                    <div key={genero.id_tema} style={{ display: "flex" }}>
                      <p key={genero.created_at}>{genero.nome_tema}</p>
                      <input
                        id={styles.checkbox}
                        type="checkbox"
                        checked={temasSelecionados.includes(genero.id_tema)}
                        value={genero.id_tema}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTemasSelecionados((prev) => [
                              ...prev,
                              genero.id_tema,
                            ]);
                          } else {
                            setTemasSelecionados((prev) =>
                              prev.filter((id) => id !== genero.id_tema)
                            );
                          }
                        }}
                      />
                    </div>
                  ))}
                  <div style={{ display: "flex" }}>
                    <p>Todos</p>
                    <input
                      id={styles.checkbox}
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          const listaGenerosId = listaGeneros.map(
                            (item) => item.id_tema
                          );
                          setTemasSelecionados([...listaGenerosId]);
                        } else {
                          setTemasSelecionados([]);
                        }
                      }}
                    />
                  </div>
                </div>
              ) : (
                <p>Carregando generos...</p>
              )}
              <div>
                <button
                  className={`${styles.sorteartemas} ${
                    randomClicked ? styles.sorteartemasClicked : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    RandomThemes();
                  }}
                >
                  Sortear Temas
                </button>
              </div>
            </div>
            <div>
            </div>
            <div id={styles.divQuantiaPerguntas}>
              <button
                className={`${styles.buttons} ${
                  clickedButtonFacil ? styles.buttonActive : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (clickedButtonFacil) {
                    setClickedButtonFacil(false);
                    setTamanhoSelecionado(null);
                  } else {
                    setTamanhoSelecionado(10);
                    setClickedButtonFacil(true);
                    setClickedButtonMedio(false);
                    setClickedButtonExpert(false);
                  }
                }}
              >
                Fácil
              </button>
              <button
                className={`${styles.buttons} ${
                  clickedButtonMedio ? styles.buttonActive : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (clickedButtonMedio) {
                    setClickedButtonMedio(false);
                    setTamanhoSelecionado(null);
                  } else {
                    setTamanhoSelecionado(20);
                    setClickedButtonFacil(false);
                    setClickedButtonMedio(true);
                    setClickedButtonExpert(false);
                  }
                }}
              >
                Médio
              </button>
              <button
                className={`${styles.buttons} ${
                  clickedButtonExpert ? styles.buttonActive : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (clickedButtonExpert) {
                    setClickedButtonExpert(false);
                    setTamanhoSelecionado(null);
                  } else {
                    setTamanhoSelecionado(30);
                    setClickedButtonFacil(false);
                    setClickedButtonMedio(false);
                    setClickedButtonExpert(true);
                  }
                }}
              >
                Expert
              </button>
            </div>
          </div>
          <div>
            <button
              className={styles.jogarbutton}
              onClick={(e) => {
                e.preventDefault(), BuscarPerguntas(); 
              }}
            >
              Iniciar
            </button>
          </div>
        </div>
      </div>
      <div className={styles.partedireita}>
        <div id={styles.perfil}>
          <Perfil/>
        </div>
        <div id={styles.novoJogo}>
          <h2>Novo Jogo</h2>
        </div>
      </div>
    </div>
  );
}

export default Lobby;