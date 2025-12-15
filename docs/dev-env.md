# Informações sobre o projeto GinKQuiz

## Node

**versão recomendada:** v22.14.0
**versão recomendada do npm (Node Package Manager):** 10.9.2

## Principais Scripts

**dev -** vite
**build -** vite build
**lint -** eslint .
**preview -** vite preview

## Supabase

O Supabase utilizado como backend é **cloud**, portanto os dados são hospedados na nuvem e o gerenciamento é feito através do site oficial do Supabase. 

## Variáveis de Ambiente

VITE_SUPABASE_URL="https://txykbjumieeifxygbpow.supabase.co"

VITE_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eWtianVtaWVlaWZ4eWdicG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNDQ5OTUsImV4cCI6MjA3NjYyMDk5NX0.0o5erJUFnqfaIK6KiSmi9HK2IWLOKTsBVbF56rCzC-o"

## Diagrama dos fluxos front → backend

**CriarCla.jsx**

O supabase é usado nesse arquivo em primeiro lugar para adicionar um novo clã, utilizando supabase.from("cla").insert() sendo "cla" o nome da tabela em que os dados serão inseridos. Na segunda chamada de supabase, ele adiciona automaticamente o usuário ao clã que ele acabou de criar.

**criarPergunta.jsx**

O backend é usado aqui para adicionar novas perguntas e dicas ao banco de dados. Em supabase.from('perguntas').insert(), podemos observar a inserção de novos dados à tabela de nome perguntas. Já em supabase.from("dicas").insert() podemos ver a inserção de dicas, de forma similar.
Além disso, na função showThemes, é usado o supabase para selecionar todos os temas e mostrá-los na tela com a constante temas. As funções showQuestions e showHints são similares à última, mostrando respectivamente as perguntas dentro de cada tema e as dicas de cada uma delas.

**EntrarCla.jsx**

Em fetchClans(), o código seleciona do supabase todas as informações da tabela cla. Além disso, em enterCla, ele faz quatro usos, sendo um select para encontrar o clã que foi selecionado da tabela, um segundo select para identificar a pontuação do usuário que clicou no clã, um terceiro para atualizar o idCla do usuário e fazâ-lo entrar no clã selecionado e por último, mais um update para atualizar a quantidade atual de membros no clã.

**Gerenciamento.jsx**

O supabase é usado nesse arquivo para: selecionar todos os temas da tabela temas, selecionar todas as perguntas da tabela perguntas e deletar perguntas pelo id.

**Jogar.jsx**

O supabase é usado nesse arquivo para: selecionar todas as perguntas da tabela perguntas pelo id, selecionar todas as respostas pela coluna resposta_pergunta e selecionar todas as dicas pela coluna pergunta_dica ser igual ao id da pergunta.

**Lobby.jsx**

O supabase é usado nesse arquivo para: requisitar e selecionar todos os temas e selecionar o tema, o enunciado e o id da pergunta.

**Login.jsx**

O supabase é usado nesse arquivo para: selecionar por meio de um invoke o login do usuário (predefinidos como email e senha) e selecionar tudo da tabela usuários, utilizando o email como chave primária.

**LoginGoogle.jsx**

O supabase é usado nesse arquivo para: selecionar por meio de um invoke o cadastro do usuário pelo google (predefinidos como email, nome. id do google, data de nascimento e gênero)

**MenuInicial.jsx**

O supabase é usado nesse arquivo para: selecionar por meio de um select as informações do clã, do usuário, checar o clã em que o id corresponde ao idCla da tabela usuários e para checar se o usuário tem clã, selecionando cla_usuario na tabela usuarios e verificando se é diferente de null

**MeuCla.jsx**

O supabase é usado nesse arquivo para: atualizar os dados do cla_usuario para null quando ele quer sair de seu clã, selecionar por meio de um select todas as informações do usuário correspondentes ao id do usuário no clã, selecionar por meio de um select todas as informações do clã do usuário e as informações de todos os membros do clã.

**Perfil.jsx**

O supabase é usado nesse arquivo para: selecionar as informações do usuário que está logado e fazer o update da imagem do perfil do usuário e do nome de usuário do mesmo.

**PerguntaEdit.jsx**

O supabase é usado nesse arquivo para: selecionar todas as perguntas da tabela perguntas pelo id, atualizar as informações das perguntas uma a uma por meio de um update, deletar as dicas uma a uma da pergunta por meio de um delete que iguala o id pergunta_dica e o id da pergunta, inserir de forma similar dicas à pergunta e mostrá-las por meio de um select.

**Perguntas.jsx**

O supabase é usado nesse arquivo para: selecionar todas as perguntas e dicas de suas respectivas tabelas no banco de dados.

**Rankings.jsx**

O supabase é usado nesse arquivo para: capturar todas as informações da tabela cla e ordená-las pela pontuação de forma decrescente, capturar todos os usuários da tabela resultados e ordená-los pela pontuação e, por fim, capturar e selecionar todos os usuários da tabela resultados e ordená-los pelo filtro de perguntas respondidas de forma decrescente de pontuação.

**TelaFinal.jsx**

O supabase é usado nesse arquivo para: selecionar todas as informações da tabela resultados, ordená-las de forma crescente por data de inserção, selecionar os usuários da tabela usuários e todas as suas informações e finalmente inserir as informações da partida jogada na tabela resultados.