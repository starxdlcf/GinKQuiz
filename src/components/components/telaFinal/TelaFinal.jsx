import React from 'react'
import { supabase } from '../../../Supabase'
import { useNavigate } from 'react-router-dom'
import { Line } from '@ant-design/plots'
import styles from './TelaFinal.module.css'
import { logEvent, logError } from '../../../utils/loggers.js';

function TelaFinal() {
    const [nomeUsuario, setNomeUsuario] = React.useState("")

    const idUser = localStorage.getItem("userId")
    const pontos = localStorage.getItem("pontos")
    const acertos = localStorage.getItem("acertos")
    const tempoMin = localStorage.getItem("tempoMin")
    const tempoSeg = localStorage.getItem("tempoSeg")
    
    const navigate = useNavigate()
    const [resultados, setResultados] = React.useState([])
    const [showGrafico, setShowGrafico] = React.useState(false)

    React.useEffect(() => {
        if (!pontos) {
            logError('QUIZ', 'Tela Final carregada sem dados de pontuação (possível F5 do usuário)');
        } else {
            logEvent('QUIZ', 'Tela Final exibida com sucesso', { 
                pontos, 
                acertos, 
                tempo: `${tempoMin}:${tempoSeg}` 
            });
        }

        fetchUsuario()
        fetchResultados()
    }, [])

    const fetchResultados = async () => {
        try {
            // [LOG API] Requisição do histórico
            logEvent('API', 'REQ: Buscando histórico do usuário');

            const { data, error } = await supabase
                .from('resultados')
                .select('pontuacao_resultado, acertos_resultado, tempo_resultado, usuario_id_resultado, created_at, usuario:usuario_id_resultado ( nome_usuario )')
                .eq('usuario_id_resultado', idUser)
                .order('created_at', { ascending: true });

            if (error) {
                logError('API', 'ERR: Falha ao baixar histórico', error);
                throw error;
            }

            // [LOG API] Sucesso na busca
            logEvent('API', 'RES: Histórico recebido', { linhas: data?.length || 0 });

            setResultados(data || []);
        }
        catch (error) {
            logError('QUIZ', 'Erro ao buscar histórico de resultados', error)
        }
    }

    const fetchUsuario = async () => {
        try {
            const { data, error } = await supabase
                .from("usuarios")
                .select("*")
                .eq("id_usuario", idUser)
                .single()

            if (error) throw error;

            setNomeUsuario(data.nome_usuario)
        }
        catch (error) {
            console.error(error)
            logError('QUIZ', 'Erro ao buscar nome do usuário na tela final', error)
        }
    }

    const escolherCaminho = (botao) => {
        const autorizacao = confirm("Deseja enviar seus dados para o Rankig Global?")
        
        if (autorizacao) {
            logEvent('QUIZ', 'Usuário ACEITOU salvar no Ranking Global');
            guardarResultado()
        } else {
            logEvent('QUIZ', 'Usuário RECUSOU salvar no Ranking Global');
            removeStates(); 
        }

        if (botao == "jogar") {
            logEvent('QUIZ', 'Botão clicado: Jogar Novamente');
            navigate("/lobby")
        }
        if (botao == "menu") {
            logEvent('QUIZ', 'Botão clicado: Voltar ao Menu');
            navigate("/menu")
        }
    }

    const guardarResultado = async () => {
        try {
            const dadosParaSalvar = {
                usuario_id_resultado: idUser,
                pontuacao_resultado: pontos,
                tempo_resultado: `${tempoMin}:${tempoSeg}`,
                acertos_resultado: acertos,
                perguntas_respondidas: `${localStorage.getItem("tamanhoSelecionado")}`
            };

            // [LOG API] Tentativa de escrita no banco
            logEvent('API', 'REQ: Tentando salvar resultado no Ranking', dadosParaSalvar);

            const { error } = await supabase
                .from("resultados")
                .insert(dadosParaSalvar)

            if (error) {
                 // [LOG API] Erro crítico de escrita
                 logError('API', 'ERR: O banco recusou o salvamento', error);
                 throw error
            }
            
            // [LOG API] Sucesso na escrita
            logEvent('API', 'RES: Resultado salvo com sucesso (201 Created)');
            logEvent('QUIZ', 'Ciclo de jogo finalizado com sucesso');

        } catch (error) {
            logError('QUIZ', 'Erro ao salvar no Ranking Global', error)
            alert(error.message)
        } finally {
            removeStates()
        }
    }

    const removeStates = () => {
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
                <button id={styles.jogar} onClick={(e) => { e.preventDefault(); escolherCaminho("jogar") }}>Jogar Novamente</button>
                <button id={styles.menu} onClick={(e) => { e.preventDefault(); escolherCaminho("menu") }}>Ir ao Menu</button>
                <button className={styles.btn} onClick={(e) => { 
                    e.preventDefault(); 
                    if(!showGrafico) logEvent('QUIZ', 'Usuário abriu o gráfico de histórico');
                    setShowGrafico(!showGrafico) 
                }}>
                    {showGrafico ? 'Ocultar Gráficos' : 'Ver Gráficos'}
                </button>
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