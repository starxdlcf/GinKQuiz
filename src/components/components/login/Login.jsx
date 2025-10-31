import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import styles from "./Login.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const Login = () => {
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.textContainer}>
          <div className={styles.textArea}>
            <div className={styles.title}>
              <h2>Bem vindo ao...</h2>
              <h1>GinKQuiz</h1>
            </div>
            <div className={styles.description}>
              <p>
                O GinKQuiz reúne perguntas sobre matérias escolares e a gincana.{" "}
                <br />
                Cada resposta certa vale pontos para sua você ou sua equipe!
                Aproveite nossos modos single player, global ranking e team
                play!
              </p>
            </div>
          </div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.loginBox}>
            <form action="" className={styles.form}>
              <Box className={styles.box}>
                <TextField
                  className={styles.TextField}
                  label="Email"
                  variant="filled"
                ></TextField>
                <TextField
                  className={styles.TextField}
                  label="Senha"
                  variant="outlined"
                  type="password"
                ></TextField>
              </Box>
            </form>
            <div className={styles.box}>
              <p>ou</p>
              <Button variant="contained" className={styles.Button}>
                Entrar com Google
              </Button>
              <Button variant="contained" className={styles.Button}>
                Login
              </Button>
            </div>
            <p>
              Não tem cadastro? {''}
              <span className={styles.hyperlink}>Crie sua conta</span>
            </p>
          </div>
        </div>
      </div>

      {/* <div className={styles.container}>
        <div className={styles.areaContainer}>

        <div className={styles.textBox}>
          <div className={styles.textArea}>
            <div className={styles.title}>
              <h2>Bem vindo ao...</h2>
              <h1>GinKQuiz</h1>
            </div>

            <div className={styles.description}>
              <p>
                O GinKQuiz reúne perguntas sobre matérias escolares e a gincana.{" "}
                <br />
                Cada resposta certa vale pontos para sua você ou sua equipe!
                Aproveite nossos modos single player, global ranking e team
                play!
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className={styles.loginBox}>
            <div className={styles.loginArea}>

            <form action="" className={styles.form}>

            <TextField id="filled-basic" label="Email" variant="filled" />
            <TextField id="filled-basic" label="Senha" variant="filled" />

            </form>
            </div>
             <Button variant="contained">Login</Button> 
         </div>
          </div> 
                 
     <Stack spacing={2} direction="row">
     <Button variant="text">Text</Button>
     <Button variant="contained">Contained</Button>
     <Button variant="outlined">Outlined</Button>
     </Stack> 
      </div>
     </div> */}
    </>
  );
};
