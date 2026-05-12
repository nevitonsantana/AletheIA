# Runtime Adapter — Codex

## Objetivo

Orientar como o Codex deve executar ou implementar a skill de premortem sem acoplar o core da skill ao runtime do Codex.

## Princípios

1. Inspecionar a estrutura do repositório antes de criar arquivos.
2. Seguir padrões existentes de documentação e nomenclatura.
3. Fazer mudanças mínimas e localizadas.
4. Não criar scripts, automações ou integrações sem pedido explícito.
5. Não alterar arquivos não relacionados.
6. Manter a skill em Markdown, salvo se o projeto já usar outro formato.
7. Separar método, gatilhos, templates e adapters.

## Execução recomendada

Ao receber uma tarefa de implementação ou análise via Codex:

1. Ler `AGENTS.md`, se existir.
2. Inspecionar a estrutura do repositório.
3. Localizar padrões de skills existentes.
4. Adaptar os caminhos sugeridos ao padrão real.
5. Executar o premortem seguindo o fluxo definido em `premortem-core.md`.
6. Mapear achados para gates usando `workflows/gate-mapping.md`.
7. Gerar saída usando o template em `templates/premortem-report.md`.
8. Se for uma implementação documental, criar ou atualizar os arquivos da skill e os gatilhos do AletheIA.
9. Verificar consistência entre core, profiles, gates e triggers.
10. Documentar arquivos criados/alterados.

## Validação mínima

Antes de finalizar, verificar:

- A skill deixa claro quando usar e quando não usar.
- A skill possui Lite, Standard e High-Assurance.
- Os gatilhos não disparam premortem para qualquer feedback simples.
- O AletheIA decide quando acionar, mas não contém o método inteiro.
- O Adaptative Skills executa o método, mas não decide sozinho a criticidade.
- Os gates estão conectados a achados do premortem.
- O template de saída é utilizável em Markdown.

## Resposta final esperada

Ao concluir, responder com:

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
