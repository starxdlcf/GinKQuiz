
# A01 - Quebra de Controle de Acesso

    -> O que é?

        O usuário consegue agir fora das permissões concedidas a ele, ou seja, ocorre quando o sistema falha em impor limites aos acessos dos usuários no sistema. Essa foi a vulnerabilidade mais encontrada nos projetos avaliados pela OWASP, com 100% deles tendo alguma forma de controle de acesso quebrado.
        Uma das formas mais comuns de sintetizar todas as faces da quebra de controle de acesso é a confiança excessiva da aplicação em seus usuários, utilizando-se apenas do Front-end para fazer autenticações de permissão.

    -> Exemplo(s) citado(s) pelo OWASP

        Alguns dos exemplos citados pela fundação envolvem IDOR e elevação de privilégios. O IDOR consiste em alterar pelo URL o id do usuário para acessar dados alheios, enquanto a elevação de privilégios é a capacidade do usuário de descobrir uma URL destinada a administradores e conseguir acessá-la, pois o sistema não verifica se ele é administrador ou não.

    -> Risco no GinKQuiz é considerado **ALTO**

    -> Justificativa da relevância do item para o projeto

        No GinKQuiz, o React não exerce nenhum tipo de auxílio na proteção dos acessos. Por conta disso, o trabalho fica todo em cima do Supabase com sua RLS. Além disso, se houver qualquer pequena brecha nessa área, representará um problema muito grande.

    -> Como posso verificar rapidamente a situação na aplicação?

        É necessário verificar todas as formas com que os usuários podem interagir com o sistema e proteger todas as páginas com controles de acessos separadamente. Isso ajudará a prevenir ataques vindos de usuários comuns.


# A02 - Configuração Incorreta de Segurança

    -> O que é?

        Essa vulnerabilidade se refere a falhas no momento de configurar o sistema, na implementação de controles de segurança e na manutenção de configurações realmente seguras. O sistema geralmente pode vir com configurações "fáceis", que não garantem nenhum ou quase nenhum tipo de segurança.

    -> Exemplo(s) citado(s) pelo OWASP

        Alguns exemplos são: deixar erros mostrados aos usuários em produção (o que revela os caminhos dos arquivos da aplicação e permite que qualquer usuário veja trechos de código SQL) e não configurar de maneira correta ou não dar tanta relevância às configurações dos cabeçalhos de segurança HTTP.

    -> Risco no GinKQuiz é considerado **MÉDIO/ALTO**

    -> Justificativa da relevância do item para o projeto

        Nessa aplicação, o maior problema que podemos identificar é o uso de "console.log" de forma recorrente, o que mostra dados aos usuários. Além disso, deixar Buckets do Supabase abertos para qualquer um ler, ou expor chaves de API privilegiadas (`service_role`) no código do Front-end.

    -> Como posso verificar rapidamente a situação na aplicação?

        Verificar no painel do Supabase se os buckets de "Storage" estão marcados como Públicos e se possuem Policies restritivas. Além disso, fazer uma busca global no código por `service_role` e remover qualquer ocorrência, e garantir que `console.log` seja removido antes do build final.


# A03 - Falhas na Cadeia de Suprimentos de Software

    -> O que é?

        Esse item ganhou destaque total no ano passado, já que não aparecia nas listas anteriores. Aqui, o foco são as bibliotecas que utilizamos nos projetos. Caso a conta do autor de alguma das dezenas de bibliotecas do seu sistema seja comprometida e hackeada, esse problema chega até o seu projeto, comprometendo-o também.

    Perfeito. Organizei os 10 itens do OWASP Top 10:2025 seguindo exatamente a estrutura, o tom e a formatação que você definiu, mantendo o foco total na realidade do GinKQuiz (React + Supabase).

Completei o item A02 (que estava incompleto) e segui com os outros 8.

