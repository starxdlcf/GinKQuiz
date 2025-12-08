import React, { useEffect, useEffectEvent } from "react";
import { supabase } from "../../../Supabase";
import { useState } from "react";
import styles from "../criarCla/criarCla.module.css";
import { useNavigate } from "react-router-dom";

const CriarCla = () => {
  const [nome_equipe, setNome_equipe] = useState("");
  const [descricao_equipe, setDescricao_equipe] = useState("");
  const [quantidade_limite_equipe, setQuantidade_limite_equipe] = useState(0);
  const [pontuacao_min_equipe, setPontuacao_min_equipe] = useState(0);
  const [idCla, setIdCla] = useState(null);
  const navigate = useNavigate();

  const id = localStorage.getItem("userId");

  useEffect(() => {
    showClas();
    setIdCla(null)
  }, []);


//   useEffect(()=>{
//     console.log(idCla.id_cla)
//   },[idCla])


  const showClas = async () => {
    const { data } = await supabase.from("cla").select("*");

    console.log(data);
  };

  const CadastroCla = async (e) => {
    e.preventDefault();

    if (
      (nome_equipe.length > 0 && nome_equipe.length <= 25) ||
      (descricao_equipe.length > 0 && descricao_equipe.length <= 100)
    ) {
      const { error } = await supabase.from("cla").insert([
        {
          nome_cla: `${nome_equipe}`,
          descricao_cla: `${descricao_equipe}`,
          quantidade_limite_cla: `${quantidade_limite_equipe}`,
          min_pontos_entrar: `${pontuacao_min_equipe}`,
        },
      ]);

      alert("Seu clã foi criado!!!");
      showClas()
      getId()

      // console.log(nome_cla,descricao_cla,quantidade_limite_cla,pontuacao_min_cla);
      if (error) {
        console.log(error);
        alert("Erro ao criar clã: ", error.message);
      }
    } else {
      alert(
        "Nome do clã deve ter entre 1 e 15 caracteres. Descrição deve ter no máximo 100 caracteres."
      );
    }
  };

  const getId = async () => {
    console.log('teste')
    const { data, error } = await supabase
      .from("cla")
      .select("id_cla")
      .eq("nome_cla", nome_equipe)
      .single();

    setIdCla(data);
    console.log('essa é a data do clã que vc acabou d criar',data)
    AddMember(idCla.id_cla);
  };

  const AddMember = async () => {
    
    const { error } = await supabase
      .from("usuarios")
      .update({
        cla_usuario: `${idCla}`,
      })
      .eq("id_usuario", id);

      navigate("/menu");
      
      if (error) {
          console.log(error);
          alert("Erro ao criar clã: ", error.message);
          return
        }
        alert("vc foi adicionado ao seu proprio cla");
  };

  return (
    <div className={styles.criarClaContainer}>
      <div className={styles.ContainerNovoCla}>
        <h1 className={styles.h1}>Criar um clã</h1>
        <form className={styles.form} action="" onSubmit={CadastroCla}>
          <div className={styles.row}>
            <label className={styles.label} htmlFor="">
              Nome do clã
            </label>
            <input
              className={styles.input}
              type="text"
              onChange={(e) => setNome_equipe(e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="">
              Descrição do clã
            </label>
            <input
              className={styles.input}
              type="text"
              onChange={(e) => {
                setDescricao_equipe(e.target.value);
              }}
            />
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="">
              Número máximo de participantes
            </label>
            <select
              name=""
              id=""
              onChange={(e) => setQuantidade_limite_equipe(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </div>

          <div className={styles.row}>
            <label className={styles.label} htmlFor="">
              Mínimo de pontos
            </label>
            <select
              onChange={(e) => setPontuacao_min_equipe(e.target.value)}
              name=""
              id=""
            >
              <option value="0">0</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
              <option value="1500">1500</option>
              <option value="2000">2000</option>
              <option value="2500">2500</option>
              <option value="3000">3000</option>
            </select>
          </div>

          <button id={styles.buttonCriarCla} type="submit">
            Criar Clã
          </button>
        </form>

        {/* <button onClick={ShowId}>mostrar id</button> */}
      </div>
    </div>
  );
};
export default CriarCla;
