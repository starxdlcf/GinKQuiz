# Lista de todas as entradas vulneráis a XSS 

  1- LOGIN - input email
  2- LOGIN - input senha
  3- CADASTRO - input email
  4- CADASTRO - input nome
  5- CADASTRO - input senha
  6- CADASTRO - input repetir senha
  7- BUSCAR CLÃ - input busca por nome
  8- BUSCAR CLÃ - input busca por id
  9- CRIAR CLÃ - input nome
  10- CRIAR CLÃ - input descrição
  11- EDITAR PERGUNTA - input titulo
  12- EDITAR PERGUNTA - input resposta 1
  13- EDITAR PERGUNTA - input resposta 2
  14- EDITAR PERGUNTA - input resposta 3
  15- EDITAR PERGUNTA - input resposta 4
  16- EDITAR PERGUNTA - input dica
  17- CRIAR PERGUNTA - input titulo
  18- CRIAR PERGUNTA - input resposta 1
  19- CRIAR PERGUNTA - input resposta 2
  20- CRIAR PERGUNTA - input resposta 3
  21- CRIAR PERGUNTA - input resposta 4
  22- CRIAR PERGUNTA - input dica
  23- PERFIL - alert imagem 
  24- PERFIL - input nome

# Conclusões após a análise do GinKQuiz

  Testei os campos e verifiquei todo o código para saber se as aberturas para o usuário estavam protegidas. Também simulei ataques xss refletidos, armazenados e diretamente no DOM do navegador.
  Como o React usa um DOM virtual, os ataques por esse meio estão mais protegidos, já que antes de executar, o React compara o DOM real (alterado) e o DOM virtual (não atingido).
  Ao tentar algumas formas de XSS refletidos e armazenados, observei que em momento algum o React interpreta como html as tentativas de injeções. Mesmo colocando outras tags diferentes da usual <script> (img, por exemplo). Dessa forma, concluo que o GinKQuiz está bem protegido contra esse tipo de ataque, tendo o escape html do React a seu favor.
  Para finalizar, não achei necessário o uso de ferramentas extras para a proteção da aplicação, porém já havia pesquisado e aprendido a utilizar o DOMPurify, que foi o sanitizador que mais me foi recomendado pelos videos, sites e IA's que consumi.


