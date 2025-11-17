import React, { use } from "react";
import styles from "./MenuInicial.module.css";
import { supabase } from "../../../Supabase";

import { GlobalContext } from "../../../context/GlobalContext";
import { useContext } from "react";

import PerfilIcon from "../perfil/PerfilIcon";

export const MenuInicial = () => {
  const [data, setData] = React.useState(null);

  const { id, setId } = useContext(GlobalContext);

  const [descripition, setDescription] = React.useState(false);

  React.useEffect(() => {
    showClanInfo();
  }, []);

  const showClanInfo = async () => {
    const { data, error } = await supabase.from("cla").select("*");
    console.log(data);
    setData(data);

    if (error) {
      console.log(error);
    }
  };

  const handleFilter = async (e) => {
    // const filter = e.target.value;
    // const filteredData = data.filter((clan) =>
    //   clan.nome_equipe.toLowerCase().includes(filter.toLowerCase())
    // );
    // setData(filteredData);

    console.log(e.target.value);

    const { data, error } = await supabase
      .from("cla")
      .select("*")
      .ilike("nome_equipe", `${e.target.value}%`);
    setData(data);

    if (error) {
      console.log(error);
    }
  };

  const showId = async () => {
    console.log("Id do usuario", id);
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id_usuario", id);
    console.log(data);
  };

  const ClaDescrition = () => {
    console.log("entrou");
    console.log(descripition);
    setDescription(true);
  };

  const EnterCla = async (x) => {
    // alert("Solicitação de entrada enviada ao líder do Clã!");
    console.log(x);
    const { error } = await supabase
      .from("usuarios")
      .update({"equipe_usuario": x})
      .eq("id_usuario", id);
    // console.log(data);

    if (error) {
      console.log(error);
      console.log('vc e burro')
    } else {
      alert("Você entrou no Clã com sucesso!");
      // console.log(data);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <PerfilIcon />
        <h1>GinKQuiz</h1>

        <button>Jogar</button>
        <button>Rankings</button>
      </div>
      <div className={styles.box2}>
        <h1>Entre em um Clã</h1>
        <div>
          <input
            type="text"
            placeholder="Pesquisar por um Clã"
            onChange={handleFilter}
          />
          <input type="text" placeholder="#0000" />
        </div>

        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Clã</th>
              <th>Membros</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((clan) => (
                <tr key={clan.id_equipe}>
                  <td key={clan.nome_equipe}>{clan.nome_equipe}</td>
                  <td key={clan.quantidade_atual_equipe}>
                    {clan.quantidade_atual_equipe}/
                    {clan.quantidade_limite_equipe}
                  </td>
                  <td key={clan.pontuacao_equipe}>{clan.pontuacao_equipe}</td>
                  {/* {descripition && <td key={clan.descricao_equipe}>{clan.descricao_equipe}</td>} */}
                  <td key={clan.created_at}>
                    <button
                      onClick={() => {
                        EnterCla(clan.id_equipe);
                      }}
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div>
          <button onClick={showId}>Entrar</button>
          <button>Visitar Clã</button>
        </div>
      </div>
    </div>
  );
};
