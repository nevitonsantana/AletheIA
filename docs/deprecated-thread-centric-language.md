# Deprecated Thread-Centric Language

## Goal

Mark older thread-first language as compatibility vocabulary rather than core AletheIA vocabulary.

This is a **strong deprecation note** for framework-facing docs.

---

## Rule

In core AletheIA docs, prefer the canonical terms:

- `execution surface` instead of `thread`, `chat`, or `session`
- `clean execution surface` instead of `clean thread` or `fresh session`
- `work item` instead of treating `issue`, `ticket`, or `card` as universal truth

Older terms may still appear only when they are:

- runtime-local examples
- adapter vocabulary
- project-local operating conventions
- compatibility notes for readers coming from existing workflows

---

## Replacement table

| Deprecated core phrasing | Preferred phrasing | Why |
| --- | --- | --- |
| thread / chat / session | execution surface | keeps runtime semantics local instead of core |
| clear thread | clean execution surface | removes tool-specific coupling from the core |
| new thread / new session | fresh execution surface | preserves meaning without assuming one runtime |
| issue as universal unit | work item | keeps external coordination tool-agnostic |
| GitHub Project as implied default board | external coordination system | keeps the framework adaptable across tools |

---

## Compatibility rule

Adapter docs may still say things such as:

- open a new thread
- start a fresh chat
- clear the current session

But they should do so only while making it explicit that:

- the phrase is runtime-local
- the core meaning is still `clean execution surface`
- the continuity artifact is still a `restart package`

---

## What this deprecation does not mean

It does **not** mean that execution surfaces are unimportant.

It means they are:

- operationally real
- architecturally secondary
- not the source of durable framework meaning
