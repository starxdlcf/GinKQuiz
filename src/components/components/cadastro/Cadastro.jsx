import React, { useState } from "react";
import styles from "./Cadastro.module.css";
import IconButton from "@mui/material/IconButton";
import MaleIcon from "@mui/icons-material/Male";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FemaleIcon from "@mui/icons-material/Female";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { supabase } from "../../../Supabase";

export const Cadastro = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const [genero, setGenero] = useState("homem");

  const [nomeUsuario, setNomeUsuario] = useState("");

  const [email, setEmail] = useState("");

  const [dataNascimento, setDataNascimento] = useState("");

  const [senha, setSenha] = useState("");

  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [info, setInfo] = useState([]);

  const handleShow = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .order("created_at", { ascending: true });

    setInfo(data);

    console.log(info);
  };

  const handleSubmit = async (e) => {
    if(senha!==confirmarSenha){
      alert("As senhas não coincidem!");
      return;
    }
    e.preventDefault();
    console.log("Form submitted");
    const { error } = await supabase
      .from("usuarios")
      .insert([
        {
          nome_usuario: `${nomeUsuario}`,
          email: `${email}`,
          nascimento: `${dataNascimento}`,
          senha: `${senha}`,
          genero: `${genero}`,
        },
      ]);
      if (error) {
        console.log(error);
        alert("Erro ao inserir dados: ", error.message);
      }

  };

  return (
    <>
      <div className={styles.container}>
        <h1>Faça seu cadastro</h1>

        <section className={styles.formulario}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">Nome de Usuário</label>
              <input
                className={styles.input}
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
                <label htmlFor="">Data de nascimento</label>
                <input
                  className={styles.input}
                  type="date"
                  onChange={(e) => setDataNascimento(e.target.value)}
                  value={dataNascimento}
                />
              </div>
              <div>
                <button
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
                  {genero === "homem" ? (
                    <MaleIcon></MaleIcon>
                  ) : genero === "mulher" ? (
                    <FemaleIcon></FemaleIcon>
                  ) : (
                    <HorizontalRuleIcon></HorizontalRuleIcon>
                  )}
                </button>

                <IconButton aria-label="Male"></IconButton>
              </div>
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input
                className={styles.input}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="">Senha</label>
              <input
                onChange={(e) => setSenha(e.target.value)}
                value={senha}
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
                onChange={(e) => setConfirmarSenha(e.target.value)}
                value={confirmarSenha}
                className={styles.input}
                type={passwordVisible ? "password" : "text"}
              />

            </div>
              <button type="submit">Cadastrar</button>
          </form>
          {/* <button onClick={handleShow}>mostrar</button> */}
        </section>
      </div>
    </>
  );
};
