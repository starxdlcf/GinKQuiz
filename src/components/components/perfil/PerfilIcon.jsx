import React from "react";
import { Link } from "react-router-dom";
import styles from "./PerfilIcon.module.css";
import sapoPerfil from "../../../assets/icons/sapo.png";
import gatoPerfil from "../../../assets/icons/gato.png";
import leaoPerfil from "../../../assets/icons/leao.png";
import girafaPerfil from "../../../assets/icons/girafa.png";
import lagostaPerfil from "../../../assets/icons/lagosta.png";
import { supabase } from "../../../Supabase";

const PerfilIcon = () => {
  const id = localStorage.getItem("userId");
  const [fotoDePerfil, setFotoDePerfil] = React.useState(null);

  React.useEffect(() => {
    const getProfilePicture = async () => {
      try {
        if (!id) return;

        const { data, error } = await supabase
          .from("usuarios")
          .select("id_fotoPerfil")
          .eq("id_usuario", id)
          .single();

        if (error) throw error;

        const idFoto = data?.id_fotoPerfil;

        // Map idFoto to image
        switch (idFoto) {
          case 1:
            setFotoDePerfil(sapoPerfil);
            break;
          case 2:
            setFotoDePerfil(gatoPerfil);
            break;
          case 3:
            setFotoDePerfil(leaoPerfil);
            break;
          case 4:
            setFotoDePerfil(girafaPerfil);
            break;
          case 5:
            setFotoDePerfil(lagostaPerfil);
            break;
          default:
            console.log("nenhuma foto selecionada");
        }
      } catch (error) {
        console.error("Erro ao buscar foto de perfil:", error);
      }
    };

    getProfilePicture();
  }, [id]);

  return (
    <Link to="perfil">
      <img id={styles.narci} src={fotoDePerfil} alt="Perfil" />
    </Link>
  );
};

export default PerfilIcon;
