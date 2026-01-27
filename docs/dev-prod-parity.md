# 1 - Introdução

O projeto atualmente roda em sistemas operacionais diferentes em dev e prod.
Localmente, o site roda em Windows (SO da minha máquina) e com o Vite (traduzindo em tempo real o site pro navegador).
Já em produção, a aplicação roda em Linux pelo Vercel.

# 2 - Tabela de Diferenças

| Ambiente | Código | Erros | Dados |
| :---: | :---: | :---: | :---: |
| Dev (local) | O navegador recebe arquivos grandes e legíveis que possuem comentários, linhas puladas e outras características. O Vite serve de auxílio para atualizar o site assim que alguma parte do código for alterada. | Em caso de erro, a tela fica vermelha e aparecem todos os erros técnicos identificados para que seja mais fácil identificar e corrigir os problemas. | É possível criar usuários e perguntas teste, apagar tabelas, alterar dados, manter as senhas visíveis (sem criptografia) e muitas outras coisas. Nessa fase é possível explorar suas ideias. |
| Prod (produção) | O código está fechado. O comando de build remove todos os comentários, espaços em branco e traduz o jsx para 3 arquivos (css, js e html). O navegador lê isso em milissegundos, mas pessoas não conseguem entender. | Se o código quebrar, o site não faz nada ou pode aparecer uma mensagem simples e amigável dizendo que houve um erro. Em prod, o site esconde os erros para garantir a segurança maior da aplicação contra hackers, por exemplo. | Aqui os dados dos usuários reais já estão no banco de dados e não é mais possível alterá-lo como antes. Se apagar ou mudar algo, o histórico real dos usuários será perdido ou comprometido. Não é espaço para testes. |

# 3 - Lista de Diferenças (tabela anterior organizada em lista)

### Diferenças no Código:

      **Dev**: O navegador recebe arquivos grandes e legíveis que possuem comentários, linhas puladas e outras características. O Vite serve de auxílio para atualizar o site assim que alguma parte do código for alterada.
       
      **Prod**: O código está fechado. O comando de build remove todos os comentários, espaços em branco e traduz o jsx para 3 arquivos (css, js e html). O navegador lê isso em milissegundos, mas pessoas não conseguem entender.

### Diferenças nos Erros:

      **Dev**: Em caso de erro, a tela fica vermelha e aparecem todos os erros técnicos identificados para que seja mais fácil identificar e corrigir os problemas.
       
      **Prod**: Se o código quebrar, o site não faz nada ou pode aparecer uma mensagem simples e amigável dizendo que houve um erro. Em prod, o site esconde os erros para garantir a segurança maior da aplicação contra hackers, por exemplo. 

### Diferenças nos Dados:

      **Dev**: É possível criar usuários e perguntas teste, apagar tabelas, alterar dados, manter as senhas visíveis (sem criptografia) e muitas outras coisas. Nessa fase é possível explorar suas ideias.
       
      **Prod**: Aqui os dados dos usuários reais já estão no banco de dados e não é mais possível alterá-lo como antes. Se apagar ou mudar algo, o histórico real dos usuários será perdido ou comprometido. Não é espaço para testes.

# 4 - Riscos

  1 - **Case Sensitivity:** Como dito anteriormente, o dev é em Windows e a prod é em Linux. O maior problema disso é a Case Sensitivity, já que o Windows é mais flexível e o Linux é muito rígido. Portanto, isso é um risco grande a ser tomado, que se anularia completamente caso fosse ao contrário (dev em Linux e prod em Windows).

  2 - **Banco de dados:** O mesmo banco de dados utilizado em dev (para testes) é também usado em prod, o que representa um risco no embaralhamento de dados reais e dados teste. Além disso, um risco ainda maior é a chance de deletar dados reais ao invés dos dados teste criados em dev.

  3 - **Chaves:** Por conta da prod usar o Vercel para subir o site, existe o risco de errar as chaves de acesso do banco de dados ou esquecer de colocá-las no Vercel (ou outra ferramenta). Nesse caso o site não funcionaria pois nem o login poderia ser realizado.

  4 - **Erro no Build:** Erros de sintaxe geralmente não são acusados no dev, por isso o npm run dev funciona perfeitamente enquanto o deploy no Vercel (build) falha. Isso é um risco comum (aconteceu diversas vezes durante o desenvolvimento do projeto) e que nos faz gastar um tempo extra pensando e descobrindo qual erro impediu que o build funcionasse.



# 5 - Sugestões de Melhorias

  1 - Rodar o script localmente (npm run build + npm run preview) antes de dar o commit para garantir que não hajam erros de sintaxe que possam quebrar o build posteriormente.

  2 - Usar dois projetos no supabase, um para testes no dev e um para o prod. Dessa forma não há perigo de deletar dados importantes ou de misturar dados "lixo" com os reais.

  3 - Usar alguma ferramenta para Windows que seja Case Sensitive, dessa forma, ao rodar no Linux, não haverão problemas.

  4 - Criar um script que verifique se a chave do Supabase está correta para que o programa acuse caso não haja chave alguma.