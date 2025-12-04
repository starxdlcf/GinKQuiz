import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import bcrypt from "https://esm.sh/bcryptjs@2.4.3"; 

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST', 
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 })
  }

  try {
    const { email, senha } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // 1. Busca o usuário
    const { data: userData, error } = await supabaseClient
      .from('usuarios')
      .select('id_usuario, senha')
      .eq('email', email)
      .single()

    if (error || !userData) {
      // Usamos uma mensagem genérica por segurança
      throw new Error('E-mail ou senha incorretos.');
    }

    // 2. Compara a senha (CORREÇÃO: Uso de Async/Await)
    const hashedPassword = userData.senha;
    const isPasswordValid = await bcrypt.compare(senha, hashedPassword);

    if (!isPasswordValid) {
      throw new Error('E-mail ou senha incorretos.');
    }

    return new Response(JSON.stringify({ userId: userData.id_usuario }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("Erro Login:", error.message);
    const message = error.message.includes('E-mail ou senha') ? error.message : 'Erro interno no servidor.';
    
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 401, // Unauthorized
    })
  }
})