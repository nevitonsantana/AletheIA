# Premortem Skill — Core

## Objetivo

Executar uma análise premortem sobre planos, produtos, decisões, lançamentos, estratégias ou compromissos com custo relevante de erro.

A skill assume que a iniciativa falhou em um horizonte futuro definido e trabalha retroativamente para identificar:

- causas prováveis de falha;
- premissas frágeis;
- sinais de alerta observáveis;
- ajustes preventivos;
- gates necessários antes da execução.

## Definição

Premortem é uma técnica de análise preventiva. Em vez de perguntar "o que pode dar errado?", ela estabelece o enquadramento: "esta iniciativa já falhou; explique por quê".

Esse enquadramento reduz otimismo automático e força uma análise mais específica de causalidade, dependências, riscos e pontos cegos.

**Premortem ≠ Postmortem.** Postmortem reconstrói causas depois de uma falha real. Premortem antecipa causas antes da execução.

## Quando usar

Use esta skill quando houver:

- uma decisão concreta;
- um plano minimamente formado;
- custo relevante de erro;
- possibilidade de ajuste antes da execução;
- incerteza importante;
- impacto em produto, negócio, usuário, dados, segurança, reputação ou governança.

Exemplos adequados:

- lançamento de produto ou feature;
- mudança de estratégia ou posicionamento;
- experimento com IA/agentes;
- alteração em fluxo crítico de usuário;
- decisão arquitetural difícil de reverter;
- plano com múltiplos stakeholders;
- mudança de processo com impacto em time ou cliente;
- proposta comercial ou institucional com risco reputacional.

## Quando não usar

Não use esta skill para:

- perguntas factuais;
- revisão textual simples;
- feedback criativo sem decisão operacional;
- ideias vagas demais;
- brainstorming inicial;
- decisões já tomadas e irreversíveis;
- situações em que um checklist simples resolve melhor.

Se o usuário ainda não tem um plano concreto, ajude primeiro a estruturar o plano. Depois execute o premortem.

## Contexto mínimo necessário

Antes de executar, confirme se há contexto suficiente para responder a cinco perguntas:

1. O que é a iniciativa?
2. Para quem é ou quem será afetado?
3. Como sucesso será definido?
4. Qual é o custo do erro?
5. Ainda é possível mudar o rumo?

Se faltar uma informação essencial, faça no máximo 1–3 perguntas objetivas. Se for possível inferir com segurança, declare a inferência e prossiga.

## Enquadramento obrigatório

Toda execução deve começar com um enquadramento explícito:

```txt
Passaram-se [horizonte]. A iniciativa falhou. O objetivo agora é entender por que ela falhou antes de executá-la de verdade.
```

O horizonte padrão é 6 meses, salvo se o contexto indicar outro período mais adequado.

## Fluxo de execução

1. Confirmar contexto mínimo.
2. Escolher perfil de profundidade: Lite, Standard ou High-Assurance.
3. Estabelecer o enquadramento de falha futura.
4. Gerar modos de falha específicos.
5. Identificar premissas frágeis.
6. Priorizar:
   - falha mais provável;
   - falha mais perigosa;
   - falha mais difícil de detectar;
   - falha mais barata de prevenir.
7. Definir sinais de alerta observáveis.
8. Mapear gates necessários.
9. Revisar o plano.
10. Gerar checklist pré-execução.

## Qualidade dos modos de falha

Cada modo de falha deve ser:

- específico ao plano analisado;
- causal, não apenas descritivo;
- plausível;
- relevante;
- conectado a uma premissa ou decisão;
- acompanhado de pelo menos um sinal observável quando possível.

Evite falhas genéricas como:

- "falta de comunicação";
- "problemas de alinhamento";
- "baixa adoção";
- "falta de métricas".

Reescreva essas falhas de forma específica:

```txt
A adoção caiu porque o fluxo exige que PMs preencham campos que só fazem sentido para engenharia, criando atrito no primeiro uso.
```

## Formato mínimo de saída

Toda execução deve retornar, no mínimo:

- modos de falha;
- falha mais provável;
- falha mais perigosa;
- premissa oculta;
- sinais de alerta;
- plano revisado;
- gates recomendados, se aplicável.

Use o template em `docs/skills/premortem/templates/premortem-report.md`.

## Princípios

- Seja direto.
- Não suavize riscos relevantes.
- Não invente evidências.
- Marque inferências quando necessário.
- Evite excesso de ritual em decisões simples.
- A profundidade deve ser proporcional ao risco.
- A saída deve melhorar a decisão, não apenas listar problemas.

## Leitura complementar

- `docs/skills/premortem/workflows/depth-profiles.md`
- `docs/skills/premortem/workflows/gate-mapping.md`
- `docs/skills/premortem/templates/premortem-report.md`
- `docs/aletheia/triggers/premortem-triggers.md`
- `docs/aletheia/checks/premortem-activation-check.md`
