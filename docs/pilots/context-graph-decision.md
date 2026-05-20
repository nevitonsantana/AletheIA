# Context Graph Decision

## Resultado dos testes

Três testes controlados rodados no Crisis Monitor (Next.js, 632 arquivos, 3648 nós,
33311 arestas). Benchmark de avaliação também executado.

### Dados objetivos coletados

| Teste | Arquivos reais | Sugeridos pelo grafo | Falsos positivos | Helpfulness | Overhead |
|---|---|---|---|---|---|
| A — UI fix (2 arquivos) | 2 | 80 | 97.5% | low | medium |
| B — Design system (13 arquivos) | 8 lidos | 187 | 95% | low | medium |
| C — PR review (62 arquivos) | 18 lidos | 82 adicionais | 73% | medium | low |

Benchmark de avaliação:

| Repositório | Impact F1 | Observação |
|---|---|---|
| fastapi | 1.0 | Python, estrutura explícita |
| express | 0.667 | JavaScript simples |
| httpx | 0.667 | Python |
| flask | 0.235 | Python |
| gin | 0.235 | Go |
| **nextjs** | **0.041** | **Next.js — F1 quase zero** |

Token efficiency para Next.js: em um caso, o grafo usou 3x mais tokens que leitura
padrão (Std/Graph = 3.0). Em outro, 0.4x (ganho real). Resultado inconsistente.

---

## Análise por tipo de tarefa

### Bug fix localizado / componente UI

**Decisão: rejeitar o grafo.**

F1=0.041 + falsos positivos de 97.5% tornam o grafo inútil para este caso.
A leitura direta do arquivo conhecido é mais rápida e mais precisa.
O grafo de 2 hops em um design system Next.js altamente conectado explode para
centenas de nós sem discriminação semântica.

### Refatoração de design system (CSS global / tokens)

**Decisão: rejeitar o grafo.**

`globals.css` tem blast radius máximo no grafo porque qualquer arquivo que
importa o design system aparece como dependente. Isso é estruturalmente correto
mas operacionalmente inútil — não discrimina quais consumidores foram afetados
pelos tokens que efetivamente mudaram. A cascata de tokens é uma questão de
domínio, não de estrutura de grafo.

### PR review com muitos arquivos

**Decisão: manter como opcional, uso específico.**

O grafo tem valor real apenas em uma função: **detecção de gaps de teste**.
Em 62 arquivos, identificar quais funções críticas não têm cobertura de teste
é custoso manualmente. O grafo fez isso em uma query, com nomes de funções
específicos e acionáveis.

As outras funções (blast radius, context mínimo) continuam com falsos positivos
altos (73%), exigindo filtro manual que consome o ganho de tempo.

---

## Decisão final

### Incorporar ao starter-pack

**Não** — não incorporar como prática padrão para nenhum tipo de tarefa no perfil
atual do AletheIA.

Justificativa: o overhead de setup, manutenção de índice e filtragem de falsos
positivos supera o ganho em todos os casos testados exceto um.

### Manter como opcional

**Sim** — para PR reviews grandes com a operação específica de detecção de gaps
de teste (`test_gap_detection`), não `impact-radius`.

Condição: PR com mais de ~20 arquivos alterados, com mudanças em código de negócio
(não apenas docs ou configuração).

### Rejeitar ou adiar

**Rejeitar** para: impact radius, minimal context, review context em projetos Next.js.

**Adiar** para: projetos com estrutura mais explícita (Python/FastAPI com F1=1.0,
Express/httpx com F1=0.667). Se o AletheIA for aplicado a esses projetos, reavaliar.

---

## Restrição crítica identificada

O grafo de 2 hops (`impact-radius`) é inapropriado para projetos Next.js com design
system compartilhado. A densidade de conexões (33311 arestas em 3648 nós = 9.1
arestas/nó em média) faz com que 2 hops atinjam praticamente todo o projeto para
qualquer arquivo de UI.

Para que o impact-radius fosse útil em Next.js, seria necessário:
- Configurar depth=1 (apenas dependências diretas)
- Filtrar por tipo de nó (excluir nós de estilo/config)
- Ou usar semantic search em vez de traversal estrutural

Essas otimizações não estão disponíveis na interface atual do `code-review-graph`.

---

## O que atualizar nos documentos existentes

`docs/context-graph-integration.md` — adicionar seção "Limitação conhecida: Next.js"
com referência ao F1=0.041 e ao fenômeno de blast radius inflado.

`starter-pack/guides/context-graph-usage-guide.md` — adicionar linha na tabela de
"quando não usar": "projeto Next.js com design system compartilhado → não usar
impact-radius".

---

## Próximos passos sugeridos

1. Atualizar os dois documentos com as restrições identificadas
2. Se o AletheIA for aplicado a um projeto Python (FastAPI/Flask), retestar com
   F1 esperado de 1.0 — esse seria o caso de uso onde o grafo justifica uso padrão
3. Monitorar evolução do `code-review-graph` para suporte a depth configurável
   e filtros semânticos no impact-radius

---

## Referências

- `examples/resource-aware-operations/context-graph-test-a-ui-fix.md`
- `examples/resource-aware-operations/context-graph-test-b-design-refactor.md`
- `examples/resource-aware-operations/context-graph-test-c-pr-review.md`
- `docs/context-graph-integration.md`
- `starter-pack/guides/context-graph-usage-guide.md`
