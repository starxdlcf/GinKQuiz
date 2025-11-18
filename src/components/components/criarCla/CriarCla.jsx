import React from 'react'
import { supabase } from '../../../Supabase';
import { GlobalContext } from "../../../context/GlobalContext";
import { useContext } from 'react';
import { useState } from 'react';

const CriarCla = () => {

    const [nome_equipe,setNome_equipe] = useState('');
    const [descricao_equipe,setDescricao_equipe] = useState('');
    const [quantidade_limite_equipe,setQuantidade_limite_equipe] = useState(0);
    const [pontuacao_min_equipe,setPontuacao_min_equipe] = useState(0);

    const { id, setId } = useContext(GlobalContext);

    const CadastroCla = async (e) => {
        e.preventDefault();
        const {error} = await supabase
        .from('cla')
        .insert([
            {
                nome_equipe: `${nome_equipe}`,
                descricao_equipe: `${descricao_equipe}`,
                quantidade_limite_equipe: `${quantidade_limite_equipe}`,
                pontuacao_equipe: `${pontuacao_min_equipe}`,
            }
            ]);        
            console.log(nome_equipe,descricao_equipe,quantidade_limite_equipe,pontuacao_min_equipe);
        if(error){  
            console.log(error);
            alert("Erro ao criar clã: ", error.message);
        }
    }
        
    const ShowId = () => {
        console.log("Id do usuario", id);
    }
    
    return (
    <>
    <h1>criar um cla</h1>

    <div>
    <form action="" style={{display:'flex',flexDirection:"column", width:"300px", gap:"10px"}} onSubmit={CadastroCla}>
        <label htmlFor="">Nome do cla</label>
        <input type="text" onChange={(e)=> setNome_equipe(e.target.value)} />

        <label htmlFor="">Descrição do cla</label>
        <input type="text" onChange={(e)=> {setDescricao_equipe(e.target.value)}} />

        <label htmlFor="">Numero maximo de participantes</label>
        <input type="number" onChange={(e)=> setQuantidade_limite_equipe(e.target.value)} />

        <label htmlFor="">Minimo de pontos</label>
        <input type="number" name="" id="" onChange={(e)=> setPontuacao_min_equipe(e.target.value)} />

        <button type='submit'>Criar Clã</button>


    </form>

        <button onClick={ShowId}>mostrar id</button>
    </div>
    </>
  )
}
export default CriarCla