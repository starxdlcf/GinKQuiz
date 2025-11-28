import React, { use } from 'react'
import { supabase } from '../../../Supabase'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import {GlobalContext} from '../../../context/GlobalContext'
import { useEffect } from 'react'

const Debbug = () => {


  useEffect(() => {
    ShowData();
  }, []);


    const {id, setId} = React.useContext(GlobalContext);
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState(null);

    const ShowData = async ()=>{
        const {data,error} = await supabase
        .from('usuarios')
        .select('*')

        setData(data);
    }

    const BackPage = () => {
      window.history.back();
    }

  return (
    <> 
    <div style={{backgroundColor:'green',display:'flex'}}>
      <button onClick={BackPage}>Voltar</button>
        <label htmlFor="">Selecione um id</label>
        <select name="" id="" value={id} onChange={(e)=> {setId(e.target.value), console.log(id)}}>
          {data && data.map((user) => (
            <option key={user.id_usuario} value={user.id_usuario}>{user.id_usuario} - {user.nome_usuario}</option>
          ))}
            {/* <option value="">Selectione um id</option>
            <option value="1">Roberto</option>
            <option value="22">adm</option>
            <option value="6">mateus</option> */}
        </select>
    </div>
        <Outlet/>
    </>
  )
}

export default Debbug