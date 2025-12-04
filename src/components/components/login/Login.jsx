import * as React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../Supabase";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";

import GinKQuizLogo from "../../../assets/icons/LogotipoGinKQuiz.png";
import MeuProgresso from "../../../assets/icons/MeuProgressoGinKQuiz.png";
import RankingClas from "../../../assets/icons/RankingGlobalGinKQuiz.png";
import Google from "../../../assets/icons/GoogleLogo.png";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [visivel, setVisivel] = React.useState(false);
  
  const navigate = useNavigate();

  const handleNavigate = () => {
    NavigateToMenu(email, senha);
  };

  const NavigateToMenu = async (email, senha) => {
    try {
        const { data, error } = await supabase.functions.invoke('login-usuario', {
        body: {
          email: email,
          senha: senha,
        },
      });
        if (error) throw error;
      
      const { userId } = data;

        if (userId) {
        localStorage.setItem("userId", userId);
          navigate("/menu");
        }
       else {
        alert("email ou senha incorretos");
      }

      if (error) throw error;
    } catch (error) {
      console.log(error)
      alert(error.message);
    }
  };

  const handleSucess = async (resposta)=>{
    
    const credencial = resposta.credential

    try{

      const dadosUsuario = jwtDecode(credencial)

        const userEmail = dadosUsuario.email;
        const googleId = dadosUsuario.sub;

      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("email", userEmail)
        .eq("google_id", googleId)

        if (data && data.length > 0) {
          localStorage.setItem("userId", data[0].id_usuario);
          navigate("/menu");
        }
        else{
          localStorage.setItem("googleId", googleId);
          localStorage.setItem("email", userEmail);
          navigate("/loginGoogle")
        }
      if (error) throw error;
    }
    catch(error){
      console.log(error)
      alert(error.message)
    }
  }

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.textContainer}>
          <div className={styles.textArea}>
            <div className={styles.title}>
              <h2>Bem vindo ao...</h2>
              <img
                className={styles.logo}
                src={GinKQuizLogo}
                alt="Logotipo GinKQuiz"
              />
            </div>
            <div className={styles.description}>
              <p>
                O <span>GinKQuiz</span> reúne perguntas sobre matérias escolares
                e a gincana. <br />
                Cada resposta certa vale pontos para sua você ou sua equipe!
                Aproveite nossos modos single player, global ranking e team
                play!
              </p>
            </div>
            <div className={styles.routes}>
              <Link to="rankings">
                <img
                  className={styles.icon}
                  src={RankingClas}
                  alt="Ranking de Classificação"
                />
              </Link>
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    className={styles.inputField}
                    type={visivel ? "text" : "password"}
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => {
                      setSenha(e.target.value);
                    }}
                  />
                </div>
              </Box>
              <div className={styles.visivel}>
                {visivel ? (
                  <VisibilityIcon
                    className={styles.visibilityIcon}
                    onClick={() => setVisivel(false)}
                  />
                ) : (
                  <VisibilityOff
                    className={styles.visibilityIcon}
                    onClick={() => setVisivel(true)}
                  />
                )}
              </div>
            </form>
            <div className={styles.box}>
              <p className={styles.ou}>ou</p>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleSucess(credentialResponse);
                }}
                onError={() => {
                  alert("Login Failed");
                }}
                useOneTap
              />
              <Button
                variant="contained"
                className={styles.Button}
                onClick={handleNavigate}
              >
                Entrar
              </Button>
            </div>
            <p className={styles.cadastroText}>
              Não tem cadastro? {""}
              <span className={styles.hyperlink}>
                <Link to="cadastro">Crie sua conta</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
