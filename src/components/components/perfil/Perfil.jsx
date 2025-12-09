import React from "react";
import { supabase } from "../../../Supabase";
import sapoPerfil from "../../../assets/icons/sapo.png";
import gatoPerfil from "../../../assets/icons/gato.png";
import leaoPerfil from "../../../assets/icons/leao.png";
import girafaPerfil from "../../../assets/icons/girafa.png";
import lagostaPerfil from "../../../assets/icons/lagosta.png";
import styles from "./Perfil.module.css";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const id = localStorage.getItem("userId");
  const [data, setData] = React.useState(null);
  const [fotoDePerfil, setFotoDePerfil] = React.useState(null);
  const navigate = useNavigate()

  React.useEffect(() => {
    loadProfileData();
  }, [id]);
  
  const loadProfileData = async () => {
    try {
      if (!id) navigate("/");

      const { data: userData, error: userError } = await supabase
        .from("usuarios")
        .select(
          `id_usuario,
           nome_usuario,
           email,
           cla_usuario,
           id_fotoPerfil,
           cla: cla_usuario ( nome_cla )`
        )
        .eq("id_usuario", id);

      if (userError) throw userError;

      setData(userData);
      console.log("Dados do usuário:", userData);

      // Get profile picture based on id_fotoPerfil
      if (userData && userData.length > 0) {
        const idFoto = userData[0].id_fotoPerfil;
        console.log("ID Foto:", idFoto);

        let fotoselecionada = null;
        switch (idFoto) {
          case 1:
            fotoselecionada = sapoPerfil;
            break;
          case 2:
            fotoselecionada = gatoPerfil;
            break;
          case 3:
            fotoselecionada = leaoPerfil;
            break;
          case 4:
            fotoselecionada = girafaPerfil;
            break;
          case 5:
            fotoselecionada = lagostaPerfil;
            break;
          default:
            console.log("Nenhuma foto selecionada para ID:", idFoto);
        }

        setFotoDePerfil(fotoselecionada);
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    }
  };

  function logOut (){
    localStorage.clear("userId")
    navigate("/")
  }

  return (
    <>
      <h1 id={styles.perfil}>Perfil</h1>

      {data &&
        data.map((user) => (
          <div id={styles.div} key={user.id_usuario}>
            <img id={styles.foto} src={fotoDePerfil} alt="Foto de Perfil" />
            <h2 id={styles.nome}>Nome: {user.nome_usuario}</h2>
            <h3 id={styles.email}>Email: {user.email}</h3>
            {user.cla && <p>Clã: {user.cla.nome_cla}</p>}
          </div>
        ))}

        <button  onClick={(e)=>{e.preventDefault(),logOut()}}>Desconectar</button>
    </>
  );
};

export default Perfil;
