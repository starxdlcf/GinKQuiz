import React from 'react'
import { supabase } from '../../../Supabase'
import { useState } from 'react'

const Outlet = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [data, setData] = useState(null);

    const ShowData = async ()=>{
        const {data,error} = await supabase
        .from('usuarios')
        .select('*')

        setData(data);
    }

  return (
    <>
        <label htmlFor="">Selecione um id</label>
        <select name="" id="">
            <option value="">Selectione um id</option>
            <option value="1">Roberto</option>
            <option value="22">adm</option>
            <option value="6">mateus</option>
        </select>
        <Outlet/>
    </>
  )
}

export default Outlet