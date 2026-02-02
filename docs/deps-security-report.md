Via npm audit foram encontradas 4 vulnerabilidades no código, das quais 3 são consideradas grau moderado de severidade e uma é considerada grau alto. As 3 vulnerabilidades mais relevantes para o projeto são:

1 - **js-yaml e lodash (riscos moderados)**
      Apresentam um erro chamado prototype pollution, que é basicamente a capacidade de um usuário manipular o objeto base do javascript.
      Isso pode fazer com que a aplicação trave ou até mesmo alterar a lógica do código.

2 - **react-router (alto risco)**
      Foram encontradas 4 vulnerabilidades, incluindo XSS (Cross-Site Scripting) e CSRF (Cross-Site Request Forgery).
      Esse tipo de brecha é considerada importantíssima e perigosa pois esse tipo de injeção pode fazer com que usuários sejam redirecionados para sites falsos ou causar o roubo de suas credenciais.

Todas as vulnerabilidades possuem correções utilizando o comando 'npm audit fix'.
Depois de utilizar o comando, novamente procurei encontrar novas vulnerabilidades, o que me permitiu ver um relatório atualizado.

No relatório atualizado, foram encontradas *0 vulnerabilidades*!

Após isso, rodei o código com "npm run dev" e testei todas as funcionalidades do site para garantir que a atualização feita via "npm audit fix" não teria gerado conflito algum com o restante do site, o que foi confirmado por mim logo depois do teste.
Portanto, todas as dependências que necessitavam de ajustes tiveram seus devidos consertos.


