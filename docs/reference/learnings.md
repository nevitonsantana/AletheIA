# AI LESSONS

## Objetivo

Registrar lições recorrentes do sistema de trabalho com IA sem transformar isso em diário solto de sessão.

Este arquivo existe para preservar:

- erros repetíveis
- ajustes de processo
- heurísticas novas realmente úteis
- padrões que evitam reincidência

## Quando registrar

Registrar apenas quando houver pelo menos um destes casos:

- o mesmo erro poderia voltar em outra thread
- uma regra de ativação precisou ser refinada
- uma heurística nova melhorou claramente a execução
- uma falha de coordenação expôs lacuna do processo

## Quando não registrar

Não registrar:

- observação trivial
- nota redundante com `docs/DECISIONS.md`
- resumo de tarefa comum
- comentário que só faz sentido para uma sessão isolada

## Formato recomendado

```md
### LESSON-XXX — título curto

Contexto:
- 

Lição:
- 

Aplicação futura:
- 

Referências:
- 
```

## Entradas

### LESSON-001 — Validar travessia com mudança mínima de contrato antes de abrir UI ou telemetria

Contexto:
- no segundo teste do sistema operacional, precisávamos validar uma tarefa `Tipo B` em `PR/Comms` cruzando `Feature Development` e `Cris Assistente`
- a evolução escolhida foi explicitar a origem do resumo executivo híbrido no contrato de exportação

Lição:
- quando a travessia é real, mas o escopo ainda é médio, o melhor piloto costuma ser uma mudança mínima de contrato verificável
- expor metadata em header HTTP foi suficiente para validar frente dominante, travessia, tríade leve e QA leve sem invadir UI ou observabilidade

Aplicação futura:
- antes de abrir superfícies visuais ou telemetria adicional, preferir primeiro uma mudança de contrato pequena, reversível e testável

Referências:
- `docs/FEATURE_pr-comms-backend-phase2.md`
- `docs/DECISIONS.md` (`PRC-003`)

### LESSON-002 — Separar ownership textual de ownership visual evita conflito falso entre Codex e Claude Code

Contexto:
- o processo evoluiu para uma colaboração estável entre `Codex`, `Claude Code` e apoio pontual do `ChatGPT`
- parte importante do trabalho recente envolveu landing, `/guia`, `/docs` e handoffs de interface, onde o texto precisava evoluir sem reabrir ownership visual do `Claude Code`

Lição:
- em superfícies de UX/UI, a fronteira mais útil nem sempre é “quem toca o arquivo”, mas “qual é a natureza dominante da mudança”
- mudanças dominadas por `UX Writing` podem atravessar superfícies visuais desde que não virem redesign silencioso
- isso reduz conflito artificial entre ferramentas e evita bloquear evolução de copy, glossário e documentação

Aplicação futura:
- antes de barrar uma edição por ownership de arquivo, classificar se a mudança é visual, funcional ou textual
- quando a mudança for textual em superfície visualmente owned, preservar layout/comportamento e registrar handoff só para polish visual se necessário
- usar handoffs dedicados quando a interface depender de backend já consolidado em outras threads

Referências:
- `AGENTS.md`
- `docs/THREAD_OPERATING_SYSTEM.md`
- `docs/THREAD_CHECKLIST.md`
- `docs/handoffs/claude-code-ui-handoff-2026-03-27.md`

### LESSON-003 — Heurística determinística precisa olhar o escopo positivo da tarefa, não o vazio do escopo excluído

Contexto:
- no primeiro smoke do kernel do `AletheIA`, o `hello-world` de documentação de baixo risco estava retornando `continue` em vez de `allow`
- a causa foi uma heurística de `docsOnlyHint` derivada do campo errado do escopo (`scope.out`), o que impedia reconhecer corretamente uma tarefa pequena e documental

Lição:
- em kernels determinísticos, heurísticas simples precisam nascer do que a tarefa explicitamente inclui, não da ausência de pistas em áreas excluídas
- para classificar fluxos leves (`docs-only`, `local-only`, `low-risk`), o melhor sinal costuma estar no escopo positivo e nas entradas declaradas
- quando a heurística é pequena, vale protegê-la com smoke test imediatamente, porque esse tipo de regressão muda a semântica do framework sem necessariamente quebrar o runtime

