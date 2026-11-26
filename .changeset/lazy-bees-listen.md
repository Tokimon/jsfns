---
"@jsfns/core": major
---

- **BREAKING:** the `MicroEvents` class is replaced by the `microEvents()` factory function (now in `microEvents.ts`), for consistency with the rest of the package. Replace `new MicroEvents<T>()` with `microEvents<T>()`. The `MicroEvents<T>` type is still exported
