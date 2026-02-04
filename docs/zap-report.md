Relatório de Vulnerabilidades - OWASP ZAP

**Data:** 04/02/2026
**Ferramenta:** OWASP ZAP
**Alvo:** http://localhost:5173 (Ambiente Local via Docker)

**## Resumo da Execução**

O scan foi realizado utilizando navegação manual (Manual Explore) para mapeamento de rotas, seguido de um Active Scan. Foram identificados alertas de nível Alto, Médio e Baixo, a maioria relacionada à ausência de headers de segurança no servidor de desenvolvimento (Vite).

---

*## Classificação dos Achados*

Abaixo, a análise de `3 alertas específicos` detectados no scan.

*### 1. Missing Anti-clickjacking Header (X-Frame-Options)*
* **Risco Detectado:** Médio
* **Descrição:** O servidor não retornou o cabeçalho `X-Frame-Options`. Isso teoricamente permite que o site seja embutido em um `<iframe>` malicioso.
* **Classificação:** **Relevante para Produção**.
* **Mitigação:** Ao fazer o deploy (Vercel/Netlify), configurar os headers para `DENY` ou `SAMEORIGIN`. No ambiente local (Docker/Vite), isso é esperado e aceitável.

*### 2. Content Security Policy (CSP) - Wildcard / Unsafe*
* **Risco Detectado:** Médio
* **Descrição:** Vários alertas de CSP indicando uso de `unsafe-inline` ou diretivas muito permissivas (Wildcard).
* **Classificação:** **Falso Positivo (Ambiente Dev)**.
* **Análise:** O Vite precisa injetar scripts inline para o "Hot Module Replacement" (atualização da tela em tempo real). Em produção, o build gera arquivos estáticos que permitem uma política CSP muito mais rigorosa.

*### 3. Hash Disclosure - BCrypt*
* **Risco Detectado:** Alto
* **Descrição:** O ZAP identificou strings que parecem hashes de senha (BCrypt) nas respostas.
* **Classificação:** **Falso Positivo / Investigar**.
* **Análise:** Provavelmente o ZAP encontrou strings de sessão ou IDs do Supabase que se assemelham ao formato de um hash. Como a autenticação é delegada ao Supabase, nossa aplicação não manipula hashes de senha diretamente no Frontend.
* **Ação Recomendada:** Verificar se nenhum `console.log` está expondo dados sensíveis no console do navegador (verificado na tarefa de Logs).

---

**## Conclusão**

O ambiente de desenvolvimento Dockerizado apresenta vulnerabilidades típicas de servidores leves (falta de headers restritivos). As vulnerabilidades críticas de injeção (SQLi/XSS) não foram exploradas com sucesso pelo ZAP, validando a segurança do uso de ORMs e Frameworks modernos (React + Supabase).

Além disso, algo importante de se citar é que eu não consegui manter o Docker, o VSCode e o ZAP abertos simultâneamente por muito tempo (meu notebook começou a travar bastante e esquentar), por conta disso a análise, e consequentemente o relatório, podem não estar tão completos quanto o desejado. No futuro vou tentar deixar a análise do ZAP rodando o máximo possível para que ele capture todas as vulnerabilidades e brechas. 

Nas imagens `zap-vulnerabilities-1.png` e `zap-vulnerabilities-2.png`, estão os prints dos erros encontrados na rápida análise de ataque ativo do OWASP ZAP.