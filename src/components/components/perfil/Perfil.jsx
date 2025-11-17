import React from 'react'
import {supabase} from '../../../Supabase';
import { GlobalContext } from '../../../context/GlobalContext';
import { useContext } from 'react';

const Perfil = () => {
  const { id, setId } = useContext(GlobalContext);

  const [data,setData] = React.useState(null);  

  React.useEffect(() => {
    showProfile();
    console.log(id);
  }, []);




  const showProfile = async() => {
    const {data,error} = await supabase
    .from('usuarios')
    .select(`  id_usuario,
    nome_usuario,
    email,
    equipe_usuario,
    cla: equipe_usuario ( nome_equipe )`)
    .eq("id_usuario",id)
    console.log(data);
    setData(data);

    if(error){
      console.log(error);
    }

  }
  return (
    <>
    <div>Perfil</div>

    {data && data.map((user) => (
      <div key={user.id_usuario}>
        <h2>Nome: {user.nome_usuario}</h2>
        <p>Email: {user.email}</p>
        {user.equipe && <p>Clã:{user.cla.nome_equipe}</p>}
      </div>
    ))}   
    </>
  )
}

export default Perfil
