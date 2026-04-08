# AletheIA — Examples

## Objetivo

Esta pasta existe para tornar os contratos do `AletheIA` tangíveis.

Se os schemas explicam **a estrutura** e os docs explicam **a lógica**, os exemplos mostram **como tudo se parece na prática**.

---

## Estrutura atual

- `hello-world/`
  - fluxo mínimo de ponta a ponta
  - um exemplo para cada um dos 6 contratos centrais
- `low-confidence-review/`
  - mostra quando a execução deve parar por ambiguidade e baixa confiança
- `high-risk-human-gate/`
  - mostra quando a execução deve parar e exigir aprovação humana
- `governance/`
  - mostra como facts + governance rules produzem `allow`, `review`, `ask_human` e `block`
- `learning-from-failed-validation/`
  - mostra como uma falha de validação vira bloqueio + aprendizado reaproveitável
- `handoffs/`
  - mostra restart packages compactos para continuidade operacional entre agentes
- `work-slices/`
  - mostra como task brief, decision, execution, handoff e learning podem compor uma unidade operacional
- `structured-risk-inference/`
  - mostra exemplos concretos de inference artifacts para risco de refactor e handoff de alto impacto

---

## Regra de uso

Os exemplos do alpha devem ser:

- pequenos
- legíveis
- agnósticos a domínio
- fáceis de adaptar para outros projetos

---

## Estado atual

O alpha agora já cobre:

- `allow`
- `review`
- `ask_human`
- `block`
- `block + learning`
- work-slice composition across existing contracts
- compact operational handoff examples
- risk-to-gate posture examples
- examples of structured risk inference for bounded semantic-risk scenarios
