import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../Supabase";
import { useNavigate } from "react-router-dom";
import styles from "../../components/PerguntaEdit/PerguntaEdit.module.css"

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

      
            if (error) {
              console.error("Erro ao atualizar a pergunta:", error);
              alert("Erro ao atualizar a pergunta.");
            } else {


      const {error: deleteError} = await supabase
      .from('dicas')
      .delete()
      .eq("pergunta_dica", id)

      if(deleteError){
        console.log('deu erro na hora de deleta pergunta', deleteError)
      }

      for (const element of dica_array){

        const {error: insertError} = await supabase
        .from('dicas')
        .insert([{
          pergunta_dica: `${id}`,
          info_dica: `${element}`
        }])

if(insertError){
  console.log('deu erro na hora de fazer o insert de cada dica',insertError)
}
      }

        
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
          <div className={styles.form}>
            <form action="" onSubmit={updateQuestion}>
              <input
                className={styles.enunciado}
                type="text"
                value={NovoEnunciado}
                onChange={(e) => {
                  setNovoEnunciado(e.target.value);
                }}
                placeholder={dataPergunta.enunciado_pergunta}
              />
              <div className={styles.containeralt}>
                <div className={styles.alt1e2}>
                  <input
                    className={styles.alternativas}
                    type="text"
                    value={NovaAlternativa1}
                    onChange={(e) => setNovaAlternativa1(e.target.value)}
                    placeholder="Alternativa 1"
                  />
                  <input
                    className={styles.checkboxes}
                    type="checkbox"
                    onChange={(e) => console.log(e.target.checked)}
                  />
                </div>
                <div className={styles.alt1e2}>
                  <input
                    className={styles.alternativas}
                    type="text"
                    value={NovaAlternativa2}
                    onChange={(e) => setNovaAlternativa2(e.target.value)}
                    placeholder="Alternativa 2"
                  />
                  <input
                    className={styles.checkboxes}
                    type="checkbox"
                    onChange={(e) => console.log(e.target.checked)}
                  />
                </div>
                <div className={styles.alt3e4}>
                  <input
                    className={styles.alternativas}
                    type="text"
                    value={NovaAlternativa3}
                    onChange={(e) => setNovaAlternativa3(e.target.value)}
                    placeholder="Alternativa 3"
                  />
                  <input
                    className={styles.checkboxes}
                    type="checkbox"
                    onChange={(e) => console.log(e.target.checked)}
                  />
                </div>
                <div className={styles.alt3e4}>
                  <input
                    className={styles.alternativas}
                    type="text"
                    value={NovaAlternativa4}
                    onChange={(e) => setNovaAlternativa4(e.target.value)}
                    placeholder="Alternativa 4"
                  />
                  <input
                    className={styles.checkboxes}
                    type="checkbox"
                    onChange={(e) => console.log(e.target.checked)}
                  />
                </div>
              </div>
              <input
                className={styles.enunciado}
                type="text"
                placeholder="Inserir dica"
                value={dica}
                onChange={(e) => setDica(e.target.value)}
              />
              <button
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  setDica_array([...dica_array, dica]);
                  setDica("");
                }}
              >
                Nova dica
              </button>
            </form>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
      </>
    );}

export default PerguntaEdit;
