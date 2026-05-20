# AletheIA — Quality Baseline v1

## Objetivo

Este documento formaliza a entrada do `AletheIA` na Fase 3 de qualidade.

Em linguagem simples:

depois de visão, contratos, kernel e governança,
o framework precisa provar de forma automatizada que:

- seus contratos continuam íntegros
- seus comportamentos principais continuam estáveis
- seu fluxo mínimo continua funcionando de ponta a ponta

---

## Três provas mínimas do alpha

## 1. Contract tests

Verificam se os artefatos mínimos do framework continuam com a estrutura esperada.

No alpha, isso cobre principalmente:

- contratos centrais
- artefatos de governança
- campos mínimos obrigatórios

## 2. Golden tests

Verificam se os comportamentos de referência continuam iguais.

No alpha, isso cobre:

- o caminho `allow` do `hello-world`
- o caminho `review` por baixa confiança
- o caminho `ask_human` por risco crítico
- o caminho `block` por falha de governança

## 3. E2E mínimo

Verifica se o fluxo integrado ainda fecha:

`kernel -> governance hook -> policy evaluation`

---

## O que esta fase quer provar

- que os contratos não quebraram silenciosamente
- que os cenários de referência continuam estáveis
- que o framework continua coerente do começo ao fim

---

## Regra importante

O alpha não precisa começar com uma suíte pesada.

Ele só precisa de uma base pequena, mas confiável, para impedir regressão invisível.

---

## Implementação desta iteração

### Scripts principais

- `scripts/aletheia/test-contracts.ts`
- `scripts/aletheia/test-goldens.ts`
- `scripts/aletheia/test-e2e.ts`
- `scripts/aletheia/test-learnings.ts`

### Fixtures de referência

- `docs/examples/aletheia/goldens/*.json`
- `docs/examples/aletheia/learning-from-failed-validation/*`

### Cobertura adicional desta iteração

- cenário `learning-from-failed-validation`
- geração de `Learning Record` a partir de `Policy Evaluation`
- prova de que falha de validação pode virar aprendizado útil, em vez de apenas bloqueio

---

## Próximo passo recomendado

Depois deste baseline ampliado:

1. consolidar a documentação inicial do repositório público
2. preparar o blueprint de extração do `AletheIA`
3. separar o que vai para `framework core`, `starter-pack` e `pilot materials`
