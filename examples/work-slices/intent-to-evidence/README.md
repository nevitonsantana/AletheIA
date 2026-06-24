# Intent-to-Evidence Work Slice Examples

These examples demonstrate the optional S8 extension without creating another lifecycle.

- `synthetic-product-change.json` — a compact product-language example with confirmed intent and mapped review evidence.
- `s8-real-pilot.json` — the real S8 implementation slice. It remains `review_required` until the Adaptive Skills counterpart and human review exist.

The records distinguish:

- human-owned Intent;
- verifiable Expectations;
- agent Guessing Risk;
- evidence mapped to expectations;
- Reconcile against the original intent.

Missing cross-repository evidence remains `not_proven`; technical completion does not silently upgrade it.