A01 - Quebra de Controle de Acesso
-> O que é?

    O usuário consegue agir fora das permissões concedidas a ele, ou seja, ocorre quando o sistema falha em impor limites aos acessos dos usuários no sistema. Essa foi a vulnerabilidade mais encontrada nos projetos avaliados pela OWASP, com 100% deles tendo alguma forma de controle de acesso quebrado.
    Uma das formas mais comuns de sintetizar todas as faces da quebra de controle de acesso é a confiança excessiva da aplicação em seus usuários, utilizando-se apenas do Front-end para fazer autenticações de permissão.

-> Exemplo(s) citado(s) pelo OWASP

    Alguns dos exemplos citados pela fundação envolvem IDOR e elevação de privilégios. O IDOR consiste em alterar pelo URL o id do usuário para acessar dados alheios, enquanto a elevação de privilégios é a capacidade do usuário de descobrir uma URL destinada a administradores e conseguir acessá-la, pois o sistema não verifica se ele é administrador ou não.

-> Risco no GinKQuiz é considerado **ALTO**

-> Justificativa da relevância do item para o projeto

    No GinKQuiz, o React não exerce nenhum tipo de auxílio na proteção dos acessos. Por conta disso, o trabalho fica todo em cima do Supabase com sua RLS (Row Level Security). Além disso, se houver qualquer pequena brecha nessa área, representará um problema muito grande de vazamento de dados.

-> Como posso verificar rapidamente a situação na aplicação?

    É necessário verificar todas as formas com que os usuários podem interagir com o sistema e proteger todas as páginas com controles de acessos (Policies) no banco de dados. Testes manuais alterando IDs nas requisições (como feito via console/Network) são essenciais para validar se o bloqueio está ocorrendo no servidor.
A02 - Configuração Incorreta de Segurança
-> O que é?

    Essa vulnerabilidade se refere a falhas no momento de configurar o sistema, na implementação de controles de segurança e na manutenção de configurações realmente seguras. O sistema geralmente pode vir com configurações "fáceis" (default), que não garantem nenhum ou quase nenhum tipo de segurança se não forem endurecidas.

-> Exemplo(s) citado(s) pelo OWASP

    Alguns exemplos são: deixar erros detalhados sendo mostrados aos usuários em produção (o que revela os caminhos dos arquivos e trechos de código), deixar buckets de armazenamento de nuvem (S3/Storage) como "Públicos" permitindo listagem de arquivos, e não configurar cabeçalhos de segurança HTTP.

-> Risco no GinKQuiz é considerado **MÉDIO/ALTO**

-> Justificativa da relevância do item para o projeto

    Nessa aplicação, riscos comuns incluem deixar Buckets do Supabase abertos para qualquer um ler, ou expor chaves de API privilegiadas (`service_role`) no código do Front-end, além do uso de `console.log` com dados sensíveis em produção.

-> Como posso verificar rapidamente a situação na aplicação?

    Verifique no painel do Supabase se os buckets de "Storage" estão marcados como Públicos e se possuem Policies restritivas. Além disso, faça uma busca global no seu código por `service_role` e remova qualquer ocorrência, e garanta que `console.log` sejam removidos antes do build final.


A03 - Falhas na Cadeia de Suprimentos (Software Supply Chain Failures)

        -> O que é?

            Ocorre quando componentes de terceiros (bibliotecas, pacotes npm) utilizados no projeto são comprometidos. O risco não está no código que você escreveu, mas no código que você importou e instalou de outros desenvolvedores

        -> Exemplo(s) citado(s) pelo OWASP

            A instalação de pacotes maliciosos via `npm` que roubam variáveis de ambiente, ou o uso de bibliotecas abandonadas que possuem vulnerabilidades conhecidas e não corrigidas. Também inclui ataques onde hackers comprometem a conta de um desenvolvedor de uma biblioteca popular.

        -> Risco no GinKQuiz é considerado **MÉDIO**

        -> Justificativa da relevância do item para o projeto

            Projetos em React dependem de centenas de pacotes no `node_modules`. Se apenas uma dessas bibliotecas estiver infectada, todo o GinKQuiz fica vulnerável, independentemente da qualidade do código.

        -> Como posso verificar rapidamente a situação na aplicação?

            Executando o comando `npm audit` no terminal do projeto, serão listadas as vulnerabilidades conhecidas nas dependências instaladas, manter os pacotes sempre atualizados também é importante.

