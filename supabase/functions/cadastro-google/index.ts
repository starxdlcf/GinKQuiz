import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST', 
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
}

serve(async (req) => {
  // Tratamento OBRIGATÓRIO do CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 })
  }

  try {
    const { nome_usuario, email, google_id, genero, nascimento } = await req.json() 

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 1. Inserção no Supabase (Sem senha)
    const { data, error } = await supabaseClient
      .from('usuarios')
      .insert([
        { 
          nome_usuario, 
          email, 
          google_id, 
          genero, 
          nascimento 
        }
      ])
      .select('id_usuario')
      
    if (error) throw error

    // Retorna o ID para o Autologin
    return new Response(JSON.stringify({ userId: data[0].id_usuario }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})