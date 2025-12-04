import React from 'react'
import { supabase } from '../../../Supabase';
import { useState } from 'react';
import styles from "../criarCla/criarCla.module.css"

const CriarCla = () => {

    const [nome_equipe,setNome_equipe] = useState('');
    const [descricao_equipe,setDescricao_equipe] = useState('');
    const [quantidade_limite_equipe,setQuantidade_limite_equipe] = useState(0);
    const [pontuacao_min_equipe,setPontuacao_min_equipe] = useState(0);

    const id = localStorage.getItem("userId");

    const CadastroCla = async (e) => {
        e.preventDefault();

        if (nome_cla.length>0 && nome_cla.length<=25 && descricao_cla.length>0 && descricao_cla.length<=100){
            const {error} = await supabase
            .from('cla')
            .insert([
                {
                    nome_cla: `${nome_cla}`,
                    descricao_cla: `${descricao_cla}`,
                    quantidade_limite_cla: `${quantidade_limite_cla}`,
                    min_pontos_entrar: `${pontuacao_min_cla}`,
                }
            ])
                    
            console.log(nome_cla,descricao_cla,quantidade_limite_cla,pontuacao_min_cla);
        if(error){  
            console.log(error);
            alert("Erro ao criar clã: ", error.message);
        }
        } else{
            alert("Nome do clã deve ter entre 1 e 15 caracteres. Descrição deve ter no máximo 100 caracteres.");
        }

        
    }
    
    return (
    <div className={styles.criarClaContainer}>
    <div className={styles.ContainerNovoCla}>
    <h1>Criar um clã</h1>
    <form  action="" onSubmit={CadastroCla}>
        <div className={styles.row}>
            <label className={styles.label} htmlFor="">Nome do clã</label>
            <input type="text" onChange={(e)=> setNome_equipe(e.target.value)} />
        </div>

        <div className={styles.row}>
            <label className={styles.label} htmlFor="">Descrição do clã</label>
            <input type="text" onChange={(e)=> {setDescricao_equipe(e.target.value)}} />
        </div>

        <div className={styles.row}>
            <label className={styles.label} htmlFor="">Número máximo de participantes</label>
            <select name="" id="" onChange={(e)=> setQuantidade_limite_equipe(e.target.value)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
            </select>
        </div>

        <div className={styles.row}>
            <label className={styles.label} htmlFor="">Mínimo de pontos</label>
            {/* <input type="number" name="" id="" onChange={(e)=> setPontuacao_min_equipe(e.target.value)} /> */}
            <select name="" id="">
                <option value="0">0</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
                <option value="1500">1500</option>
                <option value="2000">2000</option>
                <option value="2500">2500</option>
                <option value="3000">3000</option>
            </select>
        </div>

        <button id={styles.buttonCriarCla} type='submit'>Criar Clã</button>


    </form>

        {/* <button onClick={ShowId}>mostrar id</button> */}
    </div>
    </div>
  )
}
export default CriarCla