# A04 - Falhas de Criptografia

    -> O que é?

    Anteriormente conhecida como "Exposição de Dados Sensíveis", refere-se à falha em proteger dados em trânsito (rede) ou em repouso (banco de dados) através de criptografia adequada.

    -> Exemplo(s) citado(s) pelo OWASP

        Armazenar senhas em texto puro ou com algoritmos fracos (como MD5), transmitir dados sensíveis via HTTP (sem cadeado/SSL) ou deixar chaves de criptografia "hardcoded" no código fonte.

    -> Risco no GinKQuiz é considerado **BAIXO**

    -> Justificativa da relevância do item para o projeto

        O Supabase gerencia automaticamente a criptografia de senhas (hashing) e força conexões HTTPS. O risco residual está apenas no manuseio incorreto de chaves de API pelo desenvolvedor no Front-end.

    -> Como posso verificar rapidamente a situação na aplicação?

        Verifique na tabela `auth.users` do Supabase se as senhas estão ilegíveis (hash). No navegador, garanta que o site redireciona automaticamente para `https://` ao tentar acessar via `http://`.


# A05 - Injeção

    -> O que é?

        Acontece quando dados não confiáveis enviados pelo usuário são interpretados pelo navegador ou banco de dados como comandos ou código a ser executado, e não como simples texto.

    -> Exemplo(s) citado(s) pelo OWASP

        SQL Injection (inserir comandos SQL em campos de login para manipular o banco) e Cross-Site Scripting (XSS - inserir scripts maliciosos em campos de texto que são executados no navegador de outros usuários).

    -> Risco no GinKQuiz é considerado **BAIXO**

    -> Justificativa da relevância do item para o projeto

        O React protege nativamente contra XSS (ao escapar variáveis no JSX) e o cliente JS do Supabase previne SQL Injection automaticamente. O risco surge apenas se houver uso de funções manuais inseguras.

    -> Como posso verificar rapidamente a situação na aplicação?

        Pesquise no código do projeto pelo uso de `dangerouslySetInnerHTML`. Se não estiver sendo usado, o risco de XSS é mínimo. Para SQL, evite escrever queries SQL puras concatenando strings manualmente.


# A06 - Design Inseguro

    -> O que é?

        Refere-se a falhas na arquitetura e na lógica de negócios antes mesmo da codificação. É um problema de "planejamento inseguro", onde o sistema funciona como programado, mas a lógica permite abusos.

    -> Exemplo(s) citado(s) pelo OWASP

        Recuperação de senha baseada em "perguntas de segurança" cujas respostas são públicas (redes sociais), ou fluxos de e-commerce que confiam no preço enviado pelo front-end sem validação no back-end.

    -> Risco no GinKQuiz é considerado **MODERADO**

    -> Justificativa da relevância do item para o projeto

        Como é um Quiz, existe o risco de falhas lógicas onde usuários podem burlar a pontuação, como recarregar a página para evitar contabilizar um erro ou manipular o cronômetro no front-end.

    -> Como posso verificar rapidamente a situação na aplicação?

        Tente "trapacear" no jogo: desligue a internet antes de errar uma questão ou recarregue a página no meio do quiz. Se o sistema permitir que você refaça sem penalidade, há uma falha de design.


