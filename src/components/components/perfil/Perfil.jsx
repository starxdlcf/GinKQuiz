//eu sei que não está funcionando, a noite eu mexo

import React from "react";
import { supabase } from "../../../Supabase";
import sapoPerfil from "../../../assets/icons/sapo.png"
import gatoPerfil from "../../../assets/icons/sapo.png"
import leaoPerfil from "../../../assets/icons/sapo.png"
import girafaPerfil from "../../../assets/icons/sapo.png"
import lagostaPerfil from "../../../assets/icons/sapo.png"
import styles from "./Perfil.module.css";

const Perfil = () => {
  const id = localStorage.getItem("userId");
  const [data, setData] = React.useState(null);
  const [idFoto, setIdFoto] = React.useState(null);
  const [fotoDePerfil,setFotoDePerfil] = React.useState(null);


  React.useEffect(() => {
    showProfile();
    getProfilePictureId(idFoto);
    showProfilePicture();
    console.log("Esse é seu id para mostrar o perfil", id);
  }, []);

  React.useEffect(() => {
    showProfile();
    getProfilePictureId(idFoto);
    // showProfilePicture();
    console.log("Esse é seu id para mostrar o perfil", id);
  }, [id]);

  const showProfile = async () => {
    const { data, error } = await supabase
      .from("usuarios")
      .select(
        `  id_usuario,
           nome_usuario,
           email,
           cla_usuario,
           cla: cla_usuario ( nome_cla )`
      )
      .eq("id_usuario", id);
    console.log(data);
    setData(data);

    if (error) {
      console.log(error);
    }
  };

  const getProfilePictureId = async () => {
    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select(`id_fotoPerfil`)
        .eq("id_usuario", id)
        .single();

      if (error) throw error;

      setIdFoto(data.id_fotoPerfil);

      console.log(idFoto);
    } catch (error) {
      console.log(error);
    } finally {
      // showProfilePicture();
      //console.log(idFoto);
    }
  };

  const showProfilePicture = async () => {
    await getProfilePictureId();
    console.log(idFoto);
    if (idFoto == 1) {
      setFotoDePerfil(sapoPerfil);
      console.log("entrou no 1");
    } else if (idFoto == 2) {
      setFotoDePerfil(gatoPerfil);
      console.log("entrou no 2");
    } else if (idFoto == 3) {
      setFotoDePerfil(leaoPerfil);
    } else if (idFoto == 4) {
      setFotoDePerfil(girafaPerfil);
    } else {
      setFotoDePerfil(lagostaPerfil);
    }
  };

  return (
    <>
      <h1 id={styles.perfil}>Perfil</h1>

      {data &&
        data.map((user) => (
          <div id={styles.div} key={user.id_usuario}>
            <img id={styles.foto} src={fotoDePerfil} alt="Foto de Perfil" />
            <h2 id={styles.nome}>Nome: {user.nome_usuario}</h2>
            <h3 id={styles.email}>Email: {user.email}</h3>
            {user.cla && <p>Clã:{user.cla.nome_cla}</p>}
          </div>
        ))}
    </>
  );
};

export default Perfil;
