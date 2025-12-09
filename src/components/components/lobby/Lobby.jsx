import React from "react";
import { supabase } from "../../../Supabase";

function Lobby() {
  const [listaGeneros, setListaGeneros] = React.useState({});
  const [temasSelecionados, setTemasSelecionados] = React.useState([]);

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

  const RandomThemes = () =>{
    
    console.log('random')
  }

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
          <button onClick={(e)=>{e.preventDefault(),RandomThemes}}>Sortear Temas</button>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
