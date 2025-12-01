import React from "react";
import { supabase } from "../../../Supabase";
import { Link } from "react-router-dom";

const Gerenciamento = () => {
  const id = localStorage.getItem("userId");

  const [temas, setTemas] = React.useState(null);
  const [perguntas, setPerguntas] = React.useState(null);

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
                  <td>{pergunta.enunciado_pergunta}</td>
                  <td><Link to=''>Atualizar</Link></td>
                  <td>deletar</td>
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
