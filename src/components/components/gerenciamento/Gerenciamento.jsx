import React from "react";
import { supabase } from "../../../Supabase";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Gerenciamento.module.css";
import Logotipo from "../../../assets/icons/LogotipoGinKQuiz.png";

const Gerenciamento = () => {
  const id = localStorage.getItem("userId");

  const [temas, setTemas] = React.useState(null);
  const [perguntas, setPerguntas] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    fetchTemas();
    console.log("ID do usuario no gerenciamento:", id);
  }, []);

  const fetchTemas = async () => {
    const { data } = await supabase.from("temas").select("*");
    setTemas(data);
  };

  const fetchPerguntas = async (id_tema) => {
    const { data } = await supabase
      .from("perguntas")
      .select("*")
      .eq("tema_pergunta", id_tema);
    setPerguntas(data);
    console.log(data);
  };

  const NavigateQuestion = (idPergunta) => {
    navigate(`/pergunta/${idPergunta}`);
  };

  const DeleteQuestion = async (idPergunta) => {
    const { error: errorDica } = await supabase
      .from("dicas")
      .delete()
      .eq("pergunta_dica", idPergunta);

    if (errorDica) {
      console.log("erro ao deletar", errorDica);
    }

    const { data, error } = await supabase
      .from("perguntas")
      .delete()
      .eq("id_pergunta", idPergunta);

    console.log("pergunta deletada foi a pergunta numero", idPergunta);

    if (error) {
      console.log("error a deletar", error);
    }

    setPerguntas((PerguntasAntigas) => {
      PerguntasAntigas.filter((pergunta) => pergunta.id_pergunta !== idPergunta);
    });
  };
  return (
    <div id={styles.container}>
      <img id={styles.logoGinKQuiz} src={Logotipo} alt="Logotipo GinKQuiz" />

      <div id={styles.divTables}>
        <table id={styles.tabela}>
          <tbody id={styles.tabelaMateriasContainer}>
            {temas &&
              temas.map((tema) => (
                <tr key={tema.id_tema}>
                  <td id={styles.tabelaMaterias} onClick={() => fetchPerguntas(tema.id_tema)}>
                    {tema.nome_tema}
                  </td>
                </tr>
              ))}
            <tr></tr>
          </tbody>
        </table>
        <table id={styles.tabelaPerguntasContainer} >
          <tbody id={styles.tabelaPerguntas}>
            {perguntas &&
              perguntas.map((pergunta) => (
                <tr key={pergunta.id_pergunta}>
                  {/* <td onClick={()=>{console.log(pergunta.id_pergunta)}} > <Link to={`/pergunta/${pergunta.id_pergunta}`}>{pergunta.enunciado_pergunta}</Link></td> */}
                  {/* <Link to={`pergunta/${pergunta.id_pergunta}`}><td>{pergunta.enunciado_pergunta}</td></Link> */}
                  <td onClick={() => NavigateQuestion(pergunta.id_pergunta)}>
                    {pergunta.enunciado_pergunta}
                  </td>
                  <td>
                    <Link id={styles.atualizarTema} to={`/pergunta/edit/${pergunta.id_pergunta}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                      </svg>
                    </Link>
                  </td>
                  <td>
                    <button
                      id={styles.botaoSair} onClick={() => DeleteQuestion(pergunta.id_pergunta)}
                    ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                    </button>
                  </td>
                </tr>
              ))}
            <tr id={styles.containercriarnova}>
              <td id={styles.criarnova}>
                <Link to="/CriarPergunta">criar uma nova pergunta</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <button onClick={() => console.log(temas)}>mostrar temas</button> */}
    </div>
  );
};

export default Gerenciamento;
