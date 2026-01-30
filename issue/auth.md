# Autenticação e Armazenamento

    - O método de envio é por Header HTTP;

    - As informações ficam armazenadas na memória volátil do JavaScript, ou seja, ela está localizada dentro do código, o que a torna mais difícil de acessar;

    - O risco de injeções poderem capturar as chaves de acesso ainda são relevantes. O maior risco são os tipos de XSS que interceptam requisições de rede, pois estas podem capturar a chave durante a sessão do usuário;

    - Outro risco é a de perda da sessão, pois é necessário uma configuração extra para que o site não perca o login do usuário ao recarregar a página.

    Além de todas essas características existe um problema que foi descoberto recentemente por mim, ao simular um ataque XSS no site: Usuários Comuns e Não-Usuários podem mudar a rota do URL e acessar as páginas de gerenciamento. 
    Ao testar, descobri que as informações são realmente salvas e que essa representaria uma brecha muito grande de segurança e abertura para possíveis ataques XSS, SQL ou outros.

# Permissões

    Inicialmente, temos 3 tipos de usuários: Administradores, Usuários Comuns e "Não-Usuários". 
    Os admins podem acessar as páginas de gerenciamento de perguntas, tendo permissão para criar, editar e deletar perguntas e dicas.
    Os usuários comuns, por sua vez, são users que possuem cadastro no GinKQuiz e que não estão autorizados a gerenciar perguntas e dicas. Os usuários comuns representam a maior parte do site.
    Por sua vez, os não-usuários são internautas que, sem efetuar cadastro ou login, acessam a página inicial (login) e/ou a página de ranking, que não necessita de reconhecer o id do usuário para ser mostrada. Os não-usuários não tem permissão para jogar, criar clãs ou entrar nos mesmos.
    Portanto:

    Quem pode criar quizzes? 
        --> Os Admins

    Quem pode responder os quizzes?
        --> Admins e Usuários

    Quem pode ver os resultados enviados ao Ranking?
        --> Admins, Usuários e Não-Usuários

# Melhorias

    1 - **Melhorar e tornar mais segura a autenticação do usuário independente em cada página**, fazendo uma checagem constante (a cada troca de página) do id do usuário, impedindo o acesso de não-administradores às páginas de gerenciamento.

    2 - **Reforçar o token de autenticação para tornar ainda mais difícil as injeções, sejam elas XSS ou SQL**, por meio de ferramentas (como pgTAP ou algumas funções da linguagem SQL) que auxiliam na adição de camadas de segurança antes de chegar ao RLS.

    3 - **Implementação de um Refresh Token**, que seria um token de sessão, que é usado uma vez e descartado. Isso dificultaria o roubo de sessões por scripts maliciosos.

    4 - **Possibilidade de migração para Cookies HttpOnly**, uma outra alternativa ao Refresh Token, que são os cookies seguros. Eles adicionam uma camada extra ao armazenamento em memória já utilizado, pois mantém a segurança, adicionando a persistência de não "cair" o usuário toda vez que a página for recarregada.
