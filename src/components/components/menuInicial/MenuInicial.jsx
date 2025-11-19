import React, { use } from "react";
import styles from "./MenuInicial.module.css";
import { supabase } from "../../../Supabase";
import { EntrarCla }  from "../../../components/components/entrarCla/EntrarCla.jsx";
import MeuCla from "../../../components/components/MeuCla/MeuCla.jsx";

import { GlobalContext } from "../../../context/GlobalContext.jsx";
import GinKQuizLogo from "../../../assets/icons/LogotipoGinKQuiz.png";
import { Link } from "react-router-dom";
import { useContext } from "react";

export const MenuInicial = () => {
  const [dataclan, setDataclan] = React.useState(null);

  const [data, setData] = React.useState(null);

  const { id, setId } = useContext(GlobalContext);

  const [descripition, setDescription] = React.useState(false);

  const [hasCla, setHasCla] = React.useState(false);

  React.useEffect(() => {
    // showClanInfo();
    ClaCheck()
  }, []);

  const showClanInfo = async () => {
    const { data, error } = await supabase.from("cla").select("*");
    console.log(data);
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
      // .eq("id_usuario", id);
    console.log(data);
  };

  const hasTeam = async () => {
    console.log("Usuario tem cla?", id);
    const { data } = await supabase
      .from("usuarios")
      .select("cla_usuario")
      .eq("id_usuario", id);
      setHasCla(data)
      if (data.cla_usuario != null) {
        setHasCla(true);
      } else {
        setHasCla(false);
      }
    console.log(data);
  };

  // const checkHasTeam = async () => {
  //   if (!id) return;
  //   console.log("Verificando se usuário tem clã. id:", id);
  //   const { data, error } = await supabase
  //     .from("usuarios")
  //     .select("*")
  //     .eq("id_usuario", id);

  //   if (error) {
  //     console.log("erro ao buscar usuário:", error);
  //     setHasCla(false);
  //     return;
  //   }

  //   const user = Array.isArray(data) ? data[0] : data;
  //   if (user && user.equipe_usuario != null) {
  //     setHasCla(true);
  //   } else {
  //     setHasCla(false);
  //   }
  //   console.log("usuario retornado:", user);
  // };

  const ClaCheck = async () => {
    try{
      let { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id_usuario", id)
        .single();

        if (error) return error;
  
        console.log("Dados do usuário para verificação de clã:", data);
        if (data.cla_usuario != null) {
          setHasCla(true);
        } else {
          setHasCla(false);
        }
    }
    catch(error){
      alert(error.message)
    }

  }

  const ClaDescription = () => {
    console.log("entrou");
    console.log(descripition);
    setDescription(!descripition);
  };

  
  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <img className={styles.logo} src={GinKQuizLogo} alt="Logotipo GinKQuiz" />

        <div className={styles.botoes}>
          <Link to="/jogar"><button className={styles.jogar} onClick={()=>console.log(id)}>Jogar</button></Link>
          <Link to="/rankings"><button className={styles.rankings}>Rankings</button></Link>
        </div>
      </div>
      <div className={styles.box2}>
        {hasCla === true ?  (<MeuCla/>) : (<EntrarCla/>)}
      </div>
    </div>
  );
};
