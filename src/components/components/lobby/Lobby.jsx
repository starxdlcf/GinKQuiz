import React from "react";
import { supabase } from "../../../Supabase";
import { useNavigate } from "react-router-dom";
import styles from "./lobby.module.css";
import Perfil from "../perfil/PerfilIcon";

function Lobby() {
  const [listaGeneros, setListaGeneros] = React.useState({});
  const [temasSelecionados, setTemasSelecionados] = React.useState([]);
  const [tamanhoSelecionado, setTamanhoSelecionado] = React.useState(null);
  const [perguntas, setPerguntas] = React.useState([]);
  const [clickedButtonFacil, setClickedButtonFacil] = React.useState(false);
  const [clickedButtonMedio, setClickedButtonMedio] = React.useState(false);
  const [clickedButtonExpert, setClickedButtonExpert] = React.useState(false);
  const [randomClicked, setRandomClicked] = React.useState(false);

  const id = localStorage.getItem("userId");

  const navigate = useNavigate();
  const tamanho = [10, 20, 30];

  React.useEffect(() => {
    fetchLista();
  }, []);

  const fetchLista = async () => {
    try {
      const { data, error } = await supabase.from("temas").select("*");

      setListaGeneros(data);
      console.log(data);

      if (error) throw error;
    } catch {
      console.log("ouve um erro na requisição de temas", error);
    }
  };

  const RandomThemes = () => {
    console.log("-----------------sorteando temas-----------------");
    setRandomClicked(true);
    const temasRandom = [];
    console.log(listaGeneros.length);
    for (let i = 0; i < listaGeneros.length; i++) {
      temasRandom.push(i + 1);
    }
    temasRandom.sort(() => Math.random() - 0.5);
    const temasSelecionadosRandom = temasRandom.slice(0, 5);
    setTemasSelecionados(temasSelecionadosRandom);
    console.log("temas selecionados randomicos:", temasSelecionadosRandom);
    // for (let i = 0; i < 5; i++) {
    //   const randomIndex = Math.floor(Math.random() * listaGeneros.length) + 1;
    //   if (temasRandom.includes(randomIndex)) {
    //     console.log("tem repetido", randomIndex);
    //     if (randomIndex === 10) {
    //       const newRandomIndex = randomIndex - 1;
    //       temasRandom.push(newRandomIndex);
    //       console.log(temasRandom);
    //       continue;
    //     } else {
    //       const newRandomIndex = randomIndex + 1;
    //       temasRandom.push(newRandomIndex);
    //       console.log(temasRandom);
    //     }
    //   } else {
    //     temasRandom.push(randomIndex);
    //     console.log(temasRandom);
    //   }
    //   setTemasSelecionados(temasRandom);
    // }
  };

  const BuscarPerguntas = async () => {
    setPerguntas([]);
    console.log("buscando perguntas");
    // console.log(temasSelecionados);

    // console.log(tamanhoSelecionado);
    // // const { data, error } = await supabase
    // //   .from("perguntas")
    // //   .select("tema_pergunta")
    // //   .in("tema_pergunta", temasSelecionados)
    // //   .limit(tamanhoSelecionado)
    // // console.log(data);

    // for (let i = 0; i < temasSelecionados.length; i++) {
    //   const { data, error } = await supabase
    //     .from("perguntas")
    //     .select("tema_pergunta,enunciado_pergunta")
    //     .eq("tema_pergunta", temasSelecionados[i])
    //     .limit(Math.ceil(tamanhoSelecionado / temasSelecionados.length));
    //   console.log(data);
    //   setPerguntas((prevPerguntas) => [...prevPerguntas, ...data]);

    //   if (error) {
    //     console.error("Erro ao buscar perguntas:", error);
    //   }

    //   for (let i = 0; i < data.length; i++) {
    //     console.log(data[i].tema_pergunta);

    // }
    //     setTemasSelecionados((prev)=> prev.slice(0,tamanhoSelecionado));
    // }

    for (let i = 0; i < temasSelecionados.length; i++) {
      const { data, error } = await supabase
        .from("perguntas")
        .select("tema_pergunta,enunciado_pergunta")
        .eq("tema_pergunta", temasSelecionados[i]);
      console.log(
        data
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.ceil(tamanhoSelecionado / temasSelecionados.length))
      );
      setPerguntas((prevPerguntas) => [
        ...prevPerguntas,
        ...data
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.ceil(tamanhoSelecionado / temasSelecionados.length)),
      ]);
    }

    const arrayAleatorio = [];
    for (let i = 0; i < tamanhoSelecionado; i++) {
      arrayAleatorio.push(i);
    }
    arrayAleatorio.sort(() => Math.random() - 0.5);

    console.log("Array aleatorio:", arrayAleatorio);
  };

  const iniciarQuiz = () => {
    if (tamanhoSelecionado === null) {
      alert("Por favor, selecione a quantidade de perguntas.");
      return;
    } else if (temasSelecionados.length === 0) {
      alert("Por favor, selecione pelo menos um tema.");
      return;
    } else {
      const inicio = Date.now();
      localStorage.setItem("inicioQuiz", inicio);
      navigate(`/jogar/${Math.floor(Math.random() * 40 + 1)}`);
    }
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
                            console.log(temasSelecionados);
                          } else {
                            setTemasSelecionados((prev) =>
                              prev.filter((id) => id !== genero.id_tema)
                            );
                            console.log(temasSelecionados);
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
                        console.log(temasSelecionados);
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
              {/* <h3>Temas Selecionados:</h3> */}
              {/* daria pa coloca os temas selecionados com um destaque, nn precisa nem ser aqui pode ser direto nas checkboxs, tendeu? */}
              {/* <ul> */}
              {/* {temasSelecionados.map((temaId) => {
                  const tema = listaGeneros.find((t) => t.id_tema === temaId);
                  return (
                    <li key={temaId}>
                      {tema ? tema.nome_tema : "Tema não encontrado"}
                    </li>
                  );
                })} */}
              {/* </ul> */}
            </div>
            <div id={styles.divQuantiaPerguntas}>
              {/* <h3>Tamanhos Disponíveis:</h3> */}
              {/* <select
                name=""
                id={styles.selectquantasperguntas}
                value={tamanhoSelecionado}
                onChange={(e) => {
                  // e.preventDefault(), handleLengthChange(e);
                  e.preventDefault();
                  setTamanhoSelecionado(parseInt(e.target.value));
                  typeof tamanhoSelecionado === "string"
                    ? console.log(
                        "Tamanho selecionado:",
                        parseInt(tamanhoSelecionado)
                      )
                    : console.log("Tamanho selecionado:", tamanhoSelecionado);
                }}
              >
                {tamanho.map((tamanhoOption) => (
                  <option key={tamanhoOption} value={tamanhoOption}>
                    {tamanhoOption}
                  </option>
                ))}
              </select> */}

              {/* A PARTIR DAQUI A ANNA QUE FEZ */}

              <button
                className={`${styles.buttons} ${
                  clickedButtonFacil ? styles.buttonActive : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (clickedButtonFacil) {
                    setClickedButtonFacil(false);
                    setTamanhoSelecionado(null);
                    console.log("Fácil desativado, voltando ao padrão");
                  } else {
                    setTamanhoSelecionado(10);
                    setClickedButtonFacil(true);
                    setClickedButtonMedio(false);
                    setClickedButtonExpert(false);
                    console.log("Tamanho selecionado:", 10);
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
                    console.log("Médio desativado, voltando ao padrão");
                  } else {
                    setTamanhoSelecionado(20);
                    setClickedButtonFacil(false);
                    setClickedButtonMedio(true);
                    setClickedButtonExpert(false);
                    console.log("Tamanho selecionado:", 20);
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
                    console.log("Expert desativado, voltando ao padrão");
                  } else {
                    setTamanhoSelecionado(30);
                    setClickedButtonFacil(false);
                    setClickedButtonMedio(false);
                    setClickedButtonExpert(true);
                    console.log("Tamanho selecionado:", 30);
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
                e.preventDefault(), BuscarPerguntas(), iniciarQuiz(); //modificar depois
              }}
            >
              Iniciar
            </button>
          </div>
        </div>
      </div>
      <div className={styles.partedireita}>
        <div id={styles.perfil}>
          <Perfil />
        </div>
        <div id={styles.novoJogo}>
          <h2>Novo Jogo</h2>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
