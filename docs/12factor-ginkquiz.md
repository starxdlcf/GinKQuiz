# Twelve-Factor aplicado ao GinKQuiz

## I. Codebase

### Situação atual:

O GinKQuiz segue bem esse primeiro requisito: ter apenas uma codebase com vários deploys. Todos os desenvolvedores que trabalham ou já trabalharam no projeto fazem/faziam seus deploys pela forma commit do Github utilizando o Github Desktop, dessa forma todos partiam da mesma base de programação.

### Oportunidades de melhoria:



## II. Dependencies

### Situação atual:

O GinKQuiz não teve uma metodologia exata de programação para ser usada como base em seu desenvolvimento portanto, assim que executei o comando "npx depcheck" para verificar as dependências do projeto, algumas bibliotecas de gráficos estavam marcadas como "missing dependencies". 

### Oportunidades de melhoria:

Rodar o comando "npx depcheck" sempre que alguma dependência nova for utilizada no projeto para ter certeza de que nada está sendo acusado como faltante, assim como ocorreu com a biblioteca de gráficos citada no item anterior.



## III. Config

### Situação atual:

No projeto, ao adicionar as configurações, os desenvolvedores já protegeram os dados das variáveis de ambiente usando o .env e não deixando expostas no código.

### Oportunidades de melhoria:



## IV. Backing Services

### Situação atual: 

Os serviços externos e locais estão bem colocados sem estarem alocados em variáveis dentro do código. caso o banco de dados que utilizamos caísse, poderíamos facilmente conectar o projeto a um novo banco de dados sem mexer no código diretamente.

### Oportunidades de melhoria:

Poderíamos criar uma pasta específica para os serviços para garantir que todas as informações necessárias estão corretas.



## V. Build, release, run

### Situação atual:

O próprio Vite separa muito bem a parte de construção do restante, pois ao rodar o npm run build ela gera uma pasta dist com arquivos imutáveis e que nós não conseguimos ler (essa pasta é todo o código em jsx compactado em html, css e js, as linguagens que o navegador interpreta), portanto não há formas de alterar o código durante o build do projeto.

### Oportunidades de melhoria:

Garantir que o servidor utilizará apenas o que está na pasta dist para fazr o build (sem utilizar npm run dev).



## VI. Processes

### Situação atual:

O projeto usa variáveis de ambiente no .env mas algumas chaves podem estar expiradas (por exemplo, a do supabase)

### Oportunidades de melhoria:

Podemos implementar uma validação e rotação automática de chaves ou pagar o supabase.


## VII. Port Binding

### Situação atual:

O projeto segue o fator, pois o Vite é o que sustenta o projeto rodando, sem a necessidade de instalar nenhum servido externo.

### Oportunidades de melhoria:



## VIII. Concurrency

### Situação atual:

Por conta do React, o projeto é naturalmente aderente às adaptações pela quantidade de usuários e pode ser bem moldado para não gerar nenhum conflito no código ou em usos de arquivos. A API do Supabase também funciona dessa forma, se adaptando à medida em que o projeto escalona.

### Oportunidades de melhoria:

Poderíamos implementar um sistema de cache para as respostas para não depender apenas do banco de dados e também monitorar o limite de conexões simutâneas permitido pelo plano do supabase, que atualmente é o gratuito.



## IX. Disposibility

### Situação atual:

### Oportunidades de melhoria:



## X. Dev/prod parity

### Situação atual:

### Oportunidades de melhoria:



## XI. Logs

### Situação atual:

### Oportunidades de melhoria:



## XII. Admin processes

### Situação atual:

### Oportunidades de melhoria: