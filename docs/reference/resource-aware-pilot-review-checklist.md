# Resource-Aware Pilot Review Checklist

## Goal

Provide a short review checklist for bounded real-world pilots in the 1.2 Resource-Aware Operations track.

---

## Before the pilot

- [ ] The slice is small enough to review without benchmark infrastructure
- [ ] The slice has a visible resource-aware pressure (context drag, retries, handoff burden, or runtime-fit doubt)
- [ ] Local trust / hosting posture is explicit
- [ ] The team knows what should remain project-local

## During the pilot

- [ ] Slice shape is explicit
- [ ] Planning depth is explicit
- [ ] Runtime fit is explicit
- [ ] At least one readiness review is performed
- [ ] Context growth or retry growth is noted when it appears
- [ ] Handoff quality is reviewed if a boundary is crossed

## After the pilot

- [ ] The pilot can explain whether the framework helped earlier than intuition alone
- [ ] The result is classified as reinforced, no-change, example-needed, guidance-refinement, or future-benchmark-signal
- [ ] Project-local rules are separated from framework-level learnings
- [ ] Any follow-up recommendation stays proportional to the evidence

## Healthy stop line

If the pilot conclusion starts requiring:

- benchmark scoring
- auto-routing
- vendor ranking as core truth
- learning-layer machinery

then the pilot should stop and record that the 1.2 evidence is not yet mature enough for that leap.