Aplicação futura:
- ao adicionar novos gates heurísticos no `AletheIA`, partir primeiro de sinais afirmativos em `Task Brief` e `Context Pack`
- manter smoke tests pequenos para cada desvio semântico importante (`allow`, `review`, `ask_human`, `block`)
- evitar depender de “não apareceu nada” como principal evidência para classificar uma tarefa

Referências:
- `lib/aletheia/compiler.ts`
- `scripts/aletheia/test-kernel.ts`
- `scripts/aletheia/hello-world.ts`

### LESSON-004 — Ambiguidade operacional também é um gatilho legítimo de review, mesmo sem risco extremo

Contexto:
- ao expandir o kernel mínimo do `AletheIA`, precisávamos provar não apenas o caminho `allow`, mas também um caminho de freio por baixa confiança
- para isso, foi adicionado um cenário `low-confidence-review`, onde a tarefa continua pequena e de baixo risco, mas o pedido e o contexto são ambíguos demais para executar direto

Lição:
- em frameworks de trabalho assistido por IA, a decisão de revisão não deve depender só de risco alto ou severidade estrutural
- ambiguidade suficiente já é um sinal operacional válido para parar, revisar e esclarecer antes da ação
- isso ajuda a separar melhor “tarefa simples” de “tarefa compreendida com segurança”

Aplicação futura:
- ao evoluir policies do `AletheIA`, manter um eixo explícito de `confidence/ambiguity`, e não apenas `risk/severity`
- usar esse eixo em exemplos, testes dourados e futuros playbooks de operação
- preservar a distinção entre `review` por baixa confiança e `ask_human` por risco crítico

Referências:
- `lib/aletheia/compiler.ts`
- `lib/aletheia/policy.ts`
- `docs/examples/aletheia/low-confidence-review/README.md`

### LESSON-005 — Um pack de governança forte não substitui o framework; ele precisa ser tratado como camada transversal

Contexto:
- ao avaliar o documento de best practices e o JSON de regras para desenvolvimento com IA, ficou claro que o material era forte demais para ser tratado só como referência
- ao mesmo tempo, ele ainda era estreito demais para definir sozinho o `AletheIA`, porque o framework também cobre decisão, contexto, learnings, memória e operação além do software delivery

Lição:
- quando um conjunto de regras é forte e executável, o melhor lugar dele costuma ser um `Governance Pack`, e não a definição total do framework
- isso permite absorver rigor operacional sem reduzir a ambição do sistema maior
- também evita confundir `policy pack` com `engine`

Aplicação futura:
- ao incorporar novos domínios no `AletheIA`, preferir novos packs especializados (ex.: software development, incident response, content operations) em vez de tentar encaixar tudo em uma policy universal única
- separar sempre:
  - framework
  - kernel
  - governance pack
  - interpreter

Referências:
- `docs/architecture/aletheia-development-governance-pack.md`
- `docs/architecture/aletheia-rule-interpreter.md`
- `docs/policies/aletheia-development-governance.v1.json`

### LESSON-006 — Policy Trace é parte do produto de governança, não só detalhe técnico do interpretador

Contexto:
- ao implementar o `Rule Interpreter v1`, ficou claro que devolver apenas a ação final (`allow/review/ask_human/block`) seria insuficiente
- para o AletheIA continuar explicável, o interpretador precisava mostrar também quais regras foram avaliadas, quais dispararam e com base em quais fatos

Lição:
- em camadas de governança, explicabilidade não é acessório: ela é parte da própria utilidade do sistema
- um `Policy Trace` simples já aumenta muito a auditabilidade e ajuda a depurar regras, fatos e precedência de ações
- isso também aproxima a camada de governança da linguagem humana do framework

Aplicação futura:
- toda expansão do `Rule Interpreter` deve preservar uma saída de trace legível
- novos hooks e novos packs devem manter a mesma disciplina de explicação
- quando houver integração com runtime real, o trace deve continuar visível e versionável

Referências:
- `lib/aletheia/governance.ts`
- `docs/architecture/aletheia-rule-interpreter.md`
- `scripts/aletheia/test-rule-interpreter.ts`

### LESSON-007 — Governança fica mais útil quando a fronteira da mudança e a avaliação viram artefatos próprios

Contexto:
- depois de criar `Governance Pack`, `Facts Model` e `Rule Interpreter`, ainda faltava registrar explicitamente duas coisas:
  - a fronteira declarada da execução
  - o resultado persistível da avaliação de política

