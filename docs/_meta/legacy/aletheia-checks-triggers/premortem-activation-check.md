# AletheIA — Premortem Activation Check

## Objetivo

Checklist curto para decidir se a skill de premortem deve ser acionada antes da execução de uma tarefa, plano ou decisão.

Este check é executado pelo AletheIA, não pela skill. O AletheIA decide quando acionar; a skill executa o método.

---

## Checklist de ativação

Responder às perguntas abaixo antes de acionar:

1. Existe um plano, decisão ou compromisso concreto?
2. O erro teria custo relevante?
3. Ainda é possível alterar o rumo?
4. Há impacto em usuário, negócio, segurança, dados, reputação ou governança?
5. Há premissas importantes sem evidência suficiente?
6. A decisão é difícil de reverter?
7. Há múltiplos stakeholders ou interesses conflitantes?
8. Há pressão de prazo que pode reduzir qualidade?

---

## Regra de decisão

### Não acionar

Se a resposta para **1** for "não": não acionar premortem. Ajude a estruturar o plano primeiro.

Se a resposta para **2** for "não": considerar checklist simples ou feedback comum.

Se a resposta para **3** for "não": considerar postmortem, retrospectiva ou análise de aprendizado.

### Considerar Lite

Acionar Lite se:

- há plano concreto;
- o erro tem algum custo;
- a decisão é reversível;
- o impacto é limitado.

### Considerar Standard

Acionar Standard se:

- há impacto em produto, time, cliente ou operação;
- há incerteza relevante;
- há dependências entre áreas;
- há falta de critério de sucesso;
- há possibilidade de corrigir o plano antes de executar.

### Considerar High-Assurance

Acionar High-Assurance se houver:

- IA/autonomia/agentes;
- dados sensíveis;
- segurança;
- privacidade/LGPD;
- risco reputacional;
- baixa reversibilidade;
- impacto crítico em usuário;
- decisão humana necessária;
- ausência de rollback;
- risco regulatório ou de governança.

---

## Saída do activation check

Quando acionar, retornar:

```txt
Premortem recomendado: [Lite / Standard / High-Assurance]
Motivo: [1–2 frases]
Skill a acionar: docs/skills/premortem/premortem-core.md
Gates a observar: [hard gate / soft gate / review trigger / human decision gate]
```

Quando não acionar:

```txt
Premortem não recomendado agora.
Motivo: [falta plano concreto / baixo custo de erro / decisão já irreversível / pedido simples]
Alternativa recomendada: [checklist / estruturação de plano / revisão simples / postmortem]
```

---

## Leitura complementar

- `docs/aletheia/triggers/premortem-triggers.md` — regras detalhadas de acionamento
- `docs/skills/premortem/workflows/depth-profiles.md` — como escolher o perfil certo
- `docs/skills/premortem/workflows/gate-mapping.md` — como mapear achados para gates
