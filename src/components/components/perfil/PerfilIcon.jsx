import React from 'react'
import { Link } from 'react-router-dom'
import styles from './PerfilIcon.module.css'
import sapoPerfil from "../../../assets/icons/sapo.png"
import gatoPerfil from "../../../assets/icons/gato.png"
import leaoPerfil from "../../../assets/icons/leao.png"
import girafaPerfil from "../../../assets/icons/girafa.png"
import lagostaPerfil from "../../../assets/icons/lagosta.png"



const PerfilIcon = () => {
  const id = localStorage.getItem("userId");
  const [idFoto,setIdFoto] = React.useState(null);
  const [fotoDePerfil,setFotoDePerfil] = React.useState(null);

  React.useEffect(() => {
      getProfilePictureId(idFoto);
      showProfilePicture();
    }, []);
  
    React.useEffect(() => {
      getProfilePictureId(idFoto);
      // showProfilePicture();
    }, [id]);
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
       } else if( idFoto == 5){
         setFotoDePerfil(lagostaPerfil);
       }
     };
   

  return (
     <Link to="perfil"><img id={styles.narci} src={fotoDePerfil} alt="Perfil" /></Link>
  )
}

export default PerfilIcon