Lição:
- uma camada de governança amadurece bastante quando transforma entrada e saída em artefatos formais
- `Execution Scope` ajuda a tornar audível o “o que podia ser feito”
- `Policy Evaluation` ajuda a tornar durável o “como a governança decidiu”

Aplicação futura:
- ao integrar hooks reais, usar `Execution Scope` como insumo de entrada da governança
- persistir `Policy Evaluation` sempre que um hook produzir decisão relevante
- evitar deixar avaliação de política apenas em logs efêmeros ou mensagens de sessão

Referências:
- `docs/architecture/aletheia-governance-artifacts.md`
- `docs/schemas/aletheia-execution-scope.schema.json`
- `docs/schemas/aletheia-policy-evaluation.schema.json`

### LESSON-008 — Hook real de framework é o ponto em que governança deixa de ser só capacidade e vira fluxo

Contexto:
- depois de criar Governance Pack, Facts Model, Rule Interpreter, Execution Scope e Policy Evaluation, a camada ainda estava “completa no papel”, mas não plenamente conectada ao fluxo
- a criação de `before_execute`, `after_execute` e `before_finalize` dentro da própria camada AletheIA resolveu isso sem acoplar cedo ao produto real

Lição:
- existe um salto importante entre “ter um interpretador” e “ter hooks reais do framework”
- esse salto é o que transforma governança em comportamento operacional recorrente
- fazer isso primeiro dentro da camada AletheIA, e só depois ligar ao produto, reduz acoplamento e mantém a arquitetura mais limpa

Aplicação futura:
- ao integrar com o `Crisis Monitor`, preservar a camada de hooks do AletheIA como fronteira estável
- evitar que o produto pule direto para o interpretador sem passar pelos hooks oficiais
- tratar novos hooks como expansão de fluxo, não só como helper utilitário

Referências:
- `lib/aletheia/governance-hooks.ts`
- `docs/architecture/aletheia-governance-hooks.md`
- `scripts/aletheia/test-governance-hooks.ts`

### LESSON-009 — A fase de finalize precisa tensionar separadamente “não validei” e “validei, mas não alinhei com a fonte de verdade”

Contexto:
- ao ampliar a cobertura dos hooks de governança, adicionamos dois cenários de `before_finalize`:
  - falta de validação obrigatória
  - mismatch / falta de atualização do `source-of-truth artifact`

Lição:
- esses dois casos parecem parecidos, mas não são o mesmo problema
- “não validei” é ausência de prova mínima
- “validei, mas não alinhei com a fonte de verdade” é falha de governança documental/contratual
- manter esses caminhos separados ajuda o framework a explicar melhor por que está bloqueando

Aplicação futura:
- continuar modelando o fechamento da tarefa com causas de bloqueio separadas
- usar essas distinções em futuros golden tests e no piloto real
- evitar um único “block genérico” no fechamento quando a causa operacional é diferente

Referências:
- `docs/examples/aletheia/governance/block-validation-required.json`
- `docs/examples/aletheia/governance/block-source-of-truth-mismatch.json`
- `scripts/aletheia/test-governance-hooks.ts`

### LESSON-010 — Falha de validação também deve gerar aprendizado útil, não só bloqueio

Contexto:
- depois de fechar kernel, governança e quality baseline, ainda faltava provar que uma falha de validação não termina apenas em `block`
- o cenário `learning-from-failed-validation` mostrou que `Policy Evaluation` também pode alimentar um `Learning Record` reutilizável

Lição:
- quando uma tarefa falha no fechamento por ausência de validação, o framework deve capturar isso como `test_gap`
- isso evita perder a causa do bloqueio e transforma o erro em melhoria concreta de checklist, teste ou playbook
- a camada de Learnings fica mais útil quando nasce de evidência operacional, não apenas de reflexão manual

Aplicação futura:
- ligar falhas de validação a learnings persistíveis em futuros hooks reais do produto
- preservar a distinção entre bloqueio operacional e aprendizado acionável
- usar esse padrão no futuro piloto do `Crisis Monitor`

Referências:
- `lib/aletheia/learnings.ts`
- `docs/examples/aletheia/learning-from-failed-validation/README.md`
- `scripts/aletheia/test-learnings.ts`
