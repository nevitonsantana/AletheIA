# Branch Isolation Guide

AletheIA assumes that important changes should happen in isolated work lanes.

## Principle

One relevant front or theme should not silently break another.

## Recommended baseline

- use separate branches or worktrees for meaningfully separate fronts
- avoid mixing unrelated changes in one batch
- do not merge straight into the main branch
- validate before integration

## Why this matters

Branch isolation helps preserve:

- system integrity
- review clarity
- rollback safety
- ownership boundaries
