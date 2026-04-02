# AletheIA — Hello World

## Objetivo

Este é o menor fluxo completo do `AletheIA`.

Ele mostra, de forma simples, como uma tarefa passa por:

1. framing
2. contexto
3. decisão
4. execução
5. handoff
6. learning

---

## Cenário

Uma pessoa pede:

> “Atualize o título do README para deixá-lo mais claro.”

É uma tarefa simples, de baixo risco e sem necessidade de automação complexa.

Por isso, ela é um bom `hello-world`.

---

## O que este exemplo quer provar

Mesmo numa tarefa pequena, o `AletheIA` consegue deixar explícito:

- qual é a tarefa
- qual contexto foi usado
- qual decisão foi tomada
- por que a decisão foi considerada segura
- o que foi executado
- como a próxima thread retomaria
- o que foi aprendido

---

## Arquivos deste exemplo

- `task-brief.json`
- `context-pack.json`
- `decision-record.json`
- `execution-record.json`
- `handoff-record.json`
- `learning-record.json`

---

## Leitura do fluxo

### 1. Task Brief

Define que a tarefa é:

- tipo `A`
- severidade `S1`
- risco `low`

Ou seja: mudança local, simples e reversível.

### 2. Context Pack

Seleciona apenas o contexto necessário:

- `README.md`
- `ARCHITECTURE.md`
- regra de escrita curta

Sem despejar o projeto inteiro.

### 3. Decision Record

Registra que a melhor ação é:

- `allow`
- seguir com edição pequena
- sem human gate

### 4. Execution Record

Mostra a execução mockada:

- adapter local
- branch isolada
- validação simples

### 5. Handoff Record

Explica como outra thread retomaria sem reler tudo.

### 6. Learning Record

Mostra um aprendizado reaproveitável:

- para mudanças pequenas de docs, `Task Brief + Context Pack` curtos já bastam
- esse padrão pode virar heurística do framework

---

## Por que esse exemplo importa

Porque ele mostra que o `AletheIA` não existe só para casos complexos.

Mesmo em uma tarefa pequena, ele já entrega:

- clareza
- rastreabilidade
- disciplina de contexto
- base para validação

Esse é o comportamento mínimo que o alpha precisa sustentar.
