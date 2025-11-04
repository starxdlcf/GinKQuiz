import * as React from "react";
import Stack from "@mui/material/Stack";
import styles from "./Login.module.css";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import GinKQuizLogo from "../../../assets/icons/LogotipoGinKQuiz.png";
import MeuProgresso from "../../../assets/icons/MeuProgressoGinKQuiz.png";
import RankingClas from "../../../assets/icons/RankingDeClasGinKQuiz.png";
import Google from "../../../assets/icons/GoogleLogo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const navigate = useNavigate();


  const handleNavigate = () => {
    navigate("/cadastro");
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
                />
                <input
                  className={styles.inputField}
                  type="password"
                  placeholder="Senha"
                />
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
