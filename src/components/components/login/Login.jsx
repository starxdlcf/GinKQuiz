import * as React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../Supabase";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { logEvent, logError } from '../../../utils/loggers.js';

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
    // [LOG INÍCIO] Registra que alguém clicou no botão
    logEvent('AUTH', 'Tentativa de login iniciada', { email });

    const { data, error } = await supabase.functions.invoke('login-usuario', {
      body: {
        email: email,
        senha: senha,
      },
    });

    // Se a Edge Function der erro técnico (500, timeout), cai no catch lá embaixo
    if (error) throw error;

    const { userId } = data || {}; // Proteção caso data venha null

    if (userId) {
      // [LOG SUCESSO] O usuário existe e o ID veio
      logEvent('AUTH', 'Login realizado com sucesso', { userId });
      
      localStorage.setItem("userId", userId);
      navigate("/menu");
    } else {
      // [LOG FALHA DE LÓGICA] A função rodou, mas não devolveu userId (senha errada?)
      logEvent('AUTH', 'Falha de login: Credenciais inválidas ou usuário não encontrado');
      
      alert("email ou senha incorretos");
    }

  } catch (error) {
    // [LOG ERRO TÉCNICO] Aqui pegamos erros de rede, servidor fora do ar, etc.
    logError('AUTH', 'Erro crítico na requisição de login', error);
    
    // Mantemos o alert para o usuário saber que deu ruim
    alert(error.message || "Erro desconhecido ao tentar logar");
  }
};


const handleSucess = async (resposta) => {
  const credencial = resposta.credential;

  try {
    // [LOG] 1. Recebemos o token do Google
    logEvent('AUTH', 'Callback do Google recebido. Processando token...');

    const dadosUsuario = jwtDecode(credencial);
    const userEmail = dadosUsuario.email;
    const googleId = dadosUsuario.sub;

    // [LOG] 2. Sabemos quem é (sem logar senha ou token completo)
    logEvent('AUTH', 'Verificando usuário Google no banco', { email: userEmail });

    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", userEmail)
      .eq("google_id", googleId);
    
    // Boa prática: Verificar erro do banco antes de usar 'data'
    if (error) throw error;

    if (data && data.length > 0) {
      // [LOG] 3A. Caminho Feliz: Usuário já existe
      logEvent('AUTH', 'Login Google: Usuário encontrado', { userId: data[0].id_usuario });

      localStorage.setItem("userId", data[0].id_usuario);
      navigate("/menu");
    } else {
      // [LOG] 3B. Caminho de Cadastro: Usuário novo
      logEvent('AUTH', 'Login Google: Usuário não cadastrado via Google. Redirecionando...');

      localStorage.setItem("googleId", googleId);
      localStorage.setItem("email", userEmail);
      navigate("/loginGoogle");
    }

  } catch (error) {
    // [LOG] 4. Erro
    logError('AUTH', 'Erro no fluxo de login Google', error);
    
    alert(error.message || "Erro ao processar login com Google");
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
