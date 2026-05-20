# Runtime Adapters

Este diretório contém orientações específicas por runtime para execução da skill de premortem.

## Princípio

O core da skill (`premortem-core.md`) é agnóstico de runtime. Ele define o método, o fluxo e os critérios de qualidade sem depender de nenhuma ferramenta, modelo ou plataforma específica.

Os adapters traduzem esse método para as convenções e ferramentas de cada runtime. Um adapter não altera o método — ele orienta como executá-lo no contexto de um ambiente específico.

## Adapters disponíveis

| Runtime | Arquivo |
|---|---|
| Claude Code (CLI/IDE) | `claude-code.md` |
| Codex | `codex.md` |

## Criando um novo adapter

Para adicionar suporte a um novo runtime, criar um arquivo `<runtime>.md` neste diretório com:

1. **Objetivo** — o que este adapter cobre.
2. **Princípios** — restrições ou convenções do runtime.
3. **Execução recomendada** — como invocar o fluxo do core neste runtime.
4. **Ferramentas disponíveis** — mapeamento de operações para ferramentas do runtime.
5. **Validação mínima** — o que verificar antes de considerar concluído.
6. **Resposta final esperada** — formato de saída para este runtime.

O adapter não deve replicar o método. Deve apenas indicar como executá-lo.
