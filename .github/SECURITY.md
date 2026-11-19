# Segurança e colaboração

Relate problemas em `contato@deborapaiva.adv.br`. Não publique dados de terceiros,
senhas, backups ou capturas contendo dados pessoais em issues ou pull requests.

Este repositório hospeda somente o site institucional. Bases de alunos e ferramentas
de sorteio pertencem a um projeto privado com autenticação no servidor.

Depois da reescrita do histórico de 19/11/2026, refaça o clone antes de colaborar.
Não faça merge de branches antigas: isso pode reintroduzir os objetos removidos.

Verificações periódicas:

```sh
node scripts/audit-forks.mjs
node scripts/audit-history.mjs
```

Um resultado não zero exige análise; ele não autoriza excluir forks ou alterar contas.
O script de histórico sinaliza caches ainda acessíveis, sem baixar o conteúdo antigo.
