import React from 'react'
import { supabase } from '../../../Supabase'
import { useNavigate } from 'react-router-dom'
import { Line } from '@ant-design/plots'
import styles from './TelaFinal.module.css'

function TelaFinal() {
    const [nomeUsuario,setNomeUsuario] = React.useState("")

    const idUser = localStorage.getItem("userId")
    const pontos = localStorage.getItem("pontos")
    const acertos = localStorage.getItem("acertos")
    const tempoMin = localStorage.getItem("tempoMin")
    const tempoSeg = localStorage.getItem("tempoSeg")
    
    const navigate = useNavigate()
    const [resultados, setResultados] = React.useState([])
    const [showGrafico, setShowGrafico] = React.useState(false)

    React.useEffect(()=>{
        fetchUsuario()
        fetchResultados()
    },[])

    const fetchResultados = async () => {
        try{
            const { data, error } = await supabase
                .from('resultados')
                .select('pontuacao_resultado, acertos_resultado, tempo_resultado, usuario_id_resultado, created_at, usuario:usuario_id_resultado ( nome_usuario )')
                .eq('usuario_id_resultado', idUser)
                .order('created_at', { ascending: true });

            if (error) throw error;

            setResultados(data || []);
        }
        catch(error){
            console.error('Erro ao buscar resultados:', error)
        }
    }

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
        }
        if (botao == "menu"){
            navigate("/menu")
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
                acertos_resultado: acertos,
                perguntas_respondidas: `${localStorage.getItem("tamanhoSelecionado")}`
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
        localStorage.removeItem("tamanhoSelecionado");
        localStorage.removeItem("perguntasSelecionadas");
    }

  return (
    <div id={styles.container}>
        <div className={styles.cabecalho}>
            <h1>Parabéns, {nomeUsuario}!</h1>
            <p id={styles.subtitulo}>Você completou o quiz com sucesso!</p>
        </div>
        <div className={styles.containerpontos}>
            <p id={styles.pontos}>+{pontos}</p>
            <div className={styles.containerinfo}>
                <p className={styles.p}><span>Perguntas respondidas:</span> {localStorage.getItem("tamanhoSelecionado")}</p>
                <p className={styles.p}><span>Respostas corretas:</span> {acertos}</p>
                <p className={styles.p}><span>Tempo Gasto:</span> {tempoMin}:{tempoSeg}</p>
            </div>
        </div>

        <div className={styles.buttons}>
            <button id={styles.jogar} onClick={(e)=>{e.preventDefault(); escolherCaminho("jogar")}}>Jogar Novamente</button>
            <button id={styles.menu} onClick={(e)=>{e.preventDefault(); escolherCaminho("menu")}}>Ir ao Menu</button>
                    <button className={styles.btn} onClick={(e)=>{e.preventDefault(); setShowGrafico(!showGrafico)}}>{showGrafico ? 'Ocultar Gráficos' : 'Ver Gráficos'}</button>
        </div>

                <div className={`${styles.overlay} ${showGrafico ? styles.show : ''}`}>
                    <div className={styles.overlayInner}>
                        <div className={styles.overlayHeader}>
                            <h3 style={{ margin: 0 }}>Histórico</h3>
                            <button className={styles.closeButton} onClick={() => setShowGrafico(false)}>×</button>
                        </div>

                        {resultados && resultados.length > 0 ? (
                            (() => {
                                const chartData = resultados.map((r, i) => ({
                                    result: `#${i + 1}`,
                                    value: Number(r.pontuacao_resultado) || 0,
                                    time: r.created_at,
                                }));

                                const config = {
                                    data: chartData,
                                    xField: "result",
                                    yField: "value",
                                    point: { size: 4 },
                                    tooltip: { showMarkers: false },
                                    style: { lineWidth: 2 },
                                };

                                return <div className={styles.chartContainer}><Line {...config} /></div>;
                            })()
                        ) : (
                            <p>Sem resultados para mostrar.</p>
                        )}
                    </div>
                </div>
        </div>
  )
}
export default TelaFinal