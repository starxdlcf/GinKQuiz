import React from "react";
import { Link } from "react-router-dom";
import styles from "./EntrarCla.module.css";
import PerfilIcon from "../perfil/PerfilIcon.jsx";
import { supabase } from "../../../Supabase.jsx";

export const EntrarCla = () => {
  const [clas, setClas] = React.useState([]);
  const id = localStorage.getItem("userId");
  const [description, setDescription] = React.useState(false); // oque é isso? ass:Allan
  const [buscarCla, setBuscarCla] = React.useState("");
  const [carregando, setCarregando] = React.useState(true);

  React.useEffect(() => {
    fetchClans();
  }, []);

  const fetchClans = async () => {
    try {
      setCarregando(true);

      let { data: clans, error } = await supabase.from("cla").select("*");

      if (error) throw error;
      setClas(clans);
    } catch (error) {
      alert(error.message);
    } finally {
      setCarregando(false);
    }
  };

  const handleBuscarCla = (e) => setBuscarCla(e.target.value);

  const resultado = React.useMemo(() => {
    const pesquisa = (buscarCla || "").trim().toLowerCase();
    if (!pesquisa) return clas || [];
    return (clas || []).filter((cla) =>
      (cla.nome_cla || "").toLowerCase().includes(pesquisa)
    );
  }, [clas, buscarCla]);

  const enterCla = async (idCla) => {
    console.log(idCla);
    const { error } = await supabase
      .from("usuarios")
      .update({ cla_usuario: idCla })
      .eq("id_usuario", id);
    // console.log(data);

    if (error) {
      console.error(error);
      return;
    }

    alert("Você entrou no Clã com sucesso!");
    const { data } = await supabase
      .from("cla")
      .select("*")
      .eq("id_cla", idCla)
      .single();

    data.quantidade_atual_cla += 1;
  };

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
          onChange={handleBuscarCla}
          style={{ marginRight: "30px" }}
        />
        <input style={{ width: "130px" }} type="text" placeholder="#0000" />
      </div>

      {carregando ? (
        <p>Carregando Clãs...</p>
      ) : (
        <table className={`${styles.tabela}`}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Clã</th>
              <th>Membros</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody className={`${styles.scrollableTable}`}>
            {resultado.map((clan) => (
              <tr key={clan.id_cla}>
                <td>{`#${clan.id_cla}`}</td>
                <td className={styles.nome_cla}>{clan.nome_cla}</td>
                <td>
                  {clan.quantidade_atual_cla}/{clan.quantidade_limite_cla}
                </td>
                <td>{clan.pontuacao_cla}</td>
                <td style={{ backgroundColor: "var(--yellow)" }}>
                  <button
                    className={styles.entrarButton}
                    onClick={() => {
                      enterCla(clan.id_cla);
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div>
        <Link to="criarcla">
          <button className={styles.criarButton}>Criar meu Clã</button>
        </Link>
      </div>
    </div>
  );
};
