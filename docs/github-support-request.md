# Pedido de limpeza ao suporte do GitHub

Enviar pelo portal https://support.github.com com a conta proprietária do repositório.
Este documento é um rascunho: nenhum chamado foi enviado automaticamente.

Assunto: Dados pessoais em commits antigos após reescrita do histórico

Repositório: https://github.com/EricoBorgonove/deborapaiva.adv

Removemos do histórico publicado bases de alunos com nomes, matrículas e turmas,
além de código que continha uma senha de acesso no cliente. Os arquivos estavam
em `public/data/` e os componentes de sorteio em `src/`.

O commit antigo `1519c476bc833edf7b429d4904ea5d1e3e4d9794` ainda foi acessível pela API
após a reescrita. Solicitamos avaliação para remover referências antigas e caches,
e executar a coleta de objetos correspondente. A consulta pública de 19/11/2026
não encontrou forks. Confirmar também se existem referências internas de PRs.

O commit que introduziu as bases foi `ce61781` (consultar o hash completo no bundle
privado original, se solicitado). Não anexar as bases pessoais ou a senha ao chamado.
As evidências e os objetos originais de recuperação estão fora do repositório público.
