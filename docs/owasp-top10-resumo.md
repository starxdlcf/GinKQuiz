
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

    -> Exemplo(s) citado(s) pelo OWASP

    -> Risco no GinKQuiz é considerado **ALTO**

    -> Justificativa da relevância do item para o projeto

    -> Como posso verificar rapidamente a situação na aplicação?


# A06 - Design Inseguro

    -> O que é?

    -> Exemplo(s) citado(s) pelo OWASP

    -> Risco no GinKQuiz é considerado **ALTO**

    -> Justificativa da relevância do item para o projeto

    -> Como posso verificar rapidamente a situação na aplicação?


# A07 - Falhas de Autenticação

    -> O que é?

    -> Exemplo(s) citado(s) pelo OWASP

    -> Risco no GinKQuiz é considerado **ALTO**

    -> Justificativa da relevância do item para o projeto

    -> Como posso verificar rapidamente a situação na aplicação?


# A08 - Falhas de Integridade de Software ou de Dados

    -> O que é?

    -> Exemplo(s) citado(s) pelo OWASP

    -> Risco no GinKQuiz é considerado **ALTO**

    -> Justificativa da relevância do item para o projeto

    -> Como posso verificar rapidamente a situação na aplicação?


# A09 - Falhas de Registro e Alerta

    -> O que é?

    -> Exemplo(s) citado(s) pelo OWASP

    -> Risco no GinKQuiz é considerado **ALTO**

    -> Justificativa da relevância do item para o projeto

    -> Como posso verificar rapidamente a situação na aplicação?


# A10 - Manejo Incorreto de Condições Especiais

    -> O que é?

    -> Exemplo(s) citado(s) pelo OWASP

    -> Risco no GinKQuiz é considerado **ALTO**

    -> Justificativa da relevância do item para o projeto

    -> Como posso verificar rapidamente a situação na aplicação?


