import React, { use } from "react";
import { supabase } from "../../../Supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./criarPergunta.module.css";
import Logotipo from "../../../assets/icons/LogotipoGinKQuiz.png";
import ideiaIcon from "../../../assets/icons/lampadaideia.png";


const CriarPergunta = () => {
  const [temaSelecionado, setTemaSelecionado] = React.useState('');
  const [temas, setTemas] = React.useState(null);
  const [enunciado_pergunta, setEnunciado_pergunta] = React.useState("");
  const [alternativa1, setAlternativa1] = React.useState('');
  const [alternativa2, setAlternativa2] = React.useState('');
  const [alternativa3, setAlternativa3] = React.useState('');
  const [alternativa4, setAlternativa4] = React.useState(''); 
  const [correta1, setCorreta1] = React.useState(false);
  const [correta2, setCorreta2] = React.useState(false);
  const [correta3, setCorreta3] = React.useState(false);
  const [correta4, setCorreta4] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [dica, setDica] = React.useState('');

  const [dica_array, setDica_array] = React.useState([])

  const navigate = useNavigate();
  
  useEffect(() => {
    showThemes();
    showQuestions();
    showHints();  
  }, []);

  const createQuestion = async (e) => {
    e.preventDefault()
    const alternativaCorreta = (
      correta1 ? alternativa1 :
      correta2 ? alternativa2 :
      correta3 ? alternativa3 :
      correta4 ? alternativa4 : ''
    );
    if (!temaSelecionado || !enunciado_pergunta || !alternativa1 || !alternativa2 || !alternativa3 || !alternativa4 || !alternativaCorreta) {
      e.preventDefault();
      alert("Por favor, preencha todos os campos antes de criar a pergunta.");
      return;
    }
    console.log("Criar pergunta")
    console.log(temaSelecionado);
    console.log(enunciado_pergunta);
    console.log(alternativa1);
    console.log(alternativa2);
    console.log(alternativa3);
    console.log(alternativa4);
    console.log(alternativaCorreta);

    const { data, error } = await supabase
      .from('perguntas')
      .insert([
        {
          tema_pergunta: `${temaSelecionado}`,
          enunciado_pergunta: `${enunciado_pergunta}`,
          alternativa1_pergunta: `${alternativa1}`,
          alternativa2_pergunta: `${alternativa2}`,
          alternativa3_pergunta: `${alternativa3}`,
          alternativa4_pergunta: `${alternativa4}`,
          resposta_pergunta: `${alternativaCorreta}`,
        },
      ])
      .select();
      if(error){
        alert("Erro ao criar pergunta:", error);
        console.error(error);
        return;
      }
      if(dica){
        // const { data: dicaData, error: dicaError } = await supabase
        // .from('dicas')
        // .insert([
        //   {
        //     pergunta_dica: data[0].id_pergunta,
        //     info_dica: `${dica}`,
        //   },
        // ]);
        for(const element of dica_array){
          const { data : dicaData, error: dicaError } = await supabase
          .from("dicas")
          .insert([
            {
              pergunta_dica: data[0].id_pergunta,
              info_dica: `${element}`
            }
          ])
        }
      }
      alert("Pergunta criada com sucesso!");
      navigate('/gerenciamento')
      console.log(data);
  }

  const showThemes = async () => {
  const { data, error } = await supabase
    .from('temas')
    .select('*');
  setTemas(data);
  }

  const showQuestions = async () => {
    const { data, error } = await supabase
      .from('perguntas')
      .select('*');
    console.log(data);
    }

  const showHints = async (id_pergunta) => {
    const { data, error } = await supabase
      .from('dicas')
      .select('*')
      console.log(data)
  }
  return (
    <>
      <img id={styles.logoGinKQuiz} src={Logotipo} alt="Logotipo do GinkQuiz" />
      <form id={styles.form} action="" onSubmit={createQuestion}>

        <input id={styles.enunciado} type="text" name="" value={enunciado_pergunta} onChange={(e)=>{setEnunciado_pergunta(e.target.value),console.log(enunciado_pergunta)}} placeholder="Insira a sua pergunta aqui" />

        <select name="" className={styles.select} value={temaSelecionado} onChange={(e)=>{setTemaSelecionado(e.target.value)}} >
          <option id={styles.temas} value="">Selecione um tema</option>
          {temas && temas.map((tema) => (
            <option key={tema.id_tema} value={tema.id_tema}>{tema.nome_tema}</option>
          ))}
        </select>
        <div id={styles.containeralt}>

          <div className={styles.alt1e2}>

            <input className={styles.alternativas} type="text" name="" id="" value={alternativa1} onChange={(e)=>{setAlternativa1(e.target.value),console.log(alternativa1)}} placeholder="alternativa 1" />
            <input  className={styles.checkboxes} type="checkbox" name="" id=""
            onChange={()=> {
              setCorreta1(true);
              setCorreta2(false);
              setCorreta3(false);
              setCorreta4(false);
            }
            }/>
            <input className={styles.alternativas} type="text" name="" id="" value={alternativa2} onChange={(e)=>{setAlternativa2(e.target.value),console.log(alternativa2)}} placeholder="alternativa 2" />
            <input className={styles.checkboxes} type="checkbox" name="" id=""
            onChange={()=> {
              setCorreta1(false);
              setCorreta2(true);
              setCorreta3(false);
              setCorreta4(false);
            }
            } />
          </div>

          <div className={styles.alt3e4}>

            <input className={styles.alternativas} type="text" name="" id="" value={alternativa3} onChange={(e)=>{setAlternativa3(e.target.value),console.log(alternativa3)}} placeholder="alternativa 3" />
            <input className={styles.checkboxes} type="checkbox" name="" id=""
            onChange={()=> {
              setCorreta1(false);
              setCorreta2(false);
              setCorreta3(true);
              setCorreta4(false);
            }
            } />
            <input className={styles.alternativas} type="text" name="" id="" value={alternativa4} onChange={(e)=>{setAlternativa4(e.target.value),console.log(alternativa4)}} placeholder="alternativa 4" />
            <input className={styles.checkboxes} type="checkbox" name="" id=""
            onChange={()=> {
              setCorreta1(false);
              setCorreta2(false);
              setCorreta3(false);
              setCorreta4(true);
            }
            }/>
                    </div>
          </div>

          {/* <button style={{color:'red'}} onClick={(e)=>{e.preventDefault(), setOpen(true)}}>criar dica</button> */}

          {open ===true?  (
            <div id={styles.dicabox}>
              <div id={styles.criardicabox}>
                <button id={styles.saircriardica} onClick={(e)=> {e.preventDefault(),setOpen(false)}}>x</button>
                <input id={styles.inputcriardica} type="text" name="" value={dica} onChange={(e)=>{setDica(e.target.value)}} placeholder="dica da pergunta" />
                <button id={styles.criardica} onClick={(e)=>{e.preventDefault(), setDica_array([...dica_array, ` ${dica}`])}}>criar dica</button>
              </div>


              <p>{dica_array}</p>
                
            </div>
          ) : (<>
           <button id={styles.criardica} onClick={(e)=>{e.preventDefault(), setOpen(true)}}><img id={styles.dicaimagem} src={ideiaIcon} alt="Ideia" /></button>
          </>
          ) }

        <button id={styles.criarpergunta} type="submit">criar pergunta</button>
      </form>
    </>
  );
};

export default CriarPergunta;