# A07 - Falhas de Autenticação

    -> O que é?

        Falhas que permitem que atacantes comprometam senhas, chaves ou sessões de usuários. Ocorre quando o sistema não confirma a identidade do usuário de forma robusta.

    -> Exemplo(s) citado(s) pelo OWASP

        Permitir o uso de senhas fracas e comuns (ex: "123456"), não bloquear o usuário após múltiplas tentativas falhas de login (força bruta) ou permitir que sessões permaneçam ativas indefinidamente.

    -> Risco no GinKQuiz é considerado **BAIXO/MÉDIO**

    -> Justificativa da relevância do item para o projeto

        Embora o Supabase Auth seja seguro, cabe ao desenvolvedor configurar regras como exigência de senha forte e verificação de e-mail para evitar contas falsas (spam).

    -> Como posso verificar rapidamente a situação na aplicação?

        Tente criar um usuário com uma senha muito simples (ex: "123"). Se o sistema aceitar, a configuração de segurança está fraca. Verifique também se é possível fazer login sem confirmar o e-mail.


# A08 - Falhas de Integridade de Software ou de Dados

    -> O que é?

        Foca na proteção do código e da infraestrutura contra alterações não autorizadas, especialmente em processos de atualização automática e pipelines de deploy (CI/CD).

    -> Exemplo(s) citado(s) pelo OWASP

        Um atacante invade o repositório de código e altera o fonte antes do deploy automático, ou o sistema aceita dados serializados inseguros de fontes não confiáveis que executam código no servidor.

    -> Risco no GinKQuiz é considerado **BAIXO**

    -> Justificativa da relevância do item para o projeto

        Como um projeto individual, o maior risco é o comprometimento da conta do GitHub ou Vercel/Netlify, o que permitiria a um atacante alterar o site publicado.

    -> Como posso verificar rapidamente a situação na aplicação?

        Certifique-se de que a Autenticação de Dois Fatores (2FA) esteja ativada nas contas do GitHub, Supabase e na plataforma de hospedagem (Vercel/Netlify).

# A09 - Falhas de Registro e Alerta

    -> O que é?

        A ausência de registros (logs) adequados sobre eventos críticos de segurança, impedindo a detecção de ataques em andamento ou a análise posterior de incidentes.

    -> Exemplo(s) citado(s) pelo OWASP

        Falhas de login, erros de acesso (403 Forbidden) ou erros de servidor (500) que não são registrados, ou logs que são armazenados apenas localmente e apagados rapidamente.

    -> Risco no GinKQuiz é considerado **MODERADO**

    -> Justificativa da relevância do item para o projeto

        Sem logs acessíveis, é impossível saber se alguém está tentando burlar o Quiz ou realizando ataques de força bruta contra contas de usuários.

    -> Como posso verificar rapidamente a situação na aplicação?

        Acesse a seção "Reports" ou "Logs" no painel do Supabase. Verifique se é possível visualizar erros recentes e requisições falhas. Se você nunca olhou essa aba, a falha existe.


# A10 - Manejo Incorreto de Condições Especiais

    -> O que é?

        Ocorre quando o sistema falha de maneira insegura ("Fail Open") ou revela informações sensíveis ao usuário quando ocorre um erro. O sistema deve ser projetado para falhar de forma segura.

    -> Exemplo(s) citado(s) pelo OWASP

        Exibir "Stack Traces" (caminho do erro no código) na tela do usuário, ou um sistema de permissão que, ao encontrar um erro, permite o acesso por padrão em vez de bloquear.

    -> Risco no GinKQuiz é considerado **BAIXO**

    -> Justificativa da relevância do item para o projeto

        O Supabase tende a falhar de forma segura (retornando arrays vazios em vez de erros de SQL). No Front-end, o React deve tratar erros para não "quebrar" a tela inteira de forma hostil ao usuário.

    -> Como posso verificar rapidamente a situação na aplicação?

        Force um erro (como desconectar a internet ou tentar acessar uma rota inexistente) e observe a reação do site. Ele deve mostrar uma mensagem amigável, e não códigos de erro internos ou tela branca.


