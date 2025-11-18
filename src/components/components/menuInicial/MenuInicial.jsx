import React, { use } from "react";
import styles from "./MenuInicial.module.css";
import { supabase } from "../../../Supabase";
import { EntrarCla }  from "../../../components/components/EntrarCla/EntrarCla.jsx";
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
      // .eq("id_usuario", id);
    console.log(data);
  };

  // const hasTeam = async () => {
  //   console.log("Usuario tem cla?", id);
  //   const { data } = await supabase
  //     .from("usuarios")
  //     .select("*")
  //     .eq("id_usuario", id);
  //     setHasCla(data)
  //     if (data.equipe_usuario != null) {
  //       setHasCla(true);
  //       hasTeam = true;
  //       return <EntrarCla/>;
  //     } else {
  //       setHasCla(false);
  //       hasTeam = false;
  //       <MeuCla/>;
  //     }
  //   console.log(data);
  // };

  const checkHasTeam = async () => {
    if (!id) return;
    console.log("Verificando se usuário tem clã. id:", id);
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id_usuario", id);

    if (error) {
      console.log("erro ao buscar usuário:", error);
      setHasCla(false);
      return;
    }

    const user = Array.isArray(data) ? data[0] : data;
    if (user && user.equipe_usuario != null) {
      setHasCla(true);
    } else {
      setHasCla(false);
    }
    console.log("usuario retornado:", user);
  };

  const ClaCheck = async (x) => {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id_usuario", id)
      .single();

      console.log("Dados do usuário para verificação de clã:", data);
    if (data.equipe_usuario != null) {
      setHasCla(true);
    } else {
      setHasCla(false);
    }

  }

  const ClaDescription = () => {
    console.log("entrou");
    console.log(descripition);
    setDescription(!descripition);
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
      const { data } = await supabase
      .from('cla')
      .select('*')
      .eq('id_equipe', x)
      .single();
      
      data.quantidade_atual_equipe += 1;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <img className={styles.logo} src={GinKQuizLogo} alt="Logotipo GinKQuiz" />

        <div className={styles.botoes}>
          <button className={styles.jogar} onClick={()=>console.log(id)}>Jogar</button>
          <button className={styles.rankings}>Rankings</button>
        </div>
      </div>
      <div className={styles.box2}>
        {hasCla === true ?  <MeuCla/> : <EntrarCla/>}
      </div>
    </div>
  );
};
