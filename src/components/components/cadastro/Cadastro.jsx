import React from "react";
import styles from "./Cadastro.module.css";
import * as Mui from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
export const Cadastro = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <>
      <div className={styles.container}>
        <h1>Faça seu cadastro</h1>

        <section className={styles.formulario}>
          <form className={styles.form}>
            <div>
              <label htmlFor="">Nome completo</label>
              <input className={styles.input} type="text" />
            </div>
            <div>
              <label htmlFor="">Nome de Usuário</label>
              <input className={styles.input} type="text" />
            </div>
            <div>
              <label htmlFor="">Data de nascimento</label>
              <input className={styles.input} type="date" />
              <label htmlFor=""></label>
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input className={styles.input} type="text" />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="">Senha</label>
              <input
                className={styles.input}
                type={passwordVisible ? "password" : "text"}
              />{" "}
              {passwordVisible ? (
                <VisibilityIcon
                  style={{ color: "white" }}
                  onClick={() => setPasswordVisible(false)}
                />
              ) : (
                <VisibilityOff
                  style={{ color: "white" }}
                  onClick={() => setPasswordVisible(true)}
                />
              )}
            </div>
            <div>
              <label htmlFor="">Confirmar senha</label>
              <input
                className={styles.input}
                type={passwordVisible ? "password" : "text"}
              />
            </div>
          </form>
        </section>
      </div>
    </>
  );
};
