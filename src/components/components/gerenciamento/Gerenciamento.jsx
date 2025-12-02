import React from "react";
import { supabase } from "../../../Supabase";
import { Link, useNavigate } from "react-router-dom";

const Gerenciamento = () => {
  const id = localStorage.getItem("userId");

  const [temas, setTemas] = React.useState(null);
  const [perguntas, setPerguntas] = React.useState(null);

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

  const NavigateQuestion = (idPergunta)=>{
    navigate(`/pergunta/${idPergunta}`);
  }

    const DeleteQuestion = async (idPergunta)=>{
      const {data, error} = await supabase
      .from("perguntas")
      .delete()
      .eq("id_pergunta", idPergunta);

    }
  return (
    <>
      <div>Gerenciamento</div>

      <div style={{ display: "flex" }}>
        <table>
          <tbody>
            {temas &&
              temas.map((tema) => (
                <tr key={tema.id_tema}>
                  <td onClick={() => fetchPerguntas(tema.id_tema)}>
                    {tema.nome_tema}
                  </td>
                </tr>
              ))}
            <tr></tr>
          </tbody>
        </table>
        <table>
          <tbody>
            {perguntas &&
              perguntas.map((pergunta) => (
                <tr key={pergunta.id_pergunta}>
                  {/* <td onClick={()=>{console.log(pergunta.id_pergunta)}} > <Link to={`/pergunta/${pergunta.id_pergunta}`}>{pergunta.enunciado_pergunta}</Link></td> */}
                  {/* <Link to={`pergunta/${pergunta.id_pergunta}`}><td>{pergunta.enunciado_pergunta}</td></Link> */}
                  <td onClick={()=> NavigateQuestion(pergunta.id_pergunta)}>{pergunta.enunciado_pergunta}</td>
                  <td><Link to={`/pergunta/edit/${pergunta.id_pergunta}`}>Atualizar</Link></td>
                  <td ><button onClick={()=>DeleteQuestion(pergunta.id_pergunta)}>deletar</button></td>
                </tr>
              ))}
            <tr>
              <td><Link to='/CriarPergunta'>criar uma nova</Link></td>
            </tr>
          </tbody>
        </table>
      </div>

      <button onClick={() => console.log(temas)}>mostrar temas</button>
    </>
  );
};

export default Gerenciamento;
