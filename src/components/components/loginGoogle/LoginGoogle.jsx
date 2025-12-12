import React, { useState } from "react";
import styles from "./LoginGoogle.module.css";
import MaleIcon from "@mui/icons-material/Male";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FemaleIcon from "@mui/icons-material/Female";
import { supabase } from "../../../Supabase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const LoginGoogle = () => {
  const [genero, setGenero] = useState("homem");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const navigate = useNavigate()
  const [checkbox, setCheckbox] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);

  const googleId = localStorage.getItem("googleId")
  const email = localStorage.getItem("email")

  const handleSubmit = async (e) => {
    
    if(checkbox===false){
      alert("Você deve concordar com os termos de uso para se cadastrar!");
      return
    }
    e.preventDefault();
    try{
      const { data, error } = await supabase.functions.invoke('cadastrar-google', {
        body: {
          nome_usuario: nomeUsuario,
          email: email,
          google_id: googleId,
          nascimento: dataNascimento,
          genero: genero,
        },
      });

        if (error) throw error;

        const { userId } = data;

        if (userId) {
            localStorage.setItem("userId", userId);
            alert("Cadastro Realizado com Sucesso!");
            navigate("/menu");
        } else {
            throw new Error("Erro ao obter ID do usuário.");
        }
    }
    catch (error){ 
      console.log(error);
      alert(error.message);
    }
    finally{
        localStorage.removeItem("googleId")
        localStorage.removeItem("email")
    }
  };

  return (
    <>
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>Faça seu cadastro</h1>

        <section className={styles.formulario}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.textArea}>
              <div className={styles.textArea}>
                <label className={styles.p} htmlFor="">Nome de Usuário</label>
                <input
                  className={styles.input}
                  id={styles.UsuarioNome}
                  type="text"
                  onChange={(e) => setNomeUsuario(e.target.value)}
                  value={nomeUsuario}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <label className={styles.p} htmlFor="">Data de nascimento</label>
                  <input
                    className={styles.input}
                    id={styles.UsuarioDataNascimento}
                    type="date"
                    onChange={(e) => setDataNascimento(e.target.value)}
                    value={dataNascimento}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "2rem" }}>
                  <label className={styles.p} htmlFor="">Gênero</label>
                  <button
                    className={`
                      ${styles.genero}
                      ${genero === "homem" ? styles.homem : ""}
                      ${genero === "mulher" ? styles.mulher : ""}
                      ${genero === "nbin"   ? styles.neutro : ""}
                    `}
                    onChange={(e) => setGenero(e.target.value)}
                    value={genero}
                    onClick={(e) => {
                      setGenero(
                        genero === "homem"
                          ? "mulher"
                          : genero === "mulher"
                          ? "nbin"
                          : "homem"
                      );
                      e.preventDefault();
                      console.log(genero);
                    }}
                  >
                    {genero === "homem" ? (<MaleIcon></MaleIcon>) : genero === "mulher" ? (<FemaleIcon></FemaleIcon>) : (<HorizontalRuleIcon></HorizontalRuleIcon>)}
                  </button>
                </div>
              </div>
              <div className={styles.termosMaisEmail}>
                  <div className={styles.linha}>
                    <input
                    className={`${styles.checkbox} ${checkbox ? styles.checkboxAtivo : ''}`}
                    onChange={(e) => setCheckbox(e.target.checked)}
                    checked={checkbox}
                    type="checkbox" name="" id="" />
                    <label className={styles.p} htmlFor="">Concordo com os termos do site <Link to="/termos">acesse aqui os termos e condições de uso do GinKQuiz</Link></label>
                  </div>
              
                  <div className={styles.linha}>
                    <input
                    className={`${styles.checkbox} ${checkbox2 ? styles.checkboxAtivo : ''}`}
                    onChange={(e) => setCheckbox2(e.target.checked)}
                    checked={checkbox2}
                    type="checkbox" name="" id="" />
                    <label className={styles.p} htmlFor="">Aceito receber informações sobre atualizações e resultados por email</label>
                  </div>
              
              </div>
                <button className={styles.cadastrar} type="submit">Cadastrar</button>
            </div>
          </form>
          
        </section>
      </div>
    </>
  );
};
