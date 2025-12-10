import React from "react";
import { supabase } from "../../../Supabase";

function Lobby() {
  const [listaGeneros, setListaGeneros] = React.useState({});
  const [temasSelecionados, setTemasSelecionados] = React.useState([]);
  const [tamanhoSelecionado, setTamanhoSelecionado] = React.useState(10);

  const tamanho = [10, 20, 30];

  const [perguntas, setPerguntas] = React.useState([]);

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
    const temasRandom = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * listaGeneros.length) + 1;
      if (temasRandom.includes(randomIndex)) {
        console.log("tem repetido", randomIndex);
        if (randomIndex === 10) {
          const newRandomIndex = randomIndex - 1;
          temasRandom.push(newRandomIndex);
          console.log(temasRandom);
          continue;
        } else {
          const newRandomIndex = randomIndex + 1;
          temasRandom.push(newRandomIndex);
          console.log(temasRandom);
        }
      } else {
        temasRandom.push(randomIndex);
        console.log(temasRandom);
      }
    }
    setTemasSelecionados(temasRandom);
  };

  const BuscarPerguntas = async () => {
    setPerguntas([]);
    console.log("buscando perguntas");
    console.log(temasSelecionados);

    console.log(tamanhoSelecionado);
    // const { data, error } = await supabase
    //   .from("perguntas")
    //   .select("tema_pergunta")
    //   .in("tema_pergunta", temasSelecionados)
    //   .limit(tamanhoSelecionado)
    // console.log(data);

    for (let i = 0; i < temasSelecionados.length; i++) {
      const { data, error } = await supabase
        .from("perguntas")
        .select("tema_pergunta,enunciado_pergunta")
        .eq("tema_pergunta", temasSelecionados[i])
        .limit(Math.ceil(tamanhoSelecionado / temasSelecionados.length));
      console.log(data);
      setPerguntas((prevPerguntas) => [...prevPerguntas, ...data]);

      if (error) {
        console.error("Erro ao buscar perguntas:", error);
      }

      for (let i = 0; i < data.length; i++) {
        console.log(data[i].tema_pergunta);
      
    }
    }

  };

  return (
    <div>
      <h2>Lobby</h2>
      <div>
        {listaGeneros && listaGeneros.length > 0 ? (
          <>
            {listaGeneros.map((genero) => (
              <div key={genero.id_tema} style={{ display: "flex" }}>
                <p key={genero.created_at}>{genero.nome_tema}</p>
                <input
                  type="checkbox"
                  checked={temasSelecionados.includes(genero.id_tema)}
                  value={genero.id_tema}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTemasSelecionados((prev) => [...prev, genero.id_tema]);
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
          </>
        ) : (
          <p>Carregando generos...</p>
        )}

        <div>
          <button
            onClick={(e) => {
              e.preventDefault(), RandomThemes();
            }}
          >
            Sortear Temas
          </button>
        </div>
        <div>
          <h3>Temas Selecionados:</h3>
          {/* daria pa coloca os temas selecionados com um destaque, nn precisa nem ser aqui pode ser direto nas checkboxs, tendeu? */}
          <ul>
            {temasSelecionados.map((temaId) => {
              const tema = listaGeneros.find((t) => t.id_tema === temaId);
              return (
                <li key={temaId}>
                  {tema ? tema.nome_tema : "Tema não encontrado"}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3>Tamanhos Disponíveis:</h3>
          <select
            name=""
            id=""
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
          </select>
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault(), BuscarPerguntas();
            }}
          >
            JOGAR!
          </button>
        </div>
        <div>
          <button onClick={()=>{
            console.log(perguntas);
          }}>Mostrar perguntas</button>
          </div>  
      </div>
    </div>
  );
}

export default Lobby;
