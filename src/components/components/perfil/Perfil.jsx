//eu sei que não está funcionando, a noite eu mexo


import React from 'react'
import {supabase} from '../../../Supabase';

const Perfil = () => {
  const id = LocalStorage.getItem("userId");
  const [data,setData] = React.useState(null);  

  React.useEffect(() => {
    showProfile();
    console.log("Esse é seu id para mostrar o perfil",id);
  }, []);




  const showProfile = async() => {
    const {data,error} = await supabase
    .from('usuarios')
    .select(`  id_usuario,
    nome_usuario,
    email,
    cla_usuario,
    cla: cla_usuario ( nome_cla )`)
    .eq("id_usuario",id)
    console.log(data);
    setData(data);

    if(error){
      console.log(error);
    }

  }
  return (
    <>
      <h1>Perfil</h1>

      {data && data.map((user) => (
        <div key={user.id_usuario}>
          <h2>Nome: {user.nome_usuario}</h2>
          <p>Email: {user.email}</p>
          {user.cla && <p>Clã:{user.cla.nome_cla}</p>}
        </div>
      ))}

    </>
  )
}

export default Perfil
