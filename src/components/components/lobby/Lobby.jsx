import React from 'react'
import { supabase } from '../../../Supabase'

function Lobby() {
    const [listaGeneros, setListaGeneros] = React.useState({})

    const fetchLista = async ()=>{
        try{
            const {data, error} =  await supabase
        }catch{

        }
    }
    
    return (
    <div>
        <h2>Lobby</h2>
        <div>
            <div>
                <p>matematica</p>
                <p>portugues</p>
                <p>computação</p>
                <p>quimica</p>
            </div>
            <div>
                <p>Aleatorio</p>
                <button>off</button>
            </div>
        </div>
    </div>
  )
}

export default Lobby