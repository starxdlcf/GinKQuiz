import * as React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../Supabase";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";

import GinKQuizLogo from "../../../assets/icons/LogotipoGinKQuiz.png";
import MeuProgresso from "../../../assets/icons/MeuProgressoGinKQuiz.png";
import RankingClas from "../../../assets/icons/RankingDeClasGinKQuiz.png";
import Google from "../../../assets/icons/GoogleLogo.png";

export const Login = () => {
  const [email,setEmail] = React.useState("")
  const [senha,setSenha] = React.useState("")
  
  const [visivel, setVisivel] = React.useState(false);
  const navigate = useNavigate();
  const handleNavigate = ()=>{
    NavigateToMenu(email, senha)
  } 
  
  const NavigateToMenu = async(senha, email) => {
    try{
      const {data, error} = await supabase
      .from("usuarios")
      .select("*")
      .eq("senha", senha)
      .eq("email", email);

      if( data !="" ){
        navigate("/menu");
        alert(data)
      } else{
        alert("email ou senha incorretos")
        alert(data)
      }

      if (error) throw error;
    } catch(error){

      alert(error.message);
    }

  }


  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.textContainer}>
          <div className={styles.textArea}>
            <div className={styles.title}>
              <h2>Bem vindo ao...</h2>
              <img className={styles.logo}
                src={GinKQuizLogo}
                alt="Logotipo GinKQuiz"
              />
            </div>
            <div className={styles.description}>
              <p>
                O <span>GinKQuiz</span> reúne perguntas sobre matérias escolares e a gincana.{" "}
                <br />
                Cada resposta certa vale pontos para sua você ou sua equipe!
                Aproveite nossos modos single player, global ranking e team
                play!
              </p>

            </div>
            <div className={styles.routes}>
              <img className={styles.icon} src={MeuProgresso} alt="Meu Progresso" />
              <img className={styles.icon} src={RankingClas} alt="Ranking de Classificação" />
            </div>
          </div>
        </div>
        <div className={styles.formContainer}>
            <h1 className={styles.titleBox}>Faça seu Login</h1>
          <div className={styles.loginBox}>
            <form action="" className={styles.form}>
              <Box className={styles.box} id={styles.inputBox}>
                <input
                  className={styles.inputField}
                  type="email"
                  placeholder="Email"
                  onChange={(e)=>{setEmail(e)}}
                />
                <div style={{display:"flex", alignItems:"center"}}>
                <input
                  className={styles.inputField}
                  type={ visivel ? "text" : "password" }
                  placeholder="Senha"
                  onChange={(e)=>{setSenha(e)}}
                  />
                  {
                    visivel ? <VisibilityIcon className={styles.visibilityIcon} onClick={ () => setVisivel(false) } />
                    :
                    <VisibilityOff className={styles.visibilityIcon} onClick={ () => setVisivel(true) } />
                  }
                  </div>
              </Box>
            </form>
            <div className={styles.box}>
              <p className={styles.ou}>ou</p>
              <p id={styles.botaoGoogle} variant="contained" className={styles.p}> <img className={styles.googleLogo} src={Google} alt="Google Logo" />
                Entrar com o Google
              </p>
              <Button variant="contained" className={styles.Button} onClick={handleNavigate} >
                Entrar
              </Button>
            </div>
            <p className={styles.cadastroText}>
              Não tem cadastro? {""}
              <span className={styles.hyperlink}><Link to="cadastro">Crie sua conta</Link></span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
