import React from 'react'
import { supabase } from '../../../Supabase'
import { useNavigate } from 'react-router-dom'

function TelaFinal() {
    const [nomeUsuario,setNomeUsuario] = React.useState("")

    const idUser = localStorage.getItem("userId")
    const pontos = localStorage.getItem("pontos")
    const acertos = localStorage.getItem("acertos")
    const tempoMin = localStorage.getItem("tempoMin")
    const tempoSeg = localStorage.getItem("tempoSeg")
    
    const navigate = useNavigate()

    React.useEffect(()=>{
        fetchUsuario()
    },[])

    const fetchUsuario = async()=>{
        try{
            const {data, error} = await supabase
            .from("usuarios")
            .select("*")
            .eq("id_usuario", idUser)
            .single()

            if (error) throw error;

            setNomeUsuario(data.nome_usuario)
        }
        catch (error){
            console.error(error)
            alert(error.message)
        }
    }

    const escolherCaminho = (botao)=>{
        const autorizacao = confirm("Deseja enviar seus dados para o Rankig Global?")
        if (autorizacao){
            guardarResultado()
        }

        if (botao == "jogar"){
            navigate("/lobby")
        }if (botao == "menu"){
            navigate("/menu")
        }if (botao == "grafico"){
            alert("graficos em manutenção")
        }
    }

    const guardarResultado = async ()=>{
        try{
            const {error} = await supabase
            .from("resultados")
            .insert({
                usuario_id_resultado: idUser,
                pontuacao_resultado: pontos,
                tempo_resultado: `${tempoMin}:${tempoSeg}`,
                acertos_resultado: acertos
            })

            if (error) throw error
        }catch(error){
            console.error(error)
            alert(error.message)
        }finally{
            removeStates()
        }
    }

    const removeStates = ()=>{
        localStorage.removeItem("pontos")
        localStorage.removeItem("acertos")
        localStorage.removeItem("tempoMin")
        localStorage.removeItem("tempoSeg")
        localStorage.removeItem("inicioQuiz")
    }


  return (
    <div>
        <h1>Parabens {nomeUsuario}</h1>
        <p>você completou o quiz com sucesso</p>
        <p>+{pontos}</p>
        <p>Perguntas respondidas: ?</p>
        <p>Respostas corretas: {acertos}</p>
        <p>Tempo Gasto: {tempoMin}:{tempoSeg}</p>

        <button onClick={(e)=>{e.preventDefault(); escolherCaminho("jogar")}}>Jogar Novamente</button>
        <button onClick={(e)=>{e.preventDefault(); escolherCaminho("menu")}}>Ir ao Menu</button>
        <button onClick={(e)=>{e.preventDefault(); escolherCaminho("grafico")}}>Ver Graficos</button>

    </div>
  )
}

export default TelaFinal