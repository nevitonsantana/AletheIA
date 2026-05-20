# Premortem — Mapeamento para Gates

## Objetivo

Converter achados do premortem em mecanismos de decisão operacional. Um bom premortem não termina em uma lista de riscos; ele define o que precisa ser bloqueado, condicionado, revisado ou decidido por humanos.

---

## Tipos de gate

### 1. Hard gate

Bloqueia o avanço até que uma condição mínima seja atendida.

Use quando o premortem identificar:

- ausência de critério de sucesso;
- ausência de rollback;
- risco legal ou regulatório não avaliado;
- risco de segurança não avaliado;
- uso de dados sensíveis sem governança clara;
- impacto em usuário vulnerável sem mitigação;
- dependência crítica sem responsável;
- comportamento de agente de IA sem limite claro de ação.

Formato:

```txt
Hard gate: não avançar até que [condição verificável] esteja resolvida.
```

Exemplo:

```txt
Hard gate: não liberar a automação até que exista mecanismo de rollback e log de auditoria para cada ação executada pelo agente.
```

### 2. Soft gate

Permite avançar com condição explícita, piloto, escopo reduzido ou mitigação.

Use quando:

- a hipótese é fraca, mas testável;
- há risco conhecido com mitigação razoável;
- o impacto é controlável;
- o plano pode seguir em piloto;
- ainda faltam evidências, mas o custo de aprender é aceitável.

Formato:

```txt
Soft gate: avançar somente se [condição] e com [limite de exposição].
```

Exemplo:

```txt
Soft gate: testar primeiro com uma squad piloto por duas semanas antes de tornar o checklist obrigatório para todos os times.
```

### 3. Review trigger

Exige revisão especializada antes de avançar.

Use quando houver impacto em:

- UX;
- acessibilidade;
- segurança;
- privacidade;
- LGPD;
- arquitetura;
- comportamento de agente;
- marca ou reputação;
- operação crítica.

Formato:

```txt
Review trigger: envolver [especialidade/papel] antes de [marco].
```

Exemplo:

```txt
Review trigger: envolver Product Design e Segurança antes do release, porque o fluxo altera comportamento de usuário e manipula dados sensíveis.
```

### 4. Human decision gate

A IA não decide. Ela estrutura trade-offs e recomenda alternativas para decisão humana.

Use quando:

- há conflito entre prazo e qualidade;
- há risco reputacional;
- há impacto em pessoas;
- há ambiguidade ética;
- há decisão estratégica;
- há decisão política ou institucional;
- a escolha depende de apetite de risco.

Formato:

```txt
Human decision gate: decisão humana necessária entre [opções], considerando [trade-off].
```

Exemplo:

```txt
Human decision gate: liderança precisa decidir se aceita lançar com cobertura parcial de acessibilidade ou se reduz escopo para preservar qualidade mínima.
```

---

## Como mapear achados para gates

Para cada modo de falha relevante, responder:

1. Esta falha bloqueia avanço?
2. Pode ser mitigada com piloto ou limite de escopo?
3. Exige revisão especializada?
4. Exige decisão humana explícita?

---

## Saída recomendada

```md
## Gates recomendados

### Hard gates
- ...

### Soft gates
- ...

### Review triggers
- ...

### Human decision gates
- ...
```

Se nenhum gate for necessário, declarar:

```txt
Nenhum gate formal recomendado. A decisão pode seguir com checklist simples de acompanhamento.
```

---

## Relação com gates existentes no AletheIA

O AletheIA já usa gates de prontidão no contexto de work slices (`starter-pack/guides/quality-gates.md`, `starter-pack/guides/risk-to-gate-mapping.md`). Os gates do premortem são complementares: enquanto os gates de prontidão validam se um slice pode avançar, os gates do premortem identificam condições que deveriam bloquear ou condicionar a execução antes de o slice sequer começar.
