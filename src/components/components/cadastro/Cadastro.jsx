import React, { useState } from "react";
import styles from "./Cadastro.module.css";
import * as Mui from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MaleIcon from '@mui/icons-material/Male'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import FemaleIcon from '@mui/icons-material/Female';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
export const Cadastro = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const [genero, setGenero] = useState("homem")

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
            <div style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>
              <div >
              <label htmlFor="">Data de nascimento</label>
              <input className={styles.input} type="date" />
              </div>
                <div>
          
                <button onClick={(e)=>{ setGenero(genero === "homem" ? "mulher" : genero ==="mulher"? "nbin":"homem"); e.preventDefault();console.log(genero)}}>{ genero==="homem"? <MaleIcon></MaleIcon> : genero ==="mulher"? <FemaleIcon></FemaleIcon> : <HorizontalRuleIcon></HorizontalRuleIcon>}</button>
                
                <IconButton aria-label="Male"></IconButton>
                </div>
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
