import React, { useState } from "react";
import styles from "./Cadastro.module.css";
import MaleIcon from "@mui/icons-material/Male";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FemaleIcon from "@mui/icons-material/Female";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { supabase } from "../../../Supabase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReCAPTCHA from 'react-google-recaptcha';

export const Cadastro = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [genero, setGenero] = useState("homem");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate();
  const [checkbox, setCheckbox] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [loading, setLoading] = useState(false); // Novo estado para feedback de carregamento
  
  const recaptchaRef = React.useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(senha !== confirmarSenha){
      alert("As senhas não coincidem!");
      return;
    }
    if(!email.includes('@')){
      alert("Email inválido!");
      return;
    }
    if(!checkbox){
      alert("Você deve concordar com os termos de uso para se cadastrar!");
      return;
    }

    const token = recaptchaRef.current.getValue();
    
    if (!token) {
      alert('Por favor, complete o reCAPTCHA.');
      return;
    }
    
    setLoading(true); // Ativa indicador de carregamento

    try {
        const { data, error } = await supabase.functions.invoke('criar-usuario', {
          body: {
            nome_usuario: nomeUsuario,
            email: email,
            nascimento: dataNascimento,
            senha: senha,
            genero: genero,
            captchaToken: token 
          }
        });

        // Verifica se houve erro retornado pela função ou pela rede
        if (error) throw error;
        
        // Sucesso
        alert("Cadastro Realizado com Sucesso!");
        navigate("/");

     } catch (error) { 
        console.error("Erro no cadastro:", error);
        
        // Tratamento de mensagem de erro
        let errorMsg = "Erro desconhecido.";
        if (error instanceof Error) {
            errorMsg = error.message;
        } else if (typeof error === 'object' && error !== null && 'message' in error) {
             // Tenta pegar a mensagem de erro do corpo da resposta, se disponível
             errorMsg = error.message; 
        }

        alert("Erro ao cadastrar: " + errorMsg);
        
        // Reseta o captcha em caso de erro para permitir nova tentativa
        if (recaptchaRef.current) {
            recaptchaRef.current.reset();
        }
     } finally {
        setLoading(false); // Desativa carregamento
     }
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Faça seu cadastro</h1>

        <section className={styles.formulario}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="UsuarioNome">Nome de Usuário</label>
              <input
                className={styles.input}
                id="UsuarioNome"
                type="text"
                onChange={(e) => setNomeUsuario(e.target.value)}
                value={nomeUsuario}
                required
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
                <label htmlFor="UsuarioDataNascimento">Data de nascimento</label>
                <input
                  className={styles.input}
                  id="UsuarioDataNascimento"
                  type="date"
                  onChange={(e) => setDataNascimento(e.target.value)}
                  value={dataNascimento}
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "2rem" }}>
                <label>Gênero</label>
                <button
                  type="button" // Importante para não submeter o form
                  className={`
                    ${styles.genero}
                    ${genero === "homem" ? styles.homem : ""}
                    ${genero === "mulher" ? styles.mulher : ""}
                    ${genero === "nbin"   ? styles.neutro : ""}
                  `}
                  value={genero}
                  onClick={(e) => {
                    e.preventDefault();
                    setGenero(
                      genero === "homem"
                        ? "mulher"
                        : genero === "mulher"
                        ? "nbin"
                        : "homem"
                    );
                  }}
                >
                  {genero === "homem" ? (<MaleIcon />) : genero === "mulher" ? (<FemaleIcon />) : (<HorizontalRuleIcon />)}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="UsuarioEmail">Email</label>
              <input
                className={styles.input}
                id="UsuarioEmail"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label htmlFor="UsuarioSenha">Senha</label>
              <input
                onChange={(e) => setSenha(e.target.value)}
                value={senha}
                className={styles.input}
                id="UsuarioSenha"
                type={passwordVisible ? "text" : "password"} // Correção logica (text se visivel, password se não)
                required
              />{" "}
              {passwordVisible ? (
                <VisibilityIcon
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => setPasswordVisible(false)}
                />
              ) : (
                <VisibilityOff
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => setPasswordVisible(true)}
                />
              )}
            </div>
            <div>
              <label htmlFor="UsuarioConfirmarSenha">Confirmar senha</label>
              <input
                onChange={(e) => setConfirmarSenha(e.target.value)}
                value={confirmarSenha}
                className={styles.input}
                id="UsuarioConfirmarSenha"
                type={passwordVisible ? "text" : "password"}
                required
              />
            </div>

            <div className={styles.termosMaisEmail}>
                <div className={styles.linha}>
                  <input
                  className={`${styles.checkbox} ${checkbox ? styles.checkboxAtivo : ''}`}
                  onChange={(e) => setCheckbox(e.target.checked)}
                  checked={checkbox}
                  type="checkbox" 
                  id="termosCheckbox"
                  />
                  <label className={styles.terminho} htmlFor="termosCheckbox">Concordo com os termos do site <Link to="/termos">acesse aqui os termos e condições de uso do GinKQuiz</Link></label>
                </div>
              
                <div className={styles.linha}>
                  <input
                  className={`${styles.checkbox} ${checkbox2 ? styles.checkboxAtivo : ''}`}
                  onChange={(e) => setCheckbox2(e.target.checked)}
                  checked={checkbox2}
                  type="checkbox" 
                  id="newsletterCheckbox"
                  />
                  <label className={styles.terminho} htmlFor="newsletterCheckbox">Aceito receber informações sobre atualizações e resultados por email</label>
                </div>
            </div> 

              <ReCAPTCHA
                sitekey="6LdGmB8sAAAAAJOFRvY9rrfayWBaGg8J5aQqWAxb"
                ref={recaptchaRef}
              />

              <button 
                className={styles.cadastrar} 
                type="submit" 
                disabled={loading} // Desabilita botão durante o load
              >
                {loading ? "Carregando..." : "Cadastrar"}
              </button>
          </form>
          
        </section>
      </div>
    </>
  );
};