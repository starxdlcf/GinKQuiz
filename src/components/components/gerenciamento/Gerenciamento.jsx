import React from 'react'
import { supabase } from '../../../Supabase'


const Gerenciamento = () => {
  const id = localStorage.getItem("userId");
  
  const [temas, setTemas] = React.useState(null);
  const [perguntas, setPerguntas] = React.useState(null);


  React.useEffect(() => {
    fetchTemas();
    console.log("ID do usuario no gerenciamento:", id);
    console.log("Temas:", temas);
  }, []);

  const fetchTemas = async () => {
    const{data} = await supabase
    .from('temas')
    .select('*')
    setTemas(data);
  }
  return (
    <>
    <div>Gerenciamento</div>

    <table></table>
    </>
  )
}

export default Gerenciamento