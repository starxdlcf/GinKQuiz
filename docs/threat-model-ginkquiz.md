

## 1. Atores e Ativos -----------------------------------------------------------------------------------------------------------------------------

### Atores (Quem usa o sistema?)

* **Usuário Comum (Jogador):** Acessa o sistema para jogar e/ou ver clãs.
* **Não-Usuário:** Acessa o sistema para ver rankings sem se cadastrar ou fazer login em sua conta.
* **Administrador:** Gerencia perguntas e dicas.
* **Atacante Externo:** Alguém sem conta tentando derrubar o site, roubar dados ou outros tipos de ataque (por exemplo injeções).
* **Usuário Mal-intencionado:** Usuário logado tentando manipular sua própria pontuação ou roubar de alguma outra forma.

### Ativos (O que tem valor?)

* **Pontuação/Ranking:** A integridade do jogo e do método de pontuação (quem ganha).
* **Dados dos Usuários:** E-mail, nome, ID, senha... Todos os dados de privacidade dos usuários.
* **Banco de Perguntas:** Propriedade do GinKQuiz. Ao saber as perguntas a manipulação de pontuação é facilitada.
* **Disponibilidade do Serviço:** O site estar no ar.

---

## 2. Mapeamento de Ameaças -----------------------------------------------------------------------------------------------------------------------

*### Ameaça 1: Manipulação de Pontuação*

* **Descrição:** O usuário joga o Quiz no navegador (Front-end). Ao final, o React envia uma requisição para o Supabase dizendo "Fiz X pontos". Um usuário técnico pode interceptar essa requisição e enviar uma pontuação falsa (ex: 999999) diretamente para a API.

* **Controles Atuais:**
    * A lógica de pontuação está totalmente na relação cliente/navegador.

* **Sugestão:**
    * Validar a pontuação no Backend.
    * O Front-end poderia enviar apenas as **respostas** (ex: `{pergunta: 1, resposta: 'A'}`), e o servidor calcularia a nota final.

*### Ameaça 2: Cross-Site Scripting (XSS) em Nicknames/Perguntas*

* **Descrição:** O sistema permite que o usuário crie um clã e um nickname, o que pode ser uma brecha para um atacante tentar inserir código Javascript malicioso (scripts de código que roubam informações) nesses campos. Quando outro usuário carregar o Ranking, por exemplo, esse código rodaria no navegador dele.

* **Controles Atuais:**
    * Como descrito em `xss-analise.md`, o React, por padrão, escapa conteúdos no JSX, o que já previne a maioria dos casos simples.
    * Depois de várias tentativas de ataques XSS, o site está bem protegido em relação a isso, mas não deixa de ser importante listar como uma ameaça que deve ter atenção.

* **Sugestão:**
    * Caso se faça necessário, utilizar uma ferramenta sanitizadora para auxilio ainda maior contra tais injeções.

*### Ameaça 3: Acesso Indevido a Dados (IDOR / RLS)*

* **Descrição:** Um usuário logado pode tentar acessar a tabela `usuarios` e listar os dados de todos os outros jogadores (e-mails, IDs) simplesmente alterando a query no cliente Supabase.

* **Controles Atuais:**
    * Autenticação via Google/Supabase Auth.

* **Sugestão:**
    * Tornar a autenticação independente em cada página para impedir que um usuário comum acesse páginas de gerenciamento.

---

## 3. Conclusão -----------------------------------------------------------------------------------------------------------------------------------

O risco mais crítico imediato é a *manipulação de pontuação*, pois quebra todo o propósito competitivo do jogo. A implementação da *autenticação automática* em várias etapas (a cada página) é a prioridade de segurança para proteger os dados dos usuários.