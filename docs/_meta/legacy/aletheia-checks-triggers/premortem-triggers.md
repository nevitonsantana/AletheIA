# AletheIA — Gatilhos para Premortem

## Objetivo

Definir quando o AletheIA deve acionar a skill de premortem do Adaptive Skills.

O AletheIA não executa o método completo. Ele avalia contexto, risco, reversibilidade e custo de erro para decidir se a skill deve ser chamada e com qual profundidade.

---

## Regra central

Acionar premortem quando existir:

```txt
plano ou decisão concreta + custo relevante de erro + possibilidade de mudar o rumo
```

Se uma dessas três condições não existir, o premortem provavelmente não é o método adequado.

---

## Gatilhos fortes

Acionar premortem quando a tarefa envolver pelo menos um dos itens abaixo:

1. Decisão concreta com custo relevante de erro.
2. Baixa reversibilidade.
3. Impacto direto em usuário.
4. Uso de IA, agente, automação ou recomendação algorítmica.
5. Dados sensíveis, segurança, privacidade ou LGPD.
6. Risco de compliance, governança ou auditoria.
7. Experiência crítica ou acessibilidade.
8. Múltiplos stakeholders com interesses conflitantes.
9. Ausência de critério claro de sucesso.
10. Pressão de prazo com risco de qualidade.
11. Dependência técnica crítica.
12. Mudança com possível impacto reputacional.

---

## Gatilhos por linguagem do usuário

A linguagem do usuário pode indicar necessidade de premortem, mas não deve ser suficiente sozinha.

Exemplos:

- "o que pode dar errado?"
- "o que estou deixando passar?"
- "fure esse plano"
- "onde isso pode quebrar?"
- "teste essa estratégia"
- "quais são os pontos cegos?"
- "faça um advogado do diabo"

Antes de acionar, confirmar se há plano concreto e custo relevante de erro.

---

## Quando não acionar

Não acionar premortem para:

- pergunta factual;
- edição de texto;
- feedback simples;
- brainstorming inicial;
- ideia vaga sem plano;
- pedido de explicação;
- decisão já tomada e irreversível;
- situação em que um checklist simples resolve.

---

## Seleção de profundidade

```txt
Baixo risco + decisão reversível → Lite
Risco médio + impacto em produto/time → Standard
Alto risco + IA/dados/segurança/reputação/baixa reversibilidade → High-Assurance
```

Para detalhes de cada perfil: `docs/skills/premortem/workflows/depth-profiles.md`.

---

## Exemplos

### Exemplo 1 — Lite

Entrada:

```txt
Quero publicar um post sobre esse tema. O que pode dar errado?
```

Decisão:

```txt
Premortem Lite, se houver risco reputacional moderado ou audiência sensível.
```

### Exemplo 2 — Standard

Entrada:

```txt
Vamos lançar uma nova feature para times internos usarem agentes de IA na priorização de demandas.
```

Decisão:

```txt
Premortem Standard, pois há produto, usuários internos, adoção e decisão operacional.
```

### Exemplo 3 — High-Assurance

Entrada:

```txt
Vamos permitir que um agente atualize configurações de monitoramento automaticamente com base em sinais de crise.
```

Decisão:

```txt
Premortem High-Assurance, pois há IA/autonomia, impacto operacional, risco reputacional e necessidade de auditoria.
```

---

## Cenário de validação recomendado

Use para testar os gatilhos:

```txt
Queremos criar quality gates para projetos com código gerado por IA, considerando engenharia, segurança, UX, acessibilidade, comportamento de agentes e decisão humana.
```

Resultado esperado:

1. AletheIA detecta risco médio/alto.
2. AletheIA aciona premortem Standard ou High-Assurance.
3. A skill identifica modos de falha concretos (não genéricos).
4. A saída recomenda gates.
5. O plano revisado fica mais acionável que o plano inicial.

---

## Skill a acionar

```txt
docs/skills/premortem/premortem-core.md
```

Activation check: `docs/aletheia/checks/premortem-activation-check.md`
