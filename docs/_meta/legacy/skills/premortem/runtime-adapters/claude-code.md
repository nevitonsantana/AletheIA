# Runtime Adapter — Claude Code

## Objetivo

Orientar como o Claude Code deve executar ou apoiar a skill de premortem sem acoplar o core da skill ao runtime do Claude Code.

## Princípios

1. Ler arquivos relevantes antes de criar qualquer coisa.
2. Seguir os padrões existentes de documentação e nomenclatura do repositório.
3. Fazer mudanças mínimas e localizadas.
4. Não criar scripts, automações ou integrações sem pedido explícito.
5. Não alterar arquivos não relacionados.
6. Manter a skill em Markdown, salvo se o projeto já usar outro formato.
7. Separar método, gatilhos, templates e adapters.

## Execução recomendada

Ao receber uma tarefa de análise premortem via Claude Code:

1. Ler `CLAUDE.md` e `AGENTS.md`, se existirem.
2. Ler `docs/skills/premortem/premortem-core.md` para entender o método.
3. Ler `docs/aletheia/checks/premortem-activation-check.md` para confirmar que premortem é o método adequado.
4. Selecionar o perfil de profundidade usando `docs/skills/premortem/workflows/depth-profiles.md`.
5. Executar o premortem seguindo o fluxo definido no core.
6. Mapear achados para gates usando `docs/skills/premortem/workflows/gate-mapping.md`.
7. Gerar saída usando o template em `docs/skills/premortem/templates/premortem-report.md`.
8. Se for uma implementação documental da skill, seguir o runtime adapter do Codex (`runtime-adapters/codex.md`) adaptando para as ferramentas disponíveis no Claude Code (Read, Write, Edit, Bash).

## Ferramentas disponíveis no Claude Code

| Operação | Ferramenta preferida |
|---|---|
| Ler arquivos | Read |
| Criar arquivos | Write |
| Editar arquivos | Edit |
| Buscar padrões | Bash (grep/find) |
| Inspecionar estrutura | Bash (ls/find) |

Usar Bash apenas quando Read/Write/Edit não forem suficientes.

## Validação mínima antes de finalizar

- A skill deixa claro quando usar e quando não usar.
- A skill possui Lite, Standard e High-Assurance.
- Os gatilhos não disparam premortem para qualquer feedback simples.
- O AletheIA decide quando acionar, mas não contém o método inteiro.
- Os gates estão conectados a achados do premortem.
- O template de saída é utilizável em Markdown.

## Resposta final esperada

Ao concluir uma implementação ou análise, responder com:

```txt
Arquivos criados/alterados:
- ...

Decisões tomadas:
- ...

Adaptações à estrutura existente:
- ...

Pendências:
- ...

Teste recomendado:
- Rodar premortem sobre quality gates para desenvolvimento assistido por IA.
```
