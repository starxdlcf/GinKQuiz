import React from "react";
import { supabase } from "../../../Supabase";
import sapoPerfil from "../../../assets/icons/sapo.png";
import gatoPerfil from "../../../assets/icons/gato.png";
import leaoPerfil from "../../../assets/icons/leao.png";
import girafaPerfil from "../../../assets/icons/girafa.png";
import lagostaPerfil from "../../../assets/icons/lagosta.png";
import styles from "./Perfil.module.css";
import { useNavigate } from "react-router-dom";
import { Numbers } from "@mui/icons-material";

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

  
  const changeProfilePicture = async (newIdFotoPerfil) => {

    newIdFotoPerfil = prompt("Escolha o número da nova foto de perfil:\n1 - Sapo\n2 - Gato\n3 - Leão\n4 - Girafa\n5 - Lagosta");
    if (![1,2,3,4,5].includes(Number(newIdFotoPerfil))) {
      alert("Número inválido. Por favor, escolha um número entre 1 e 5.");
      return;
    }

    await supabase
    .from("usuarios")
    .update({ id_fotoPerfil: newIdFotoPerfil })
    .eq("id_usuario", id)
    .then(({ data, error }) => {
      if (error) {
        console.error("Erro ao atualizar foto de perfil:", error);
      } else {
        console.log("Foto de perfil atualizada com sucesso:", data);
        loadProfileData(); // Recarrega os dados do perfil para refletir a mudança
      }});
  }

  const changeName = async (newName) => {
    newName = prompt("Digite o novo nome de usuário:");
    if (!newName || !/^[a-zA-Z_]+$/.test(newName)) {
      alert("Nome inválido. Por favor, insira um nome válido.");
      return;
    } else if (newName.length < 1 || newName.length > 20) {
      alert("O novo nome de usuário deve ter entre 1 e 20 caracteres.");
      return;
    }
    await supabase
    .from("usuarios")
    .update({ nome_usuario: newName })
    .eq("id_usuario", id)
    .then(({ data, error }) => {
      if (error) {
        console.error("Erro ao atualizar nome de usuário:", error);
      } else {
        console.log("Nome de usuário atualizado com sucesso:", data);
        loadProfileData(); // Recarrega os dados do perfil para refletir a mudança
      }});
  }

  return (
    <div id={styles.container}>
      <h1 id={styles.perfil}>Perfil</h1>

      {data &&
        data.map((user) => (
          <div id={styles.div} key={user.id_usuario}>
            <img onClick={(e) => {e.preventDefault(); changeProfilePicture()}} id={styles.foto} src={fotoDePerfil} alt="Foto de Perfil" />
            <h2 onClick={(e) => {e.preventDefault(); changeName()}} id={styles.nome}>Nome: {user.nome_usuario}</h2>
            <h3 id={styles.email}>Email: {user.email}</h3>
            {user.cla && <p>Clã: {user.cla.nome_cla}</p>}
            <button id={styles.logout} onClick={(e)=>{e.preventDefault(),logOut()}}>Desconectar</button>
          </div>
        ))}

    </div>
  );
};

export default Perfil;
