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
  // Tratamento OBRIGATÓRIO do CORS (Preflight)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 })
  }

  try {
    const { nome_usuario, email, senha, genero, nascimento, captchaToken } = await req.json()

    // 1. Validação do reCAPTCHA
    const recaptchaSecret = Deno.env.get('RECAPTCHA_SECRET_KEY') 
    
    // Verifica se a chave secreta existe
    if (!recaptchaSecret) {
       throw new Error('Configuração de servidor inválida: RECAPTCHA_SECRET_KEY ausente.')
    }

    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${recaptchaSecret}&response=${captchaToken}`,
    })

    const verifyData = await verifyRes.json()

    if (!verifyData.success) {
      console.error("Erro reCAPTCHA:", verifyData); // Log para debug no Dashboard
      throw new Error('Falha na validação do reCAPTCHA.')
    }

    // 2. Hashing da Senha (CORREÇÃO: Uso de Async/Await)
    // O uso de Sync aqui travava a Edge Function
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(senha, salt);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 3. Inserção no Supabase
    const { data, error } = await supabaseClient
      .from('usuarios')
      .insert([
        { 
          nome_usuario, 
          email, 
          senha: hashedPassword, 
          genero, 
          nascimento 
        }
      ])
      .select()

    if (error) {
        console.error("Erro Supabase Insert:", error);
        throw error;
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error("Erro na função criar-usuario:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400, // Bad Request
    })
  }
})