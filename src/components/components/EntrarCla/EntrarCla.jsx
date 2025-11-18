
import React from "react";
import { Link } from "react-router-dom";
import styles from "./EntrarCla.module.css";
import PerfilIcon from "../perfil/PerfilIcon";
import { supabase } from "../../../Supabase";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext.jsx";

export const EntrarCla = () => {
  const [data, setData] = React.useState([]);
  const { id } = useContext(GlobalContext);
  const [description, setDescription] = React.useState(false);

  React.useEffect(() => {
    const fetchClans = async () => {
      const { data: clans, error } = await supabase.from("cla").select("*");
      if (!error && clans) setData(clans);
    };
    fetchClans();
  }, []);

  const handleFilter = async (e) => {
      const filter = e.target.value;
      const filteredData = data.filter((clan) =>
        clan.nome_equipe.toLowerCase().includes(filter.toLowerCase())
      );
      setData(filteredData);
    }
  const EnterCla = async (x) => {
      // alert("Solicitação de entrada enviada ao líder do Clã!");
      console.log(x);
      const { error } = await supabase
        .from("usuarios")
        .update({"equipe_usuario": x})
        .eq("id_usuario", id);
      // console.log(data);
  
      if (error) {
        console.error(error);
        return;
      }

      alert("Você entrou no Clã com sucesso!");
      const { data: teamData } = await supabase
        .from("cla")
        .select("*")
        .eq("id_equipe", x)
        .single();
        
        data.quantidade_atual_equipe += 1;
      }
      
  return (
    <div className={styles.container}>
      <div className={styles.headbox2}>
        <div className={styles.perfil}>
          <PerfilIcon />
        </div>
        <h1>Entre em um Clã</h1>
      </div>

      <div>
        <input
          type="text"
          placeholder="Pesquisar por um Clã"
          onChange={handleFilter}
          style={{ marginRight: "30px" }}
        />
        <input style={{ width: "130px" }} type="text" placeholder="#0000" />
      </div>

      <table className={`${styles.tabela}`}>
        <thead>
          <tr>
            <th>Clã</th>
            <th>Id</th>
            <th>Membros</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody className={`${styles.scrollableTable}`}>
          {data &&
            data.map((clan) => (
              <tr key={clan.id_equipe}>
                <td className={styles.nome_equipe}>{clan.nome_equipe}</td>
                <td>{`#${clan.id_equipe}`}</td>
                <td>
                  {clan.quantidade_atual_equipe}/{clan.quantidade_limite_equipe}
                </td>
                <td>{clan.pontuacao_equipe}</td>
                {description && <td>{clan.descricao_equipe}</td>}
                <td style={{ backgroundColor: "var(--yellow)" }}>
                  <button
                    className={styles.entrarButton}
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
        <button className={styles.criarButton}>
          <Link to="criarcla">Criar Meu Clã</Link>
        </button>
      </div>
    </div>
  );
};