import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../Supabase";
import { useNavigate } from "react-router-dom";

const PerguntaEdit = () => {
  useEffect(() => {
    fetchPergunta(id);
    fetchDica(id);
  }, []);
  const { id } = useParams();
    const navigate = useNavigate();
  const [dataPergunta, setDataPergunta] = React.useState(null);

  const [NovoEnunciado, setNovoEnunciado] = React.useState("");
  const [NovaAlternativa1, setNovaAlternativa1] = React.useState("");
  const [NovaAlternativa2, setNovaAlternativa2] = React.useState("");
  const [NovaAlternativa3, setNovaAlternativa3] = React.useState("");
  const [NovaAlternativa4, setNovaAlternativa4] = React.useState("");
  const [NovaCorreta, setNovaCorreta] = React.useState("");


  const [dica,setDica] = React.useState("")

  const [dica_array,setDica_array] = React.useState([])



  const fetchPergunta = async (id) => {
    const { data } = await supabase
      .from("perguntas")
      .select("*")
      .eq("id_pergunta", id)
      .single(); // Usando
    setDataPergunta(data);
    console.log(data);
  };

  const updateQuestion = async (e) => {

    console.log("Atualizar pergunta");
    console.log(NovoEnunciado);
    console.log(NovaAlternativa1);
    console.log(NovaAlternativa2);
    console.log(NovaAlternativa3);
    console.log(NovaAlternativa4);
    console.log(NovaCorreta);

    const { data, error } = await supabase
      .from("perguntas")
      .update({
        enunciado_pergunta: NovoEnunciado || dataPergunta.enunciado_pergunta,
        alternativa1_pergunta: NovaAlternativa1 || dataPergunta.alternativa1_pergunta,
        alternativa2_pergunta: NovaAlternativa2 || dataPergunta.alternativa2_pergunta,
        alternativa3_pergunta: NovaAlternativa3 || dataPergunta.alternativa3_pergunta,
        alternativa4_pergunta: NovaAlternativa4 || dataPergunta.alternativa4_pergunta,
        resposta_pergunta: NovaCorreta || dataPergunta.resposta_pergunta,
      })
      .eq("id_pergunta", id);


      for(const element of dica_array){
        const {data: dicaData , error: dicaError} = await supabase
        .from("dicas")
        .update({
          info_dica: `${element}`
        })
        .eq("pergunta_dica", id)
      }
      if (error) {
        console.error("Erro ao atualizar a pergunta:", error);
        alert("Erro ao atualizar a pergunta.");
      } else {
        
        console.log("Pergunta atualizada com sucesso:", data);
        alert("Pergunta atualizada com sucesso!");
        navigate(-1)
      }
 
    };

    const fetchDica = async(id)=>{
      const {data}= await supabase
      .from("dicas")
      .select("*")
      .eq("pergunta_dica",id)

      console.log(data)

      const elementos = data.map(element=> element.info_dica)

      setDica_array(elementos)
    }

    const handleDeleteElementOnArray =(index)=>{
      const novo_array = dica_array.filter((_,i)=> i !==index)
      setDica_array(novo_array)
    }

  return (
    <>
      {dataPergunta ? (
        <div>
          <form action="" onSubmit={updateQuestion}>
            <input
              type="text"
              value={NovoEnunciado}
              onChange={(e) => {
                setNovoEnunciado(e.target.value);
              }}
              placeholder={dataPergunta.enunciado_pergunta}
            />
            {/* Formulário de edição aqui */}
            <div>
              <input
                type="text"
                value={NovaAlternativa1}
                onChange={(e) => setNovaAlternativa1(e.target.value)}
                placeholder={dataPergunta.alternativa1_pergunta}
              />
              <input type="checkbox" 
              onChange={()=>setNovaCorreta(NovaAlternativa1)}/>
              <input
                type="text"
                value={NovaAlternativa2}
                onChange={(e) => setNovaAlternativa2(e.target.value)}
                placeholder={dataPergunta.alternativa2_pergunta}
              />
              <input type="checkbox" 
              onChange={()=>setNovaCorreta(NovaAlternativa2)}/>
              <input
                type="text"
                value={NovaAlternativa3}
                onChange={(e) => setNovaAlternativa3(e.target.value)}
                placeholder={dataPergunta.alternativa3_pergunta}
              />
              <input type="checkbox" 
               onChange={()=>setNovaCorreta(NovaAlternativa3)}/>
              <input
                type="text"
                value={NovaAlternativa4}
                onChange={(e) => setNovaAlternativa4(e.target.value)}
                placeholder={dataPergunta.alternativa4_pergunta}
              />
              <input type="checkbox"
               onChange={()=>setNovaCorreta(NovaAlternativa4)} />
            <button type="submit" onClick={(e)=>{e.preventDefault(),updateQuestion()}}>atualizar</button>
            </div>
            <button onClick={(e)=> {e.preventDefault(),console.log(dica_array)}}>mostrar array</button>
              {dica_array.map((t,i)=>(
                <li key={i}>{t}
                <button onClick={(e)=>{e.preventDefault(),handleDeleteElementOnArray(i)}}>excluir</button>
                </li>
              ))}

              <input type="text" name="" id="" placeholder="inserir dica" value={dica} onChange={(e)=> setDica(e.target.value)} />
              <button onClick={(e)=>{e.preventDefault(),setDica_array([...dica_array, dica]),setDica("")}}>Nova dica</button>
          </form>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
};

export default PerguntaEdit;
