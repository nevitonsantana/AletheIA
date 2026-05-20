# Premortem — Perfis de Profundidade

## Objetivo

Definir o nível de profundidade adequado para cada execução de premortem. A skill não deve executar análises longas quando uma checagem curta é suficiente.

A seleção de perfil deve ser proporcional ao risco. Use o menor perfil que ainda torne a decisão revisável.

---

## Perfil 1 — Lite

### Quando usar

Use Lite quando:

- o risco é baixo ou médio;
- a decisão é reversível;
- o impacto é limitado;
- o usuário precisa de uma checagem rápida;
- ainda não há necessidade de gates formais.

### Saída esperada

```txt
- 3 a 5 modos de falha
- premissa oculta principal
- revisão mais importante do plano
```

### Sinais de que Lite é insuficiente

- envolve IA/autonomia/agentes;
- há risco de dados, segurança ou compliance;
- há impacto direto em usuário;
- há risco reputacional;
- a decisão é difícil de reverter;
- múltiplos stakeholders discordam sobre sucesso.

---

## Perfil 2 — Standard

### Quando usar

Use Standard quando:

- há uma feature, produto, campanha, processo ou estratégia com impacto real;
- existe custo relevante de erro;
- há dependências entre áreas;
- há incerteza sobre adoção, valor ou execução;
- gates podem ser úteis, mas não necessariamente bloqueantes.

### Saída esperada

```txt
- enquadramento
- contexto resumido
- 5 a 8 modos de falha
- falha mais provável
- falha mais perigosa
- premissa oculta
- sinais de alerta
- gates recomendados
- plano revisado
- checklist pré-execução
```

### Sinais de que Standard é insuficiente

- risco legal, segurança, privacidade ou LGPD;
- impacto em usuário vulnerável;
- decisão de baixa reversibilidade;
- agente de IA com autonomia operacional;
- possível dano reputacional;
- ausência de rollback;
- ausência de critério de sucesso verificável.

---

## Perfil 3 — High-Assurance

### Quando usar

Use High-Assurance quando:

- o custo do erro é alto;
- a decisão é difícil ou cara de reverter;
- há risco de segurança, dados, governança, compliance ou reputação;
- há impacto crítico na experiência do usuário;
- há uso de IA com autonomia, recomendação ou ação operacional;
- há conflito entre prazo, qualidade e risco;
- uma decisão humana explícita é necessária.

### Saída esperada

```txt
- enquadramento
- contexto estruturado
- modos de falha detalhados
- matriz severidade / probabilidade / detectabilidade
- falha mais provável
- falha mais perigosa
- falha mais difícil de detectar
- premissas ocultas críticas
- sinais de alerta mensuráveis
- hard gates
- soft gates
- review triggers
- human decision gates
- plano revisado
- checklist pré-execução
- pendências e decisões humanas
```

### Sinais de excesso de profundidade

High-Assurance está exagerado quando:

- a decisão é simples e reversível;
- não há impacto relevante;
- não há dependências críticas;
- a resposta longa atrasaria mais do que ajudaria;
- um checklist resolveria o risco.

---

## Regra prática de seleção

```txt
Baixo risco + reversível → Lite
Risco médio + impacto em produto/time → Standard
Alto risco + IA/dados/segurança/reputação/baixa reversibilidade → High-Assurance
```

---

## Relação com Planning Depth Profiles do AletheIA

Os perfis de profundidade desta skill (Lite / Standard / High-Assurance) compartilham nomenclatura com os `Planning Depth Profiles` do AletheIA (`docs/planning-depth-profiles.md`), mas têm finalidade distinta:

- **Planning Depth Profiles**: quanto de estrutura de planejamento um work slice precisa antes da execução.
- **Premortem Depth Profiles**: quão profunda deve ser a análise preventiva de falha de um plano, produto ou decisão.

Os dois podem ser usados juntos: um slice High-Assurance provavelmente merece um premortem Standard ou High-Assurance antes de ser executado.
